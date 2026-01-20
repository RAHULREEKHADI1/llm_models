from pydantic import BaseModel

class EvaluationRequest(BaseModel):
    reference_text: str
    generated_text: str


class EvaluationResponse(BaseModel):
    bleu: float
    rouge_l: float
    semantic_similarity: float
    repetition_score: float
