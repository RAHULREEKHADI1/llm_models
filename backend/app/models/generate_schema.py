from pydantic import BaseModel
from typing import Literal


class GenerateRequest(BaseModel):
    input_text: str
    task_type: Literal["summarize", "translate", "qa"]


class GenerateResponse(BaseModel):
    model_type: str
    output_text: str
