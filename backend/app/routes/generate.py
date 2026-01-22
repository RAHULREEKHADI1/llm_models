from fastapi import APIRouter, HTTPException
from app.models.generate_schema import GenerateRequest, GenerateResponse
from app.services.model_container import ModelContainer
import torch
import traceback

router = APIRouter(prefix="/generate", tags=["Generation"])

def build_prompt(task: str, text: str) -> str:
    if task == "summarize":
        return f"Summarize the following text:\n{text}"
    if task == "translate":
        return f"Translate to English:\n{text}"
    if task == "qa":
        return f"Answer the question:\n{text}"
    return text

@router.post("/decoder", response_model=GenerateResponse)
def generate_decoder(data: GenerateRequest):
    tokenizer = ModelContainer.decoder_tokenizer
    model = ModelContainer.decoder_model

    if tokenizer is None or model is None:
        raise HTTPException(status_code=503, detail="Decoder model not loaded")

    if not data.input_text:
        raise HTTPException(status_code=400, detail="Input text cannot be empty")

    try:
        prompt = build_prompt(data.task_type, data.input_text)
        inputs = tokenizer(prompt, return_tensors="pt")
        outputs = model.generate(**inputs, max_new_tokens=150)
        result = tokenizer.decode(outputs[0], skip_special_tokens=True)
        return GenerateResponse(model_type="Decoder-only", output_text=result)
    except Exception:
        traceback.print_exc()
        raise HTTPException(status_code=422, detail="Failed to generate output")

@router.post("/encoder_decoder", response_model=GenerateResponse)
def generate_encoder_decoder(data: GenerateRequest):
    tokenizer = ModelContainer.enc_dec_tokenizer
    model = ModelContainer.enc_dec_model

    if tokenizer is None or model is None:
        raise HTTPException(status_code=503, detail="Encoder-Decoder model not loaded")

    if not data.input_text:
        raise HTTPException(status_code=400, detail="Input text cannot be empty")

    try:
        prompt = build_prompt(data.task_type, data.input_text)
        inputs = tokenizer(prompt, return_tensors="pt")
        outputs = model.generate(**inputs, max_new_tokens=150)
        result = tokenizer.decode(outputs[0], skip_special_tokens=True)
        return GenerateResponse(model_type="Encoder-Decoder", output_text=result)
    except Exception:
        traceback.print_exc()
        raise HTTPException(status_code=422, detail="Failed to generate output")
