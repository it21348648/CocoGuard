from flask import Flask, send_from_directory
from flask_cors import CORS
from routes.super_res import super_res_bp  # Import the processing route
from routes.xai import xai_bp
from routes.xai2 import xai2_bp
import os
from config import UPLOAD_FOLDER, RESULTS_FOLDER  # Import config variables

app = Flask(__name__)

# Enable CORS for all routes
CORS(app, resources={r"/*": {"origins": "*"}})

# Ensure required folders exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(RESULTS_FOLDER, exist_ok=True)

# Register Blueprints
app.register_blueprint(super_res_bp, url_prefix='/api')
app.register_blueprint(xai_bp, url_prefix='/api')
app.register_blueprint(xai2_bp, url_prefix='/api')

@app.route('/')
def home():
    return {"message": "CocoGuard Backend API is running!"}, 200

# ✅ Serve result images from "results/" directory
@app.route('/results/<filename>')
def get_results(filename):
    return send_from_directory(RESULTS_FOLDER, filename)

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=6000)  # Allow access from other devices