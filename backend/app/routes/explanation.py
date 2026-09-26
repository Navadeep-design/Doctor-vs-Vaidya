import logging
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from ..services.gemini_service import generate_explanation, GeminiUnavailableError

router = APIRouter()
logger = logging.getLogger(__name__)

class ExplanationRequest(BaseModel):
    medicine_name: str
    level: str

@router.post("/explanation")
async def get_explanation(request: ExplanationRequest):
    if request.level not in ["beginner", "standard", "detailed"]:
        raise HTTPException(status_code=400, detail="Invalid explanation level")
    try:
        explanation = await generate_explanation(request.medicine_name, request.level)
        return {
            "explanation": explanation,
            "level": request.level,
            "medicine_name": request.medicine_name
        }
    except GeminiUnavailableError:
        raise HTTPException(status_code=503, detail="AI service unavailable")
    except Exception as e:
        logger.error(f"Error generating explanation: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail="Internal server error")
