from fastapi import APIRouter
from app.services.comparison_engine import get_model_comparison
from app.models.comparison_schema import ModelComparison
from typing import List

router = APIRouter(prefix="/comparison", tags=["Model Comparison"])

@router.get("/models", response_model=List[ModelComparison])
def compare_models():
    return get_model_comparison()
