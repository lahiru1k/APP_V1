# Serendip Match

Compatibility-first connections for Sri Lanka. This repository contains a minimal starter kit with a FastAPI backend and a lightweight static frontend to help you prototype matchmaking ideas, onboarding, and conversation flows.

## What this starter includes

- **Backend API (FastAPI)** with sample endpoints for health checks and a demo match response.
- **Frontend landing page** that explains the concept and previews a sample match.
- **Clean repo structure** to keep backend and frontend concerns separate.

## Repository structure

```
.
├── backend/          # FastAPI app
│   ├── app/
│   │   └── main.py
│   ├── .env.example
│   └── requirements.txt
├── frontend/         # Static landing page
│   ├── app.js
│   ├── index.html
│   └── styles.css
└── README.md
```

## Quick start

### 1) Backend (API)

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Once running, try:

- `http://localhost:8000/`
- `http://localhost:8000/health`
- `http://localhost:8000/matches/sample`

### 2) Frontend (Landing page)

```bash
cd frontend
python -m http.server 8001
```

Open `http://localhost:8001` in your browser. The demo match preview will appear once the backend is running.

## Next steps

- Build the **profile questionnaire** (interests, location, values).
- Add **compatibility logic** (simple weighted scoring to start).
- Implement **chat gating** (unlock photos after a time window or message count).
- Add authentication and user profile storage.

## Notes

This starter is intentionally simple so you can expand it at your own pace. When you’re ready, you can replace the static frontend with React or a mobile app, and evolve the backend into a full API with a database.
