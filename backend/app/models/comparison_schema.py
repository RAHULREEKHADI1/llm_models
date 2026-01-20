from pydantic import BaseModel
from typing import List

class ModelComparison(BaseModel):
    model_type: str
    cost: str
    latency: str
    control: str
    privacy: str
    customization: str
    best_for: List[str]
    risks: List[str]
