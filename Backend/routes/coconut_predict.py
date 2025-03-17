import os
import numpy as np
import joblib
import pandas as pd
import tensorflow as tf
from datetime import datetime
from flask import Blueprint, request, jsonify
from tensorflow.keras.preprocessing import image
from tensorflow.keras.models import load_model

# Ensure uploads directory exists
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Load Models
harvest_model_path = os.path.join(os.path.dirname(__file__), "../models/harvest_prediction_modelrf7.pkl")
harvest_model = joblib.load(harvest_model_path)

maturity_model_path = os.path.join("models", "mobilenetv2_model2.keras")
maturity_model = load_model(maturity_model_path)

# Define Class Names
CLASS_NAMES = ["Mature", "NonCoconut", "Old", "Young"]

# Create Flask Blueprint
coconut_predict_bp = Blueprint("coconut_predict", __name__)

# Function to preprocess image for MobileNetV2
def preprocess_image(img_path):
    """ Preprocess image to fit the model input size """
    img = image.load_img(img_path, target_size=(224, 224))
    img_array = image.img_to_array(img) / 255.0  # Normalize
    img_array = np.expand_dims(img_array, axis=0)
    return img_array

@coconut_predict_bp.route("/classify", methods=["POST"])
def classify_coconut():
    """
    Step 1: Classifies the coconut maturity from an uploaded image.
    Returns: Prediction (Young, Mature, Old, NonCoconut)
    """
    try:
        if "file" not in request.files:
            return jsonify({"error": "No file uploaded"}), 400

        file = request.files["file"]
        
        # Ensure the uploads directory exists
        if not os.path.exists(UPLOAD_FOLDER):
            os.makedirs(UPLOAD_FOLDER)
        
        # Save the uploaded file
        file_path = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(file_path)

        print(f"✅ File received and saved: {file_path}")  # Debug log

        # Preprocess the image for the model
        img_array = preprocess_image(file_path)
        predictions = maturity_model.predict(img_array)
        predicted_class = CLASS_NAMES[np.argmax(predictions)]

        print(f"🎯 Predicted class: {predicted_class}")  # Debug log

        # Construct response
        response_data = {
            "prediction": predicted_class,
            "confidence": float(np.max(predictions))  # Confidence score
        }

        if predicted_class == "NonCoconut":
            response_data["message"] = "This is not a valid coconut."
        elif predicted_class == "Old":
            response_data["message"] = "The coconut is old and should be plucked."
        elif predicted_class in ["Young", "Mature"]:
            response_data["next_step"] = "Provide additional harvest data for prediction"

        print(f"📡 Response Data: {response_data}")  # Debug log
        return jsonify(response_data)

    except Exception as e:
        print("❌ Error in classify_coconut:", str(e))  # Debug log
        return jsonify({"error": str(e)}), 500

@coconut_predict_bp.route("/predict", methods=["POST"])
def predict_harvest():
    """
    Step 2: Predicts the next harvest date based on farmer's input.
    Required Input:
      - Location
      - No. of Trees
      - Three previous harvest dates
      - No. of coconuts plucked for each harvest
      - Maturity prediction result (Young or Mature)
    """
    try:
        data = request.get_json()

        print("📥 Received Prediction Request:", data)  # Debugging

        # Extracting maturity prediction
        maturity_prediction = data.get("prediction", "Unknown")
        
        # Convert dates to datetime format
        oldest_harvest = datetime.strptime(data["Harvest Date 1"], "%Y-%m-%d")
        second_oldest_harvest = datetime.strptime(data["Harvest Date 2"], "%Y-%m-%d")
        latest_harvest = datetime.strptime(data["Harvest Date 3"], "%Y-%m-%d")

        # Calculate intervals
        days_between_1_2 = (second_oldest_harvest - oldest_harvest).days
        days_between_2_3 = (latest_harvest - second_oldest_harvest).days
        avg_harvest_interval = (days_between_1_2 + days_between_2_3) / 2

        # Calculate average coconuts per tree
        avg_coconuts_per_tree = (
            data["Coconuts Plucked 1"] + data["Coconuts Plucked 2"] + data["Coconuts Plucked 3"]
        ) / (3 * data["No. of Trees"])

        # Determine yield trend factor
        if data["Coconuts Plucked 3"] > data["Coconuts Plucked 1"]:
            yield_trend = 1  # Increasing
        elif data["Coconuts Plucked 3"] < data["Coconuts Plucked 1"]:
            yield_trend = -1  # Decreasing
        else:
            yield_trend = 0  # Stable

        # Prepare data for model
        processed_data = pd.DataFrame({
            "Location": [data["Location"]],  
            "No. of Trees": [data["No. of Trees"]],
            "Days Between 1 & 2": [days_between_1_2],
            "Days Between 2 & 3": [days_between_2_3],
            "Avg. Harvest Interval": [avg_harvest_interval],
            "Avg. Coconuts Per Tree": [avg_coconuts_per_tree],
            "Yield Trend Factor": [yield_trend]
        })

        # Make prediction
        predicted_days = harvest_model.predict(processed_data)[0]
        rounded_predicted_days = round(predicted_days)  # Round off to nearest whole number

        # Adjust prediction if the coconut is "Mature"
        if maturity_prediction == "Mature":
            adjusted_days = max(rounded_predicted_days - 40, 10)  # Reduce by 10 but ensure min 5 days
            print(f"🌴 Adjusted harvest prediction for MATURE coconut: {adjusted_days} days.")
        else:
            adjusted_days = rounded_predicted_days

        # Return response
        response_data = {
            "Predicted Days Until Next Harvest": adjusted_days
        }

        print(f"📡 Final Prediction Response: {response_data}")  # Debugging
        return jsonify(response_data)

    except Exception as e:
        print("❌ Error in predict_harvest:", str(e))  # Debug log
        return jsonify({"error": str(e)}), 500