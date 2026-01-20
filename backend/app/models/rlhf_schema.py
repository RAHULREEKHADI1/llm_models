from pydantic import BaseModel
from typing import List

class GenerateRLHFRequest(BaseModel):
    prompt: str

class GenerateRLHFResponse(BaseModel):
    prompt: str
    responses: List[str]

class RankRequest(BaseModel):
    prompt: str
    responses: List[str]
    ranking: List[int]
