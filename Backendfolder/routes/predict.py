from flask import Blueprint, request, jsonify
import joblib
import numpy as np
import os

predict_bp = Blueprint('predict', __name__)  # ✅ Define Blueprint

# ✅ Load your trained model
MODEL_PATH = os.path.join("models", "random_forest_model.pkl")

try:
    model = joblib.load(MODEL_PATH)
    print("✅ Random Forest Model Loaded Successfully!")
except Exception as e:
    print(f" Error loading model: {str(e)}")


@predict_bp.route("/", methods=["POST"])
def predict():
    try:
        data = request.json
        temperature = float(data["temperature"])
        ph = float(data["ph"])
        humidity = float(data["humidity"])

        # ✅ Make prediction
        input_data = np.array([[temperature, ph, humidity]])
        predicted_values = model.predict(input_data)

        response = {
            "Nitrogen": round(predicted_values[0][0], 2),
            "Phosphorus": round(predicted_values[0][1], 2),
            "Potassium": round(predicted_values[0][2], 2)
        }
        return jsonify(response), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 400
