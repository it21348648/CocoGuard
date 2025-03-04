import torch
import cv2
import numpy as np
from realesrgan import RealESRGAN

# Load the Real-ESRGAN model
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model = RealESRGAN(device, scale=4)
model.load_weights('weights/RealESRGAN_x4plus.pth', download=True)

# Function to apply super-resolution on an image
def enhance_image(image_path):
    img = cv2.imread(image_path)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    sr_img = model.predict(img)
    output_path = f"uploads/enhanced_images/enhanced_{os.path.basename(image_path)}"
    cv2.imwrite(output_path, cv2.cvtColor(sr_img, cv2.COLOR_RGB2BGR))
    return output_path
