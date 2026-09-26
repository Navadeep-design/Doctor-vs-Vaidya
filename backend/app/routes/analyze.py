import logging
from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from ..utils.validation import validate_upload, ValidationError
from ..services.prescription_service import analyze_prescription
from ..services.gemini_service import GeminiUnavailableError

router = APIRouter()
logger = logging.getLogger(__name__)

@router.post("/analyze-prescription")
async def analyze_prescription_endpoint(
    prescription: UploadFile = File(...),
    explanation_level: str = Form("standard")
):
    try:
        validate_upload(prescription)
        result = await analyze_prescription(prescription, explanation_level)
        return result
    except ValidationError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except GeminiUnavailableError as e:
        raise HTTPException(
            status_code=503, 
            detail="AI analysis is currently unavailable. Please check your API key configuration and try again."
        )
    except Exception as e:
        logger.error(f"Error analyzing prescription: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=500, 
            detail="An unexpected error occurred during analysis. Please try again."
        )
