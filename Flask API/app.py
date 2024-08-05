

# In-memory storage
# images = {}

# from ultralytics import YOLO

# model= YOLO("best.pt")
# result = model.predict(source="auto-3734396_1280.jpg", show=True, save=True, conf=0.3)


# from flask import Flask, jsonify, request

# app = Flask(__name__)
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from ultralytics import YOLO
from PIL import Image
import io
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

# Load your YOLOv8 model
model = YOLO('best.pt')

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No image selected for uploading'}), 400

    # Read the image file
    img_bytes = file.read()
    img = Image.open(io.BytesIO(img_bytes))

    # Save the image temporarily
    upload_folder = './uploads'  # Define your upload folder path
    if not os.path.exists(upload_folder):
        os.makedirs(upload_folder)
    
    # Generate a unique filename or use the original filename
    img_filename = os.path.join(upload_folder, file.filename)
    img.save(img_filename)

    # Make prediction
    results = model.predict(source=img_filename,show=True,save=True,conf=0.3)

    formatted_results = []
    names = {}
    orig_shape = None
    path = ''
    save_dir = ''
    speed = {}

    # Check if results is a list of Results objects
    if isinstance(results, list):
        for res in results:
            boxes = res.boxes.xyxy.tolist()  # Convert bounding boxes to list
            confs = res.boxes.conf.tolist()  # Convert confidence scores to list
            classes = res.boxes.cls.tolist()  # Convert class labels to list
            names = res.names
            orig_shape = res.orig_shape
            path = res.path
            save_dir = res.save_dir
            speed = res.speed

            for i in range(len(boxes)):
                bbox = {
                    "x1": float(boxes[i][0]),
                    "y1": float(boxes[i][1]),
                    "x2": float(boxes[i][2]),
                    "y2": float(boxes[i][3])
                }
                class_id = int(classes[i])
                formatted_results.append({
                    "name": names[class_id],
                    "class": class_id,
                    "confidence": float(confs[i]),
                    "bbox": bbox
                })
    else:
        # Process single Results object
        boxes = results.boxes.xyxy.tolist()  # Convert bounding boxes to list
        confs = results.boxes.conf.tolist()  # Convert confidence scores to list
        classes = results.boxes.cls.tolist()  # Convert class labels to list
        names = results.names
        orig_shape = results.orig_shape
        path = results.path
        save_dir = results.save_dir
        speed = results.speed

        for i in range(len(boxes)):
            bbox = {
                "x1": float(boxes[i][0]),
                "y1": float(boxes[i][1]),
                "x2": float(boxes[i][2]),
                "y2": float(boxes[i][3])
            }
            class_id = int(classes[i])
            formatted_results.append({
                "name": names[class_id],
                "class": class_id,
                "confidence": float(confs[i]),
                "bbox": bbox
            })

    save_path = save_dir + "\\" +  file.filename
    # Prepare response JSON without orig_img
    response_data = {
        "results": formatted_results,
        "orig_shape": orig_shape,
        "path": path,
        "save_dir": save_dir,
        "speed": speed,
        "names": names,
        "image_path": save_path  # Provide the path to the saved image
    }
    return jsonify(response_data)

@app.route('/image/<path:image_path>')
def serve_image(image_path):
    return send_file(image_path)

if __name__ == '__main__':
    app.run(debug=True)
