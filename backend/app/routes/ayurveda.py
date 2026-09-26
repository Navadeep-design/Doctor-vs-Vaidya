from fastapi import APIRouter, HTTPException
from ..services import ayurveda_service

router = APIRouter()

@router.get("/ayurveda")
async def get_all_ayurveda():
    return ayurveda_service.get_all_ayurveda()

@router.get("/ayurveda/{concept_id}")
async def get_ayurveda(concept_id: str):
    concept = ayurveda_service.get_ayurveda_by_id(concept_id)
    if not concept:
        raise HTTPException(status_code=404, detail="Ayurveda concept not found")
    return concept
