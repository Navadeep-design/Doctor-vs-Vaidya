import os
import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from .routes import analyze, medicines, ayurveda, explanation

# Load .env from project root (two levels up from backend/app/)
env_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), '.env')
load_dotenv(dotenv_path=env_path, override=True)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Doctors x Vaidyas Services API")

# Setup CORS
allowed_origins_str = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173")
allowed_origins = [origin.strip() for origin in allowed_origins_str.split(",")]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(analyze.router, prefix="/api")
app.include_router(medicines.router, prefix="/api")
app.include_router(ayurveda.router, prefix="/api")
app.include_router(explanation.router, prefix="/api")

@app.on_event("startup")
async def startup_event():
    gemini_key = os.getenv("GEMINI_API_KEY")
    if gemini_key:
        logger.info("GEMINI_API_KEY is configured.")
    else:
        logger.warning("GEMINI_API_KEY is not configured!")

@app.get("/health")
async def health_check():
    return {"status": "ok", "service": "Doctors x Vaidyas Services"}
