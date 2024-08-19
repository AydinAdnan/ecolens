from ultralytics import YOLO
import os

# Load the YOLOv8 model
model = YOLO('yolov8m-seg.pt')

# Check if the image file exists
image_path = '000032.JPG'
if not os.path.exists(image_path):
    raise FileNotFoundError(f"Image file '{image_path}' not found.")

# Run inference on an image
results = model(image_path)

# Display the results
for result in results:
    result.show()  # This will display the image with the detected objects
# Optionally, save the results to a file
# for result in results:
#     result.save('path/to/save/results')