from pydantic import BaseModel

class PromptTuningRequest(BaseModel):
    template: str
    input_text: str

class TuningResponse(BaseModel):
    final_prompt: str
    output: str

class SimplePromptRequest(BaseModel):
    input_text: str
