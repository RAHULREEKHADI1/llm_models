from fastapi import APIRouter,HTTPException
from app.models.evaluation_schema import (
    EvaluationRequest,
    EvaluationResponse
)
from app.services.evaluation_metrics import (
    compute_bleu,
    compute_rouge_l,
    compute_semantic_similarity,
    compute_repetition_score
)

router = APIRouter(prefix="/evaluate", tags=["LLM Evaluation"])

@router.post("", response_model=EvaluationResponse)
def evaluate_text(data: EvaluationRequest):
    try:
        return EvaluationResponse(
            bleu=compute_bleu(data.reference_text, data.generated_text),
            rouge_l=compute_rouge_l(data.reference_text, data.generated_text),
            semantic_similarity=compute_semantic_similarity(
                data.reference_text, data.generated_text
            ),
            repetition_score=compute_repetition_score(data.generated_text)
        )
    except Exception as e:
        print("Evaluation failed:", e)
        raise HTTPException(status_code=500, detail=str(e))
