from fastapi import APIRouter
from app.models.rlhf_schema import (
    GenerateRLHFRequest,
    RankRequest,
    GenerateRLHFResponse
)
from app.services.rlhf_model import generate_candidates, get_preferred_phrases
from app.services.rlhf_reward import compute_reward
from app.database.db import SessionLocal
from app.database.models_rlhf import PreferenceLog

router = APIRouter(prefix="/rlhf", tags=["RLHF Simulation"])


@router.post("/generate", response_model=GenerateRLHFResponse)
def generate_rlhf(data: GenerateRLHFRequest):
    responses = generate_candidates(data.prompt)
    return GenerateRLHFResponse(prompt=data.prompt, responses=responses)


@router.post("/rank")
def rank_responses(data: RankRequest):
    db = SessionLocal()

    for response, rank in zip(data.responses, data.ranking):
        db.add(
            PreferenceLog(
                prompt=data.prompt,
                response=response,
                rank=rank,
                reward=compute_reward(rank)
            )
        )

    db.commit()
    db.close()

    return {"status": "preferences saved"}


@router.post("/generate_biased")
def generate_biased(data: GenerateRLHFRequest):
    db = SessionLocal()
    preferred = get_preferred_phrases(db, data.prompt)
    db.close()

    bias = " ".join(preferred[-2:]) if preferred else ""
    biased_prompt = f"{data.prompt}\n{bias}" if bias else data.prompt

    response = generate_candidates(biased_prompt, n=1)[0]

    return {
        "prompt": data.prompt,
        "biased_response": response
    }
