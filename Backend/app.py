from flask import Flask
from flask_cors import CORS
from routes.super_res import super_res_bp  # Import the processing route
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

# Ensure required folders exist
UPLOAD_FOLDER = "inputs"
RESULTS_FOLDER = "results"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(RESULTS_FOLDER, exist_ok=True)

# Register Blueprints
app.register_blueprint(super_res_bp, url_prefix='/api')

@app.route('/')
def home():
    return {"message": "CocoGuard Backend API is running!"}, 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
