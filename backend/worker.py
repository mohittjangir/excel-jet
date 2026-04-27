from celery_app import celery_app
import time
from database import SessionLocal
from models import Project, Clip
import os
from openai import OpenAI
from utils import get_download_url
import moviepy as mp

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

@celery_app.task(name="process_video")
def process_video(project_id: int):
    db = SessionLocal()
    project = db.query(Project).filter(Project.id == project_id).first()
    
    if not project:
        return "Project not found"

    try:
        # Step 1: Transcribe
        project.status = "transcribing"
        db.commit()
        transcript = transcribe_video(project.raw_video_url)
        
        # Step 2: Identify Viral Moments
        project.status = "clipping"
        db.commit()
        clips_data = identify_viral_moments(transcript)
        
        # Step 3: Render Clips (FFmpeg)
        project.status = "rendering"
        db.commit()
        for clip_info in clips_data:
            render_clip(project_id, clip_info)
            
        project.status = "completed"
        db.commit()
        
    except Exception as e:
        project.status = "failed"
        db.commit()
        print(f"Error processing video: {e}")
        return str(e)
    finally:
        db.close()

def transcribe_video(video_url: str):
    """
    Transcribes video using OpenAI Whisper.
    """
    try:
        # 1. Download video or audio (Simplified for now)
        # 2. Call Whisper API
        print(f"Transcribing {video_url}...")
        audio_file = open("temp_audio.mp3", "rb") # This would be extracted from the video_url
        transcript = client.audio.transcriptions.create(
            model="whisper-1", 
            file=audio_file,
            response_format="verbose_json",
            timestamp_granularities=["word"]
        )
        return transcript
    except Exception as e:
        print(f"Transcription error: {e}")
        raise e

def identify_viral_moments(transcript):
    """
    Uses GPT-4o to analyze the transcript and return high-impact segments.
    """
    try:
        print("Finding viral moments in transcript...")
        prompt = f"""
        Analyze the following transcript and identify the top 5 viral-ready segments.
        Return a JSON list of objects with 'title', 'start_time', 'end_time', 'caption', and 'hook'.
        
        Transcript: {transcript}
        """
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "user", "content": prompt}],
            response_format={ "type": "json_object" }
        )
        return response.choices[0].message.content
    except Exception as e:
        print(f"AI Analysis error: {e}")
        raise e

def render_clip(project_id, clip_info):
    """
    Crops video to 9:16 and burns in captions.
    """
    print(f"Rendering clip: {clip_info['title']}...")
    # This will use MoviePy/FFmpeg logic
    # 1. Load video
    # 2. Resize/Crop to 9:16 (Center crop for now, face detection later)
    # 3. Add text overlays
    # 4. Save to S3
    pass
