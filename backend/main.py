from fastapi import FastAPI, UploadFile, File, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Viral Clip Repurposer API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "AI Content Repurposer API is running"}

from utils import create_presigned_url
import uuid

@app.post("/generate-upload-url")
async def generate_upload_url(filename: str):
    file_id = str(uuid.uuid4())
    object_name = f"raw/{file_id}-{filename}"
    bucket_name = os.getenv("S3_RAW_BUCKET")
    
    presigned_data = create_presigned_url(bucket_name, object_name)
    
    if not presigned_data:
        return {"error": "Could not generate upload URL"}
        
    return {
        "url": presigned_data["url"],
        "fields": presigned_data["fields"],
        "file_id": file_id,
        "object_key": object_name
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
