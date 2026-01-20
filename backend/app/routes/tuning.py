from fastapi import APIRouter
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

router = APIRouter(prefix="/tuning", tags=["Model Tuning"])


@router.post("/prompt", response_model=TuningResponse)
def prompt_tuning_api(data: PromptTuningRequest):
    final_prompt, output = prompt_tuning(
        data.template,
        data.input_text
    )
    return {
        "final_prompt": final_prompt,
        "output": output
    }


@router.post("/lora", response_model=TuningResponse)
def lora_api(data: SimplePromptRequest):
    final_prompt, output = lora_tuning(data.input_text)
    return {
        "final_prompt": final_prompt,
        "output": output
    }


@router.post("/fine_tuned", response_model=TuningResponse)
def fine_tuned_api(data: SimplePromptRequest):
    final_prompt, output = fine_tuned_behavior(data.input_text)
    return {
        "final_prompt": final_prompt,
        "output": output
    }
