from fastapi import APIRouter, HTTPException
from ..services import medicine_service

router = APIRouter()

@router.get("/medicines")
async def get_all_medicines():
    return medicine_service.get_all_medicines()

@router.get("/medicines/{medicine_id}")
async def get_medicine(medicine_id: str):
    medicine = medicine_service.get_medicine_by_id(medicine_id)
    if not medicine:
        raise HTTPException(status_code=404, detail="Medicine not found")
    return medicine
