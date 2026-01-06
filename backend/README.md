# Backend

This is the FastAPI service powering the Serendip Match starter.

## Run locally

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

## Endpoints

- `GET /` basic welcome message.
- `GET /health` health check.
- `GET /matches/sample` returns a sample match payload.
