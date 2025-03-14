import os
import numpy as np
import tensorflow as tf
import cv2
from flask import Blueprint, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input
from lime import lime_image
from skimage.segmentation import mark_boundaries
from PIL import Image
from config import BACKEND_URL, UPLOAD_FOLDER, RESULTS_FOLDER  # Import config variables

# Initialize Blueprint
xai_bp = Blueprint('xai', __name__)

# Ensure Directories Exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(RESULTS_FOLDER, exist_ok=True)

# Load the trained model
MODEL_PATH = os.path.join(os.getcwd(), "models", "mobilenetv2_model4.keras")
model = load_model(MODEL_PATH)
model.trainable = False

# ✅ Preprocess Image
def preprocess_image(img_path):
    img = image.load_img(img_path, target_size=(224, 224))
    img_array = image.img_to_array(img)
    img_array = preprocess_input(img_array)  # Normalize
    img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
    return img, img_array

# ✅ Get Last Conv2D Layer
def get_last_conv_layer(model):
    for layer in reversed(model.layers):
        if isinstance(layer, tf.keras.layers.Conv2D):
            return layer.name
    raise ValueError("❌ No Conv2D layer found in the model!")

# ✅ Compute Grad-CAM++
def compute_gradcam(img_array, layer_name):
    grad_model = tf.keras.models.Model(
        inputs=model.input,
        outputs=[model.get_layer(layer_name).output, model.output]
    )

    with tf.GradientTape() as tape:
        conv_output, preds = grad_model(img_array)
        class_idx = tf.argmax(preds[0])
        loss = preds[:, class_idx]

    grads = tape.gradient(loss, conv_output)
    pooled_grads = tf.reduce_mean(grads, axis=(0, 1, 2))

    heatmap = np.sum(pooled_grads * conv_output[0], axis=-1)
    heatmap = np.maximum(heatmap, 0)
    heatmap = (heatmap - np.min(heatmap)) / (np.max(heatmap) + 1e-8)  # Normalize

    return heatmap, class_idx.numpy(), preds.numpy()

# ✅ Compute LIME
def compute_lime(img_array, img):
    explainer = lime_image.LimeImageExplainer()
    
    def predict_fn(images):
        return model.predict(np.array(images))

    explanation = explainer.explain_instance(
        img_array[0].astype('double'),
        predict_fn,
        top_labels=1,
        hide_color=0,
        num_samples=1000
    )

    temp, mask = explanation.get_image_and_mask(
        explanation.top_labels[0], positive_only=True, num_features=5, hide_rest=False
    )

    lime_heatmap = mark_boundaries(temp, mask)

    top_label = explanation.top_labels[0]
    important_features = sorted(explanation.local_exp[top_label], key=lambda x: abs(x[1]), reverse=True)[:5]

    if top_label == 0:  # Assuming 0 = Diseased, 1 = Healthy
        explanation_text = "\n".join([f"Region {feat[0]} was important because it matched patterns seen in diseased leaves." for feat in important_features])
    else:
        explanation_text = "\n".join([f"Region {feat[0]} was analyzed and matches characteristics of a healthy leaf." for feat in important_features])

    return lime_heatmap, explanation_text

# ✅ Apply Colormap for Grad-CAM++
def apply_colormap(heatmap, img):
    heatmap = np.uint8(255 * heatmap)
    heatmap = cv2.applyColorMap(heatmap, cv2.COLORMAP_JET)
    heatmap = cv2.cvtColor(heatmap, cv2.COLOR_BGR2RGB)
    heatmap = Image.fromarray(heatmap).resize(img.size, Image.Resampling.LANCZOS)
    return Image.blend(img, heatmap, alpha=0.5)

# ✅ Define API Route for Image Analysis
@xai_bp.route('/explain', methods=['POST'])
def explain_image():
    if 'file' not in request.files:
        return jsonify({"error": "No image provided"}), 400

    file = request.files['file']
    img_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(img_path)

    img, img_array = preprocess_image(img_path)

    last_conv_layer = get_last_conv_layer(model)
    gradcam_heatmap, predicted_class, confidence = compute_gradcam(img_array, last_conv_layer)
    lime_heatmap, explanation_text = compute_lime(img_array, img)

    gradcam_overlay = apply_colormap(gradcam_heatmap, img)
    lime_overlay = Image.fromarray((lime_heatmap * 255).astype(np.uint8))

    # ✅ Save Grad-CAM and LIME images to results folder
    gradcam_filename = f"gradcam_{file.filename}"
    lime_filename = f"lime_{file.filename}"

    gradcam_path = os.path.join(RESULTS_FOLDER, gradcam_filename)
    lime_path = os.path.join(RESULTS_FOLDER, lime_filename)

    gradcam_overlay.save(gradcam_path)
    lime_overlay.save(lime_path)

    # ✅ Return full image URLs
    return jsonify({
        "prediction": int(predicted_class),
        "confidence": float(confidence[0][predicted_class]),
        "gradcam_path": f"{BACKEND_URL}{gradcam_path}",
        "lime_path": f"{BACKEND_URL}{lime_path}",
        "explanation": explanation_text
    })