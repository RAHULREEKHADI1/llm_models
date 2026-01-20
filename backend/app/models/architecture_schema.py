from pydantic import BaseModel
from typing import List


class ArchitectureResponse(BaseModel):
    model_name: str
    architecture_type: str
    generation_mechanism: str
    pros: List[str]
    cons: List[str]
    context_window: str
    primary_use_case: str
