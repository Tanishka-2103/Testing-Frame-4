from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from backend.database import SessionLocal, engine
from backend.models import TestingStandards, Base

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Testing Standards Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class StandardsPayload(BaseModel):
    regions: list[str]
    recommended: list[str]
    preferred: list[str]

@app.post("/save-testing-standards")
def save_testing_standards(payload: StandardsPayload):
    db = SessionLocal()

    record = TestingStandards(
        regions=", ".join(payload.regions),
        recommended_standards=", ".join(payload.recommended),
        preferred_standards=", ".join(payload.preferred),
    )

    db.add(record)
    db.commit()
    db.refresh(record)
    db.close()

    return {"status": "success", "id": record.id}

@app.get("/")
def root():
    return {"message": "Backend is running"}
