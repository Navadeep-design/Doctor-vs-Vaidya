import asyncio
import logging
import time
from fastapi import UploadFile
from .gemini_service import analyze_prescription_with_gemini, GeminiUnavailableError

logger = logging.getLogger(__name__)

async def analyze_prescription(file: UploadFile, explanation_level: str) -> dict:
    file_bytes = await file.read()
    start_time = time.time()
    
    try:
        result = await analyze_prescription_with_gemini(file_bytes, file.content_type)
        
        analysis_time = round(time.time() - start_time, 1)
        result["analysis_time_seconds"] = analysis_time
        result["file_name"] = file.filename
        result["file_size_bytes"] = len(file_bytes)
        result["file_type"] = file.content_type
        
        return result
    except GeminiUnavailableError as e:
        logger.error(f"GeminiUnavailableError in analyze_prescription: {e}")
        raise e
    except Exception as e:
        logger.error(f"Unexpected error in analyze_prescription: {e}", exc_info=True)
        raise e
