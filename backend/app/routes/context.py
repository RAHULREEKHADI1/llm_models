from fastapi import APIRouter, HTTPException
from sqlalchemy.orm import Session
from app.database.db import SessionLocal
from app.database.models_context import ContextLog
from app.models.context_schema import ContextRequest, ContextResponse
from app.services.context_utils import process_context, CONTEXT_LIMITS

router = APIRouter(prefix="/context", tags=["Context Window"])

@router.post("/analyze", response_model=ContextResponse)
def analyze_context(data: ContextRequest):
    print("API HIT:", data.model_type) 
    try:
        result = process_context(data.input_text, data.model_type)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid model_type")

    db: Session = SessionLocal()
    try:
        log = ContextLog(
            model_type=data.model_type,
            total_input_tokens=result["total_input_tokens"],
            used_tokens=result["used_tokens"],
            dropped_tokens=result["dropped_tokens"],
            used_text=result["used_text"],
            dropped_text=result["dropped_text"],
        )
        db.add(log)
        db.commit()
    finally:
        db.close()

    return ContextResponse(
        model_type=data.model_type,
        max_context_tokens=CONTEXT_LIMITS[data.model_type],
        total_input_tokens=result["total_input_tokens"],
        used_tokens=result["used_tokens"],
        dropped_tokens=result["dropped_tokens"],
        used_text=result["used_text"],
        dropped_text=result["dropped_text"],
    )
