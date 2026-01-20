from pydantic import BaseModel


class ContextRequest(BaseModel):
    input_text: str
    model_type: str 

class ContextResponse(BaseModel):
    model_type: str
    max_context_tokens: int
    total_input_tokens: int
    used_tokens: int
    dropped_tokens: int
    used_text: str
    dropped_text: str
