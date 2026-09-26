import json
import pathlib
import logging

logger = logging.getLogger(__name__)
_medicines_data = None

def load_data():
    global _medicines_data
    if _medicines_data is None:
        data_path = pathlib.Path(__file__).parent.parent.parent.parent / "data" / "medicines.json"
        try:
            with open(data_path, "r", encoding="utf-8") as f:
                _medicines_data = json.load(f)
        except Exception as e:
            logger.error(f"Failed to load medicines.json: {e}")
            _medicines_data = []

def get_all_medicines() -> list[dict]:
    load_data()
    return _medicines_data

def get_medicine_by_id(medicine_id: str) -> dict | None:
    load_data()
    for med in _medicines_data:
        if med.get("id") == medicine_id:
            return med
    return None
