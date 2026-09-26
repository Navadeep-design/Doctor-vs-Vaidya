# Doctors × Vaidyas Services

> **Bridging Modern Medicine and Ayurveda Through AI**

An AI-powered educational platform that helps students and users understand prescriptions, medicines, medical terminology, and related Ayurvedic concepts — powered by Google Gemini.

---

## ⚠️ Educational Use Only

This platform helps users **understand** prescription information and medical concepts. It does **not** diagnose diseases, prescribe medication, replace a doctor or Vaidya, or advise users to start, stop, or change treatment.

---

## 🚀 Quick Start

### Prerequisites

- Python 3.11+ installed
- Node.js 18+ installed
- A Google Gemini API key ([Get one here](https://aistudio.google.com/app/apikey))

---

### 1. Clone / Open the Project

```bash
cd c:\Users\bandi\doctor
```

---

### 2. Create the Environment File

```bash
copy .env.example .env
```

Open `.env` and fill in:

```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
GEMINI_MODEL=gemini-1.5-flash
```

> **Never commit `.env` to Git.**

---

### 3. Set Up the Backend

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

---

### 4. Start the Backend

```bash
# From backend/ directory, with venv activated:
uvicorn app.main:app --reload --port 8000
```

Backend API will be available at: **http://localhost:8000**

- Health check: http://localhost:8000/health
- API docs: http://localhost:8000/docs

---

### 5. Set Up the Frontend

```bash
# Open a new terminal
cd c:\Users\bandi\doctor\frontend

npm install
```

---

### 6. Start the Frontend

```bash
npm run dev
```

Frontend will be available at: **http://localhost:5173**

---

## 🔬 Testing

### Test Live Analysis (Real Gemini)

1. Navigate to http://localhost:5173/analyzer
2. Upload any prescription image (JPG/PNG/PDF)
3. Click **Analyze Prescription**
4. Wait for the AI to analyze
5. Review the structured results

### Test Demo Mode

1. Navigate to http://localhost:5173/analyzer
2. Click **Try Demo Prescription**
3. Fictional demo data will be displayed
4. Note the **FICTIONAL DEMO DATA** banner

### Test Error Handling

1. Remove API key from `.env`
2. Upload a prescription
3. You should see: **"AI analysis is currently unavailable"**
4. Demo mode still works

---

## 📁 Project Structure

```
doctors-vaidyas-services/
├── .env.example              # Environment template
├── .gitignore
├── README.md
├── data/
│   ├── medicines.json        # Educational medicine database (20 medicines)
│   └── ayurveda.json         # Ayurveda knowledge base (15 concepts)
├── backend/
│   ├── requirements.txt
│   └── app/
│       ├── main.py           # FastAPI application
│       ├── routes/
│       │   ├── analyze.py    # POST /api/analyze-prescription
│       │   ├── medicines.py  # GET /api/medicines
│       │   ├── ayurveda.py   # GET /api/ayurveda
│       │   └── explanation.py # POST /api/explanation
│       ├── services/
│       │   ├── gemini_service.py       # Gemini API integration
│       │   ├── prescription_service.py # File processing
│       │   ├── medicine_service.py     # Medicine data
│       │   └── ayurveda_service.py     # Ayurveda data
│       ├── schemas/
│       │   └── prescription.py         # Pydantic models
│       └── utils/
│           └── validation.py           # Upload validation
└── frontend/
    ├── package.json
    ├── vite.config.ts
    ├── tailwind.config.js
    └── src/
        ├── App.tsx
        ├── main.tsx
        ├── index.css
        ├── services/
        │   ├── api.ts         # Typed API client
        │   └── auth.ts        # Firebase auth wrapper
        ├── components/
        │   ├── Navbar.tsx
        │   ├── Hero.tsx
        │   ├── Disclaimer.tsx
        │   ├── UploadBox.tsx
        │   ├── ProcessingState.tsx
        │   ├── ResultDashboard.tsx
        │   ├── MedicineCard.tsx
        │   ├── ClinicalContextCard.tsx
        │   ├── AyurvedaCard.tsx
        │   ├── SourceCard.tsx
        │   └── Footer.tsx
        └── pages/
            ├── Home.tsx
            ├── Analyzer.tsx
            ├── Medicines.tsx
            ├── AyurvedaPage.tsx
            ├── HowItWorks.tsx
            ├── About.tsx
            ├── Team.tsx
            └── Login.tsx
```

---

## 🛠️ Technology Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite + TypeScript |
| Styling | Tailwind CSS |
| Routing | React Router v6 |
| Backend | Python + FastAPI |
| AI | Google Gemini 1.5 Flash |
| Data | JSON (educational database) |
| Authentication | Firebase Auth (optional) |

---

## 🔑 API Endpoints

| Method | Endpoint | Description |
|--------|---------|-------------|
| GET | `/health` | Health check |
| POST | `/api/analyze-prescription` | Analyze prescription with Gemini |
| GET | `/api/medicines` | Get all medicines |
| GET | `/api/medicines/{id}` | Get medicine by ID |
| GET | `/api/ayurveda` | Get all Ayurveda concepts |
| GET | `/api/ayurveda/{id}` | Get concept by ID |
| POST | `/api/explanation` | Get AI explanation at specified level |

---

## 👥 Team

| Name | Role |
|------|------|
| S. Rajdeep Singh | Back-End Dev |
| N. Sujith | Back-End Dev |
| N. Navadeep | Front-End Dev |
| B. Vijaya Raju | Front-End Dev |
| V. Shashikiran | Documentation & Presentation |

---

## 🎓 Project Purpose

This is an educational college project demonstrating:

- Multimodal AI integration (Google Gemini Vision)
- Full-stack web development (React + FastAPI)
- Healthcare information presentation best practices
- Responsible AI use with proper disclaimers
- Comparison of modern medicine and Ayurvedic knowledge systems

---

## ⚖️ Disclaimer

This application is built for **educational purposes only**. It uses AI to help users understand medical information but:

- Does **not** diagnose any condition
- Does **not** prescribe medication
- Does **not** replace professional medical or Ayurvedic consultation
- Does **not** advise changing or stopping medication

Always consult a qualified healthcare professional for medical decisions.

---

© 2026 Doctors × Vaidyas Services | Educational Use Only
