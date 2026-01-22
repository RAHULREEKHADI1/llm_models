from fastapi import APIRouter, HTTPException
from app.models.rlhf_schema import (
    GenerateRLHFRequest,
    RankRequest,
    GenerateRLHFResponse
)
from app.services.rlhf_model import generate_candidates, get_preferred_phrases
from app.services.rlhf_reward import compute_reward
from app.database.db import SessionLocal
from app.database.models_rlhf import PreferenceLog
import traceback

router = APIRouter(prefix="/rlhf", tags=["RLHF Simulation"])


@router.post("/generate", response_model=GenerateRLHFResponse)
def generate_rlhf(data: GenerateRLHFRequest):
    try:
        responses = generate_candidates(data.prompt)
        return GenerateRLHFResponse(prompt=data.prompt, responses=responses)
    except Exception as e:
        print("Error in generate_rlhf:", e)
        traceback.print_exc()
        raise HTTPException(status_code=422, detail="Failed to generate responses")


@router.post("/rank")
def rank_responses(data: RankRequest):
    db = SessionLocal()
    try:
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
        return {"status": "preferences saved"}
    except Exception as e:
        db.rollback()
        print("Error in rank_responses:", e)
        traceback.print_exc()
        raise HTTPException(status_code=422, detail="Failed to save rankings")
    finally:
        db.close()


@router.post("/generate_biased")
def generate_biased(data: GenerateRLHFRequest):
    db = SessionLocal()
    try:
        preferred = get_preferred_phrases(db, data.prompt)
    except Exception as e:
        print("Error fetching preferred phrases:", e)
        traceback.print_exc()
        raise HTTPException(status_code=500, detail="Failed to fetch preferred phrases")
    finally:
        db.close()

    try:
        bias = " ".join(preferred[-2:]) if preferred else ""
        biased_prompt = f"{data.prompt}\n{bias}" if bias else data.prompt
        response = generate_candidates(biased_prompt, n=1)[0]
        return {"prompt": data.prompt, "biased_response": response}
    except Exception as e:
        print("Error generating biased response:", e)
        traceback.print_exc()
        raise HTTPException(status_code=422, detail="Failed to generate biased response")
