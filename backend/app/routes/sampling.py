from fastapi import APIRouter
from app.models.sampling_schema import SamplingRequest, SamplingResponse
from app.services.sampling_model import generate_samples

router = APIRouter(prefix="/sampling", tags=["Sampling Lab"])


@router.post("/generate", response_model=SamplingResponse)
def sampling_generate(data: SamplingRequest):
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
