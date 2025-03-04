from flask import Blueprint, request, jsonify
import subprocess
import os

super_res_bp = Blueprint('super_res', __name__)  # Create the Blueprint

@super_res_bp.route('/process', methods=['POST'])
def process_image():
    try:
        # Ensure input and result directories exist
        os.makedirs("inputs", exist_ok=True)
        os.makedirs("results", exist_ok=True)

        # Get the uploaded file
        if 'image' not in request.files:
            return jsonify({'error': 'No image file provided'}), 400

        image = request.files['image']
        image_path = os.path.join('inputs', image.filename)
        image.save(image_path)  # Save image to the 'inputs' folder

        # Run Real-ESRGAN inference
        command = f"python Real-ESRGAN/inference_realesrgan.py -i {image_path} -o results/ --tile 400 --fp32"
        subprocess.run(command, shell=True, check=True)

        # Construct output file path
        output_image_name = f"{os.path.splitext(image.filename)[0]}_out.png"
        output_image_path = os.path.join('results', output_image_name)

        # Ensure the output image exists
        if not os.path.exists(output_image_path):
            return jsonify({'error': 'Processing failed, no output generated'}), 500

        return jsonify({'message': 'Processing complete', 'output_image': output_image_path})

    except subprocess.CalledProcessError as e:
        return jsonify({'error': f'Processing error: {str(e)}'}), 500

    except Exception as e:
        return jsonify({'error': f'Unexpected error: {str(e)}'}), 500
