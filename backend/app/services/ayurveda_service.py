import json
import pathlib
import logging

logger = logging.getLogger(__name__)
_ayurveda_data = None

def load_data():
    global _ayurveda_data
    if _ayurveda_data is None:
        data_path = pathlib.Path(__file__).parent.parent.parent.parent / "data" / "ayurveda.json"
        try:
            with open(data_path, "r", encoding="utf-8") as f:
                _ayurveda_data = json.load(f)
        except Exception as e:
            logger.error(f"Failed to load ayurveda.json: {e}")
            _ayurveda_data = []

def get_all_ayurveda() -> list[dict]:
    load_data()
    return _ayurveda_data

def get_ayurveda_by_id(concept_id: str) -> dict | None:
    load_data()
    for concept in _ayurveda_data:
        if concept.get("id") == concept_id:
            return concept
    return None
