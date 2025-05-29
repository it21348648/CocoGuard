import cv2
import os

def resize_image(input_path, output_path, max_width=1920, max_height=1080):
    """Resizes the image while maintaining aspect ratio for faster processing."""
    
    if not os.path.exists(input_path):
        print(f"Error: {input_path} not found.")
        return None

    img = cv2.imread(input_path)

    if img is None:
        print("Error: Failed to load image.")
        return None

    original_height, original_width = img.shape[:2]

    if original_width > max_width or original_height > max_height:
        scale_ratio = min(max_width / original_width, max_height / original_height)
        new_width = int(original_width * scale_ratio)
        new_height = int(original_height * scale_ratio)

        img = cv2.resize(img, (new_width, new_height), interpolation=cv2.INTER_AREA)
        print(f"Resized image to {new_width}x{new_height} for faster processing.")

    cv2.imwrite(output_path, img)
    return output_path
