import os
import re
import json
import asyncio
import logging
import base64
import google.generativeai as genai

logger = logging.getLogger(__name__)


class GeminiUnavailableError(Exception):
    pass


def get_gemini_client() -> genai.GenerativeModel:
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key or not api_key.strip():
        raise GeminiUnavailableError("GEMINI_API_KEY is not configured.")
    genai.configure(api_key=api_key)
    model_name = os.getenv("GEMINI_MODEL", "gemini-1.5-flash")
    return genai.GenerativeModel(model_name)


SYSTEM_PROMPT = """You are an educational medical-information extraction and explanation assistant.

Your task is to analyze the supplied prescription image or medical document.

You must only use information that is actually visible/readable in the supplied document plus clearly identified general medical knowledge.

Do NOT invent medicine names, dosages, diagnoses, symptoms, lab values, or instructions.

First: Extract what is actually visible in the document.
Second: Identify medicines only when you are reasonably confident they are visible in the document.
Third: Explain what each identified medicine is generally used for (general medical knowledge).
Fourth: Identify a POSSIBLE CLINICAL CONTEXT only when supported by the extracted information from THIS document.

Never claim the prescription proves a diagnosis.

If the document contains an explicit diagnosis written by the clinician, report it under diagnosis_explicitly_visible.
If no diagnosis is explicitly written, set diagnosis_explicitly_visible to 'No diagnosis explicitly visible'.

If a medicine name is unclear, set medicine_name to 'Medicine not confidently identified'.
If dosage is unclear, set strength to 'Not confidently readable'.

CRITICAL: Do not mention diabetes, Metformin, Madhumeha, or any specific disease unless it is actually visible and readable in the uploaded document. Each prescription must be analyzed fresh from the actual content of the uploaded file. Never reuse results from previous analyses.

For Ayurveda context: Do not automatically equate modern medical diseases with Ayurvedic concepts. When relevant based on the actual medicines identified, identify an Ayurvedic concept and label the relationship clearly.

Relationship values must be one of:
- Roughly related concept
- Partly overlapping concept
- Traditional analogue discussed in Ayurveda
- No clear equivalent identified
- Evidence insufficient
- Not applicable

Always separate: Modern Medical Information | Traditional Ayurvedic Knowledge | Scientific Evidence | AI Explanation.

Never present traditional Ayurvedic claims as modern clinical evidence.
Do not recommend replacing prescribed medicine with Ayurveda.
Do not recommend stopping or changing medication.
Do not provide personalized treatment decisions.
Do not provide individualized dosage recommendations.

When uncertain, indicate that verification by a qualified healthcare professional is required.

Return ONLY valid JSON matching this exact schema (no markdown code fences, no explanation text, just the raw JSON object):

{
  "document_type": "prescription",
  "document_readability": "readable",
  "patient_information_visible": false,
  "diagnosis_explicitly_visible": "No diagnosis explicitly visible",
  "extracted_text": "",
  "medicines": [
    {
      "medicine_name": "",
      "generic_name": "",
      "drug_class": "",
      "strength": "",
      "dosage_instruction_visible": "",
      "frequency_visible": "",
      "duration_visible": "",
      "common_medical_uses": [],
      "general_mechanism": "",
      "common_side_effects": [],
      "major_safety_considerations": [],
      "confidence": "high"
    }
  ],
  "possible_clinical_context": [
    {
      "context": "",
      "reasoning_basis": [],
      "confidence": "medium",
      "is_diagnosis": false
    }
  ],
  "ayurveda_context": [
    {
      "modern_concept": "",
      "ayurveda_concept": "",
      "relationship": "",
      "traditional_description": "",
      "modern_evidence_status": "",
      "safety_note": ""
    }
  ],
  "safety_information": [],
  "uncertainties": [],
  "urgent_attention": false,
  "sources": []
}"""


def _extract_json_from_text(text: str) -> str:
    """Strip markdown code fences and extract raw JSON string."""
    text = text.strip()
    # Remove ```json ... ``` or ``` ... ```
    text = re.sub(r'^```(?:json)?\s*\n?', '', text, flags=re.IGNORECASE)
    text = re.sub(r'\n?```\s*$', '', text)
    text = text.strip()
    # If still not starting with {, find first {
    if not text.startswith('{'):
        idx = text.find('{')
        if idx != -1:
            text = text[idx:]
    # Trim to matching last }
    last_brace = text.rfind('}')
    if last_brace != -1:
        text = text[:last_brace + 1]
    return text.strip()


