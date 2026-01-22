from fastapi import APIRouter, HTTPException
from sqlalchemy.orm import Session
from app.database.db import SessionLocal
from app.database.models_context import ContextLog
from app.models.context_schema import ContextRequest, ContextResponse
from app.services.context_utils import process_context, CONTEXT_LIMITS
import traceback

router = APIRouter(prefix="/context", tags=["Context Window"])

@router.post("/analyze", response_model=ContextResponse)
def analyze_context(data: ContextRequest):
    print("API HIT:", data.model_type) 

    db: Session = SessionLocal()
    try:
        try:
            result = process_context(data.input_text, data.model_type)
        except ValueError:
            raise HTTPException(status_code=400, detail=f"Invalid model_type: {data.model_type}")
        except Exception as e:
            print("Error in process_context:", e)
            traceback.print_exc()
            raise HTTPException(status_code=500, detail="Failed to process context")

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
        except Exception as e:
            db.rollback()
            print("Error saving ContextLog:", e)
            traceback.print_exc()

        return ContextResponse(
            model_type=data.model_type,
            max_context_tokens=CONTEXT_LIMITS.get(data.model_type, 0),
            total_input_tokens=result["total_input_tokens"],
            used_tokens=result["used_tokens"],
            dropped_tokens=result["dropped_tokens"],
            used_text=result["used_text"],
            dropped_text=result["dropped_text"],
        )
    finally:
        db.close()
