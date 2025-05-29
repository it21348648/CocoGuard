from flask import Blueprint, request, jsonify, send_file
import subprocess
import os
import glob
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from PIL import Image

super_res_bp = Blueprint('super_res', __name__)  # Create the Blueprint

# ✅ Load MobileNetV2 model at startup
MODEL_PATH = "models/coconut_disease_model.keras"
try:
    mobilenet_model = load_model(MODEL_PATH)
    print("✅ MobileNetV2 model loaded successfully!")
except Exception as e:
    print(f"❌ Error loading MobileNet model: {str(e)}")

# ✅ Ensure Class Label Order Matches Training
class_labels = ['Healthy Coconut', 'Non Coconut', 'coconut mita']


# ✅ Image preprocessing function (Matches Jupyter)
IMG_SIZE = (224, 224)

def preprocess_image(img_path):
    """Preprocess an image for MobileNetV2 classification."""
    img = Image.open(img_path).convert("RGB")  # Ensure RGB mode
    print(f"🔍 Original Image Size: {img.size}, Mode: {img.mode}")  # Debugging

    img = img.resize(IMG_SIZE)  # Resize to match model input
    img_array = image.img_to_array(img)  # Convert to numpy array

    print(f"🔍 Image Shape Before Normalization: {img_array.shape}")  # Debugging
    img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
    img_array = img_array.astype('float32') / 255.0  # Normalize

    print(f"🔍 Final Preprocessed Image Shape: {img_array.shape}")  # Debugging
    print(f"🔍 Max Pixel Value: {img_array.max()}, Min Pixel Value: {img_array.min()}")  # Debugging

    return img_array


@super_res_bp.route('/process', methods=['POST'])
def process_image():
    try:
        os.makedirs("inputs", exist_ok=True)
        os.makedirs("results", exist_ok=True)

        # ✅ Step 1: Receive Image
        if 'image' not in request.files:
            return jsonify({'error': 'No image file provided'}), 400

        image_file = request.files['image']
        image_path = os.path.join('inputs', image_file.filename)
        image_file.save(image_path)
        print(f"✅ Received Image: {image_path}")

        # ✅ Step 2: Run Super-Resolution (Save enhanced image, but do NOT use for classification)
        output_image_path = run_super_resolution(image_path)  # Save super-res image

        # ✅ Step 3: Run Classification Using the ORIGINAL image
        classification_result = classify_image(image_path)

        # ✅ Step 4: Return JSON Response (Super-Resolution & Classification)
        return jsonify({
            'message': 'Processing complete',
            'original_image': image_path,  # Path to the original input image
            'enhanced_image': output_image_path,  # Path to the super-resolution image
            'classification': classification_result
        }), 200

    except Exception as e:
        print(f"Unexpected error: {e}")
        return jsonify({'error': f'Unexpected error: {str(e)}'}), 500


def run_super_resolution(image_path):
    """Run super-resolution and save enhanced image, but do NOT use for classification."""
    try:
        print(f"⚙️ Running Super-Resolution on: {image_path}")

        # ✅ Define output path for enhanced image
        output_image_path = os.path.join("results", os.path.basename(image_path).replace(".", "_enhanced."))

        # ✅ Super-Resolution Command (Save enhanced image)
        command = f"python Real-ESRGAN/inference_realesrgan.py -i {image_path} -o results/ --tile 400 --fp32"
        subprocess.run(command, shell=True, check=True)

        # ✅ Find Processed Image
        output_files = glob.glob(f"results/{os.path.splitext(os.path.basename(image_path))[0]}*")
        if not output_files:
            print("❌ Error: No processed file found in results/")
            return None

        print(f"✅ Super-Resolution Completed: {output_files[0]}")
        return output_files[0]

    except subprocess.CalledProcessError as e:
        print(f"❌ Super-Resolution Error: {e}")
        return None


def classify_image(image_path):
    try:
        if not os.path.exists(image_path):
            return "Error: Image not found"

        img_array = preprocess_image(image_path)
        prediction = mobilenet_model.predict(img_array)

        confidence_scores = prediction[0]
        predicted_class_idx = np.argmax(confidence_scores)
        predicted_label = class_labels[predicted_class_idx]
        confidence = confidence_scores[predicted_class_idx]

        if confidence < 0.70:
            predicted_label = "This is not a coconut"

        print(f"🔥 Raw Prediction Output: {prediction}")
        print(f"🔍 Class Probabilities: {dict(zip(class_labels, confidence_scores))}")
        print(f"🔍 Predicted Label: {predicted_label}, Confidence: {confidence:.4f}")

        return {"label": predicted_label, "confidence": float(confidence)}
    except Exception as e:
        return f"Error in classification: {str(e)}"

