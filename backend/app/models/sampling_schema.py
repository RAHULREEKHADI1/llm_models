from pydantic import BaseModel, Field
from typing import List


class SamplingRequest(BaseModel):
    prompt: str
    temperature: float = Field(ge=0.1, le=2.0)
    top_k: int = Field(ge=0, le=100)
    top_p: float = Field(ge=0.1, le=1.0)
    num_outputs: int = Field(ge=1, le=5)


class SamplingResponse(BaseModel):
    prompt: str
    temperature: float
    top_k: int
    top_p: float
    outputs: List[str]
    tokens: List[List[str]]       
    token_probs: List[List[float]] 
