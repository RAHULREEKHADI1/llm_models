from fastapi import APIRouter, HTTPException
from app.models.sampling_schema import SamplingRequest, SamplingResponse
from app.services.sampling_model import generate_samples
import traceback

router = APIRouter(prefix="/sampling", tags=["Sampling Lab"])

@router.post("/generate", response_model=SamplingResponse)
def sampling_generate(data: SamplingRequest):
    if not data.prompt:
        raise HTTPException(status_code=400, detail="Prompt cannot be empty")
    try:
        result = generate_samples(
            prompt=data.prompt,
            temperature=data.temperature,
            top_k=data.top_k,
            top_p=data.top_p,
            num_outputs=data.num_outputs
        )

        return SamplingResponse(
            prompt=data.prompt,
            temperature=data.temperature,
            top_k=data.top_k,
            top_p=data.top_p,
            outputs=result["outputs"],
            tokens=result["tokens"],
            token_probs=result["token_probs"]
        )
    except ValueError as ve:
        raise HTTPException(status_code=422, detail=f"Invalid input: {ve}")
    except RuntimeError as re:
        raise HTTPException(status_code=503, detail=f"Model not loaded: {re}")
    except Exception:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail="Failed to generate samples")
