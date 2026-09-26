from pydantic import BaseModel
from typing import List, Optional

class MedicineSchema(BaseModel):
    medicine_name: str = ""
    generic_name: str = ""
    drug_class: str = ""
    strength: str = ""
    dosage_instruction_visible: str = ""
    frequency_visible: str = ""
    duration_visible: str = ""
    common_medical_uses: List[str] = []
    general_mechanism: str = ""
    common_side_effects: List[str] = []
    major_safety_considerations: List[str] = []
    confidence: str = ""

class ClinicalContextSchema(BaseModel):
    context: str = ""
    reasoning_basis: List[str] = []
    confidence: str = ""
    is_diagnosis: bool = False

class AyurvedaContextSchema(BaseModel):
    modern_concept: str = ""
    ayurveda_concept: str = ""
    relationship: str = ""
    traditional_description: str = ""
    modern_evidence_status: str = ""
    safety_note: str = ""

class PrescriptionAnalysisResponse(BaseModel):
    document_type: str = "unknown"
    document_readability: str = "unreadable"
    patient_information_visible: bool = False
    diagnosis_explicitly_visible: str = "No diagnosis explicitly visible"
    extracted_text: str = ""
    medicines: List[MedicineSchema] = []
    possible_clinical_context: List[ClinicalContextSchema] = []
    ayurveda_context: List[AyurvedaContextSchema] = []
    safety_information: List[str] = []
    uncertainties: List[str] = []
    urgent_attention: bool = False
    sources: List[str] = []
    
    # Metadata fields added by prescription_service
    analysis_time_seconds: Optional[float] = None
    file_name: Optional[str] = None
    file_size_bytes: Optional[int] = None
    file_type: Optional[str] = None
