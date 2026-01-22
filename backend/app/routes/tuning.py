from fastapi import APIRouter, HTTPException
from app.models.tuning_schema import (
    PromptTuningRequest,
    SimplePromptRequest,
    TuningResponse
)
from app.services.tuning_service import (
    prompt_tuning,
    lora_tuning,
    fine_tuned_behavior
)
import traceback

router = APIRouter(prefix="/tuning", tags=["Model Tuning"])

@router.post("/prompt", response_model=TuningResponse)
def prompt_tuning_api(data: PromptTuningRequest):
    if not data.template or not data.input_text:
        raise HTTPException(status_code=400, detail="Template and input_text cannot be empty")
    try:
        final_prompt, output = prompt_tuning(data.template, data.input_text)
        return {"final_prompt": final_prompt, "output": output}
    except Exception:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail="Prompt tuning failed")

@router.post("/lora", response_model=TuningResponse)
def lora_api(data: SimplePromptRequest):
    if not data.input_text:
        raise HTTPException(status_code=400, detail="Input text cannot be empty")
    try:
        final_prompt, output = lora_tuning(data.input_text)
        return {"final_prompt": final_prompt, "output": output}
    except RuntimeError as re:
        raise HTTPException(status_code=503, detail=f"LoRA model not loaded: {re}")
    except Exception:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail="LoRA tuning failed")

@router.post("/fine_tuned", response_model=TuningResponse)
def fine_tuned_api(data: SimplePromptRequest):
    if not data.input_text:
        raise HTTPException(status_code=400, detail="Input text cannot be empty")
    try:
        final_prompt, output = fine_tuned_behavior(data.input_text)
        return {"final_prompt": final_prompt, "output": output}
    except RuntimeError as re:
        raise HTTPException(status_code=503, detail=f"Fine-tuned model not loaded: {re}")
    except Exception:
        traceback.print_exc()
        raise HTTPException(status_code=422, detail="Fine-tuned behavior generation failed")
