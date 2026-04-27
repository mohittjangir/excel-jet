import boto3
import os
from botocore.config import Config
from dotenv import load_dotenv

load_dotenv()

s3_client = boto3.client(
    's3',
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
    region_name=os.getenv("AWS_REGION"),
    config=Config(signature_version='s3v4')
)

def create_presigned_url(bucket_name, object_name, expiration=3600):
    try:
        response = s3_client.generate_presigned_post(
            bucket_name,
            object_name,
            Fields=None,
            Conditions=None,
            ExpiresIn=expiration
        )
    except Exception as e:
        print(f"Error generating presigned URL: {e}")
        return None
    return response

def get_download_url(bucket_name, object_name, expiration=3600):
    try:
        response = s3_client.generate_presigned_url(
            'get_object',
            Params={'Bucket': bucket_name, 'Key': object_name},
            ExpiresIn=expiration
        )
    except Exception as e:
        print(f"Error generating download URL: {e}")
        return None
    return response
