from fastapi import APIRouter
from app.models.generate_schema import GenerateRequest, GenerateResponse
from app.services.model_loader import (
    decoder_model,
    decoder_tokenizer,
    enc_dec_model,
    enc_dec_tokenizer
)
import torch

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
    prompt = build_prompt(data.task_type, data.input_text)

    inputs = decoder_tokenizer(prompt, return_tensors="pt")
    outputs = decoder_model.generate(
        **inputs,
        max_new_tokens=150
    )

    result = decoder_tokenizer.decode(outputs[0], skip_special_tokens=True)

    return GenerateResponse(
        model_type="Decoder-only",
        output_text=result
    )


@router.post("/encoder_decoder", response_model=GenerateResponse)
def generate_encoder_decoder(data: GenerateRequest):
    prompt = build_prompt(data.task_type, data.input_text)

    inputs = enc_dec_tokenizer(prompt, return_tensors="pt")
    outputs = enc_dec_model.generate(
        **inputs,
        max_new_tokens=150
    )

    result = enc_dec_tokenizer.decode(outputs[0], skip_special_tokens=True)

    return GenerateResponse(
        model_type="Encoder-Decoder",
        output_text=result
    )
