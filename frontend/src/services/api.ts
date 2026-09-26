import axios from 'axios';

const api = axios.create({ baseURL: '/api' });

export interface MedicineResult {
  medicine_name: string;
  generic_name: string;
  drug_class: string;
  strength: string;
  dosage_instruction_visible: string;
  frequency_visible: string;
  duration_visible: string;
  common_medical_uses: string[];
  general_mechanism: string;
  common_side_effects: string[];
  major_safety_considerations: string[];
  confidence: 'high' | 'medium' | 'low';
}

export interface ClinicalContext {
  context: string;
  reasoning_basis: string[];
  confidence: 'high' | 'medium' | 'low';
  is_diagnosis: boolean;
}

export interface AyurvedaContext {
  modern_concept: string;
  ayurveda_concept: string;
  relationship: string;
  traditional_description: string;
  modern_evidence_status: string;
  safety_note: string;
}

export interface AnalysisResult {
  document_type: string;
  document_readability: string;
  patient_information_visible: boolean;
  diagnosis_explicitly_visible: string;
  extracted_text: string;
  medicines: MedicineResult[];
  possible_clinical_context: ClinicalContext[];
  ayurveda_context: AyurvedaContext[];
  safety_information: string[];
  uncertainties: string[];
  urgent_attention: boolean;
  sources: string[];
}

export interface Medicine {
  id: string;
  name: string;
  generic_name: string;
  drug_class: string;
  description: string;
  common_uses: string[];
}

export interface AyurvedaConcept {
  id: string;
  concept_name: string;
  category: string;
  modern_related_concept: string;
  relationship: string;
  traditional_description: string;
  evidence_status: string;
  sources: string[];
}

export async function analyzePrescription(
  file: File,
  explanationLevel: string = 'standard'
): Promise<AnalysisResult> {
  const formData = new FormData();
  formData.append('prescription', file);
  formData.append('explanation_level', explanationLevel);
  const response = await api.post('/analyze-prescription', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    timeout: 120000,
  });
  return response.data;
}

export async function getMedicines(): Promise<Medicine[]> {
  const response = await api.get('/medicines');
  return response.data;
}

export async function getMedicine(id: string): Promise<Medicine> {
  const response = await api.get(`/medicines/${id}`);
  return response.data;
}

export async function getAyurveda(): Promise<AyurvedaConcept[]> {
  const response = await api.get('/ayurveda');
  return response.data;
}

export async function getAyurvedaConcept(id: string): Promise<AyurvedaConcept> {
  const response = await api.get(`/ayurveda/${id}`);
  return response.data;
}

export async function getExplanation(medicineName: string, level: string): Promise<string> {
  const response = await api.get('/explanation', {
    params: { medicine_name: medicineName, level }
  });
  return response.data.explanation;
}
