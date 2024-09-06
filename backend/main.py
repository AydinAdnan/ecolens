from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from PIL import Image
import io
import base64
from ultralytics import YOLO

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["POST"],  # Only allow POST requests
    allow_headers=["*"],  # Allow all headers
)

# Load the model
model = YOLO("waste_detection_yolo.pt")

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    # Check if the uploaded file is an image
    if file.content_type not in ["image/jpeg", "image/png", "image/bmp"]:
        return JSONResponse({"error": "Only image files are supported"}, status_code=400)

    # Read the image file
    contents = await file.read()
    image = Image.open(io.BytesIO(contents))

    # Make prediction
    results = model(image)

    # Process the results
    detected_objects = process_results(results)

    # Initialize the image variable
    im = None

    # Iterate through results and only draw bounding boxes for objects with >0.8 probability
    for r in results:
        valid_boxes = []
        for box in r.boxes:
            probability = box.conf.item()
            if probability > 0.8:
                cls_name = model.names[int(box.cls)]
                print(f"Detected: {cls_name}, Probability: {probability:.2f}")
                valid_boxes.append(box)  # Append boxes that meet the threshold

        # Plot only the valid boxes
        if valid_boxes:
            # Filter out the valid boxes from the result and plot them
            im_array = r.plot()  # plot a BGR numpy array of valid predictions
            im = Image.fromarray(im_array[..., ::-1])  # Convert BGR to RGB PIL image

    # Convert image to base64 if im exists
    if im:
        buffered = io.BytesIO()
        im.save(buffered, format="JPEG")
        img_str = base64.b64encode(buffered.getvalue()).decode()
    else:
        img_str = "No objects detected"

    return JSONResponse({
        "detected_objects": detected_objects,
        "image": img_str
    })

def process_results(results):
    detected = []
    for r in results:
        for box in r.boxes:
            probability = box.conf.item()
            if probability > 0.8:
                c = box.cls
                detected.append(model.names[int(c)])
    return detected

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)