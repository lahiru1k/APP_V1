from fastapi import FastAPI

app = FastAPI(title="Serendip Match API", version="0.1.0")


@app.get("/")
def root():
    return {
        "message": "Welcome to Serendip Match API",
        "status": "ok",
    }


@app.get("/health")
def health():
    return {"status": "healthy"}


@app.get("/matches/sample")
def sample_match():
    return {
        "match_id": "demo-001",
        "compatibility_score": 0.78,
        "summary": "Based on shared interests and location.",
    }
