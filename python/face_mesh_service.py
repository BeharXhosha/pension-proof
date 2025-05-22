import cv2
import mediapipe as mp
import numpy as np
import base64
import json
from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
import asyncio
import uvicorn
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize MediaPipe Face Mesh
mp_face_mesh = mp.solutions.face_mesh
face_mesh = mp_face_mesh.FaceMesh(
    static_image_mode=False,
    max_num_faces=1,
    min_detection_confidence=0.5,
    min_tracking_confidence=0.5
)

@app.websocket("/ws/face-mesh")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    logger.info("WebSocket connection established")
    
    try:
        while True:
            # Receive the base64 encoded image from the client
            data = await websocket.receive_text()
            
            try:
                # Parse the JSON data
                json_data = json.loads(data)
                image_data = json_data.get("image", "")
                
                if not image_data:
                    await websocket.send_json({"error": "No image data received"})
                    continue
                
                # Remove the data URL prefix if present
                if "base64," in image_data:
                    image_data = image_data.split("base64,")[1]
                
                # Decode the base64 image
                image_bytes = base64.b64decode(image_data)
                nparr = np.frombuffer(image_bytes, np.uint8)
                img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
                
                if img is None:
                    await websocket.send_json({"error": "Failed to decode image"})
                    continue
                
                # Convert to RGB for MediaPipe
                img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
                
                # Process the image with MediaPipe Face Mesh
                results = face_mesh.process(img_rgb)
                
                # Prepare response
                response = {
                    "detected": False,
                    "landmarks": [],
                    "mesh_triangles": []
                }
                
                # If face landmarks are detected
                if results.multi_face_landmarks:
                    response["detected"] = True
                    
                    # Get image dimensions
                    h, w, _ = img.shape
                    
                    # Extract landmarks
                    face_landmarks = results.multi_face_landmarks[0]
                    landmarks = []
                    
                    for landmark in face_landmarks.landmark:
                        # Convert normalized coordinates to pixel coordinates
                        x, y = int(landmark.x * w), int(landmark.y * h)
                        landmarks.append({"x": x, "y": y, "z": landmark.z})
                    
                    response["landmarks"] = landmarks
                    
                    # Add triangulation indices for mesh visualization
                    # These are the standard triangulation indices for MediaPipe Face Mesh
                    # For simplicity, we'll just include a subset of the triangles
                    triangles = mp_face_mesh.FACEMESH_TESSELATION
                    mesh_triangles = []
                    
                    for triangle in triangles[:200]:  # Limit to first 200 triangles for performance
                        mesh_triangles.append([int(triangle[0]), int(triangle[1]), int(triangle[2])])
                    
                    response["mesh_triangles"] = mesh_triangles
                
                # Send the response back to the client
                await websocket.send_json(response)
                
            except Exception as e:
                logger.error(f"Error processing image: {str(e)}")
                await websocket.send_json({"error": f"Error processing image: {str(e)}"})
    
    except Exception as e:
        logger.error(f"WebSocket error: {str(e)}")
    finally:
        logger.info("WebSocket connection closed")

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    uvicorn.run("face_mesh_service:app", host="0.0.0.0", port=8000, reload=True)
