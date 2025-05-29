import os
import numpy as np
import joblib
import pandas as pd
import tensorflow as tf
from datetime import datetime
from flask import Blueprint, request, jsonify
from tensorflow.keras.preprocessing import image
from tensorflow.keras.models import load_model

# Create Blueprint for routing
coconut_predict_bp = Blueprint("coconut_predict", __name__)

# Ensure upload directory exists
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Load classification model (MobileNetV2 for maturity classification)
maturity_model_path = os.path.join("models", "mobilenetv2_model2.keras")
maturity_model = load_model(maturity_model_path)

# Load regression models
# - mature_model2.pkl for Maturity Status = "Mature"
# - young_model2.pkl for Maturity Status = "Young"
mature_model = joblib.load(os.path.join(os.path.dirname(__file__), "../models/mature_model2.pkl"))
young_model = joblib.load(os.path.join(os.path.dirname(__file__), "../models/young_model2.pkl"))

# Maturity label classes
CLASS_NAMES = ["Mature", "NonCoconut", "Old", "Young"]

def preprocess_image(img_path):
    """
    Preprocess uploaded image to be compatible with MobileNetV2 input shape.
    """
    img = image.load_img(img_path, target_size=(224, 224))
    img_array = image.img_to_array(img) / 255.0
    return np.expand_dims(img_array, axis=0)

@coconut_predict_bp.route("/classify", methods=["POST"])
def classify_coconut():
    """
    Step 1: Classify coconut image using MobileNetV2 model.
    Returns one of: 'Mature', 'Young', 'Old', or 'NonCoconut'.
    """
    try:
        if "file" not in request.files:
            return jsonify({"error": "No file uploaded"}), 400

        file = request.files["file"]
        file_path = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(file_path)

        img_array = preprocess_image(file_path)
        predictions = maturity_model.predict(img_array)
        predicted_class = CLASS_NAMES[np.argmax(predictions)]

        response = {
            "prediction": predicted_class,
            "confidence": float(np.max(predictions))
        }

        if predicted_class == "NonCoconut":
            response["message"] = "This is not a valid coconut."
        elif predicted_class == "Old":
            response["message"] = "The coconut is old and should be plucked."
        elif predicted_class in ["Young", "Mature"]:
            response["next_step"] = "Provide additional harvest data for prediction"

        return jsonify(response)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@coconut_predict_bp.route("/predict", methods=["POST"])
def predict_harvest():
    """
    Step 2: Predict next harvest interval in days using regression model.
    Requires:
        - Location
        - No. of Trees
        - Three harvest dates
        - Three coconut counts
        - Maturity Status ("Mature" or "Young")
    """
    try:
        data = request.get_json()

        maturity_status = data.get("Maturity Status")
        if maturity_status not in ["Mature", "Young"]:
            return jsonify({"error": "Invalid or missing 'Maturity Status'. Expected 'Mature' or 'Young'."}), 400

        # Parse harvest dates
        date1 = datetime.strptime(data["Harvest Date 1"], "%Y-%m-%d")
        date2 = datetime.strptime(data["Harvest Date 2"], "%Y-%m-%d")
        date3 = datetime.strptime(data["Harvest Date 3"], "%Y-%m-%d")

        # Calculate derived features
        days_1_2 = (date2 - date1).days
        days_2_3 = (date3 - date2).days
        avg_interval = (days_1_2 + days_2_3) / 2
        avg_coconuts_per_tree = (
            data["Coconuts Plucked 1"] + data["Coconuts Plucked 2"] + data["Coconuts Plucked 3"]
        ) / (3 * data["No. of Trees"])

        # Yield trend factor
        if data["Coconuts Plucked 3"] > data["Coconuts Plucked 1"]:
            trend = 1  # Increasing
        elif data["Coconuts Plucked 3"] < data["Coconuts Plucked 1"]:
            trend = -1  # Decreasing
        else:
            trend = 0   # Stable

        # Prepare feature set
        features = pd.DataFrame([{
            "Location": data["Location"],
            "No. of Trees": data["No. of Trees"],
            "Days Between 1 & 2": days_1_2,
            "Days Between 2 & 3": days_2_3,
            "Avg Harvest Interval": avg_interval,
            "Avg Coconuts Per Tree": avg_coconuts_per_tree,
            "Yield Trend Factor": trend
        }])

        # Select appropriate model
        model = mature_model if maturity_status == "Mature" else young_model
        predicted_days = round(model.predict(features)[0])

        return jsonify({"Predicted Days Until Next Harvest": predicted_days})

    except Exception as e:
        return jsonify({"error": str(e)}), 500