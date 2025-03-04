import tensorflow as tf
import os

# ✅ Update the path to point to the "models" directory
MODEL_PATH = os.path.join(os.getcwd(), "models", "coconut_mobilenetv2_model.h5")

try:
    # Load the MobileNet model
    model = tf.keras.models.load_model(MODEL_PATH)

    # Print model summary to confirm it's loaded
    model.summary()

    print("✅ MobileNet Model Loaded Successfully!")

except Exception as e:
    print(f"❌ Error loading MobileNet model: {str(e)}")