def _call_gemini_sync(client: genai.GenerativeModel, parts: list) -> str:
    """Synchronous Gemini call — run in thread pool to avoid blocking event loop."""
    response = client.generate_content(parts)
    return response.text


_SAFE_DEFAULTS = {
    "document_type": "unknown",
    "document_readability": "unreadable",
    "patient_information_visible": False,
    "diagnosis_explicitly_visible": "No diagnosis explicitly visible",
    "extracted_text": "",
    "medicines": [],
    "possible_clinical_context": [],
    "ayurveda_context": [],
    "safety_information": ["Always consult a qualified healthcare professional."],
    "uncertainties": [],
    "urgent_attention": False,
    "sources": ["Educational reference"]
}

_LIST_KEYS = ["medicines", "possible_clinical_context", "ayurveda_context",
              "safety_information", "uncertainties", "sources"]
_BOOL_KEYS = ["patient_information_visible", "urgent_attention"]
_STR_KEYS = ["document_type", "document_readability",
             "diagnosis_explicitly_visible", "extracted_text"]


def _ensure_defaults(data: dict) -> dict:
    """Fill missing keys with safe defaults."""
    for key in _LIST_KEYS:
        if key not in data or not isinstance(data[key], list):
            data[key] = _SAFE_DEFAULTS[key]
    for key in _BOOL_KEYS:
        if key not in data:
            data[key] = _SAFE_DEFAULTS[key]
    for key in _STR_KEYS:
        if key not in data:
            data[key] = _SAFE_DEFAULTS[key]
    return data


async def analyze_prescription_with_gemini(file_bytes: bytes, mime_type: str) -> dict:
    try:
        client = get_gemini_client()
    except GeminiUnavailableError:
        raise

    part = {
        "inline_data": {
            "mime_type": mime_type,
            "data": base64.b64encode(file_bytes).decode("utf-8")
        }
    }

    try:
        # Run the synchronous SDK call in a thread pool to avoid blocking FastAPI's event loop
        text = await asyncio.to_thread(_call_gemini_sync, client, [SYSTEM_PROMPT, part])
        logger.debug(f"Gemini raw response (first 200 chars): {text[:200]}")

        cleaned = _extract_json_from_text(text)

        try:
            data = json.loads(cleaned)
        except json.JSONDecodeError as parse_err:
            logger.error(
                f"JSON parse error from Gemini response: {parse_err}. "
                f"Cleaned text (first 500 chars): {cleaned[:500]}"
            )
            return {
                **_SAFE_DEFAULTS,
                "document_readability": "unreadable",
                "uncertainties": [
                    "The AI response could not be parsed as structured data. "
                    "Please try again with a clearer document."
                ],
            }

        return _ensure_defaults(data)

    except GeminiUnavailableError:
        raise
    except Exception as e:
        logger.error(f"Gemini API error: {e}", exc_info=True)
        raise GeminiUnavailableError(f"Error communicating with the AI service: {str(e)}")


async def generate_explanation(medicine_name: str, level: str) -> str:
    level_map = {
        "beginner": (
            "in simple everyday language for someone with no medical background. "
            "Avoid jargon. Use analogies where helpful."
        ),
        "standard": (
            "at a general educated level. Explain key medical terms briefly."
        ),
        "detailed": (
            "at a medical student / pharmacology level. Include mechanism of action, "
            "pharmacokinetics basics, clinical considerations, and drug class context."
        ),
    }
    level_desc = level_map.get(level, level_map["standard"])

    prompt = (
        f"Provide an educational explanation of the medicine '{medicine_name}' "
        f"{level_desc}\n\n"
        "Cover: general uses, how it broadly works, and important safety points. "
        "This is for educational purposes only — do not give personalized medical advice. "
        "End with: 'This is educational information only. Always consult a qualified "
        "healthcare professional for medical decisions.'"
    )

    try:
        client = get_gemini_client()
        text = await asyncio.to_thread(_call_gemini_sync, client, [prompt])
        return text
    except GeminiUnavailableError:
        raise
    except Exception as e:
        logger.error(f"Gemini API error in generate_explanation: {e}", exc_info=True)
        raise GeminiUnavailableError(f"Error generating explanation: {str(e)}")
