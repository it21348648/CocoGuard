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
from config import BACKEND_URL, UPLOAD_FOLDER, RESULTS_FOLDER

# Initialize Flask Blueprint
xai2_bp = Blueprint('xai2', __name__)

# Ensure required folders exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(RESULTS_FOLDER, exist_ok=True)

# Load trained classification model
MODEL_PATH = os.path.join(os.getcwd(), "models", "newmobilenetv2_model1.keras")
model = load_model(MODEL_PATH)
model.trainable = False

# Class label mapping
CLASS_LABELS = {
    0: "Grey Leaf",
    1: "Healthy",
    2: "Not a Coconut Leaf"
}

def preprocess_image(img_path):
    """
    Load and preprocess image for MobileNetV2 inference.
    """
    img = image.load_img(img_path, target_size=(224, 224))
    img_array = image.img_to_array(img)
    img_array = preprocess_input(img_array)
    return img, np.expand_dims(img_array, axis=0)

def get_last_conv_layer(model):
    """
    Find the last Conv2D layer in the model.
    """
    for layer in reversed(model.layers):
        if isinstance(layer, tf.keras.layers.Conv2D):
            return layer.name
    raise ValueError("No Conv2D layer found in the model.")

def compute_gradcam(img_array, layer_name):
    """
    Compute Grad-CAM++ heatmap for the predicted class.
    """
    grad_model = tf.keras.models.Model(
        inputs=model.input,
        outputs=[model.get_layer(layer_name).output, model.output]
    )

    with tf.GradientTape() as tape:
        conv_output, preds = grad_model(img_array)
        class_idx = int(tf.argmax(preds[0]))
        loss = preds[:, class_idx]

    grads = tape.gradient(loss, conv_output)
    pooled_grads = tf.reduce_mean(grads, axis=(0, 1, 2))
    heatmap = tf.reduce_sum(pooled_grads * conv_output[0], axis=-1).numpy()

    heatmap = np.maximum(heatmap, 0)
    heatmap /= (np.max(heatmap) + 1e-8)
    return heatmap, class_idx

def compute_lime(img_array, img, predicted_class):
    """
    Generate LIME explanation and top contributing regions.
    """
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
        predicted_class, positive_only=True, num_features=5, hide_rest=False
    )

    lime_heatmap = mark_boundaries(temp, mask)

    top_features = sorted(
        explanation.local_exp[predicted_class], key=lambda x: abs(x[1]), reverse=True
    )[:5]
    regions = [int(f[0]) for f in top_features]

    if predicted_class == 1:
        message = "These regions have characteristics of a healthy leaf."
    elif predicted_class == 0:
        message = "These regions contribute significantly to disease patterns."
    else:
        message = "These regions do not match coconut leaf characteristics."

    return lime_heatmap, {
        "regions": regions,
        "message": message
    }

def apply_colormap(heatmap, img):
    """
    Overlay Grad-CAM++ heatmap on top of the original image.
    """
    heatmap = np.uint8(255 * heatmap)
    heatmap = cv2.applyColorMap(heatmap, cv2.COLORMAP_JET)
    heatmap = cv2.cvtColor(heatmap, cv2.COLOR_BGR2RGB)
    heatmap = Image.fromarray(heatmap).resize(img.size, Image.Resampling.LANCZOS)
    return Image.blend(img, heatmap, alpha=0.5)

@xai2_bp.route('/explain2', methods=['POST'])
def explain_image():
    """
    Endpoint to classify coconut leaf and return visual explanations (Grad-CAM++ & LIME).
    """
    if 'file' not in request.files:
        return jsonify({"error": "No image provided"}), 400

    file = request.files['file']
    img_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(img_path)

    img, img_array = preprocess_image(img_path)

    # Grad-CAM++
    last_conv_layer = get_last_conv_layer(model)
    gradcam_heatmap, predicted_class = compute_gradcam(img_array, last_conv_layer)

    # LIME
    lime_heatmap, explanation_data = compute_lime(img_array, img, predicted_class)

    # Create overlay images
    gradcam_overlay = apply_colormap(gradcam_heatmap, img)
    lime_overlay = Image.fromarray((lime_heatmap * 255).astype(np.uint8), mode="RGB")

    # Save images
    gradcam_filename = f"gradcam_{file.filename}"
    lime_filename = f"lime_{file.filename}"
    gradcam_path = os.path.join(RESULTS_FOLDER, gradcam_filename)
    lime_path = os.path.join(RESULTS_FOLDER, lime_filename)
    gradcam_overlay.save(gradcam_path)
    lime_overlay.save(lime_path)

    response = {
        "prediction": CLASS_LABELS[predicted_class],
        "gradcam_path": f"{BACKEND_URL}/results/{gradcam_filename}",
        "lime_path": f"{BACKEND_URL}/results/{lime_filename}",
        "explanation": explanation_data
    }

    return jsonify(response)