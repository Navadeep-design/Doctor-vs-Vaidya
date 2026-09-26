import os
import pathlib
from fastapi import UploadFile

class ValidationError(Exception):
    pass

def validate_upload(file: UploadFile):
    allowed_mime_types = ["image/jpeg", "image/png", "image/jpg", "application/pdf"]
    allowed_extensions = [".jpg", ".jpeg", ".png", ".pdf"]
    
    if not file:
        raise ValidationError("No file provided.")
    if not file.content_type:
        raise ValidationError("File content type is missing.")
        
    if file.content_type not in allowed_mime_types:
        raise ValidationError(f"File type {file.content_type} is not supported. Please upload an image or PDF.")
        
    if file.filename:
        ext = pathlib.Path(file.filename).suffix.lower()
        if ext not in allowed_extensions:
            raise ValidationError(f"File extension {ext} is not supported.")
            
    return True

def validate_file_size(file_bytes: bytes, max_mb: int = None):
    if max_mb is None:
        try:
            max_mb = int(os.getenv("MAX_UPLOAD_SIZE_MB", "10"))
        except ValueError:
            max_mb = 10
            
    max_bytes = max_mb * 1024 * 1024
    if len(file_bytes) > max_bytes:
        raise ValidationError(f"File size exceeds the {max_mb}MB limit.")
