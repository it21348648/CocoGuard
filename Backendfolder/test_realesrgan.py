import sys
import os

# Add Real-ESRGAN to the Python path
real_esrgan_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "Real-ESRGAN"))
sys.path.append(real_esrgan_path)

# Now try importing
from realesrgan.archs.rrdbnet_arch import RRDBNet
print("✅ Real-ESRGAN module loaded successfully!")
