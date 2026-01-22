from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from transformers import (
    AutoTokenizer,
    AutoModelForCausalLM,
    AutoModelForSeq2SeqLM
)
from app.services.model_container import ModelContainer

from app.routes.architectures import router as architecture_router
from app.routes.generate import router as generate_router
from app.routes.context import router as context_router
from app.routes.sampling import router as sampling_router
from app.routes.evaluation import router as evaluation_router
from app.routes.rlhf import router as rlhf_router
from app.routes.comparison import router as comparison_router
from app.routes import tuning
from app.routes.tuning import router as tuning_router
from app.core.config import get_settings

settings = get_settings()
app = FastAPI(title="LLM Architecture Lab")

origins = settings.FRONTEND_ORIGINS.split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def load_models():
    print(" Loading models...")

    ModelContainer.decoder_tokenizer = AutoTokenizer.from_pretrained(settings.DECODER_MODEL_NAME)
    ModelContainer.decoder_model = AutoModelForCausalLM.from_pretrained(settings.DECODER_MODEL_NAME)

    ModelContainer.enc_dec_tokenizer = AutoTokenizer.from_pretrained(settings.ENC_DEC_MODEL_NAME)
    ModelContainer.enc_dec_model = AutoModelForSeq2SeqLM.from_pretrained(settings.ENC_DEC_MODEL_NAME)

    print("Models loaded")

app.include_router(rlhf_router)
app.include_router(architecture_router)
app.include_router(generate_router)
app.include_router(context_router)
app.include_router(sampling_router)
app.include_router(evaluation_router)
app.include_router(comparison_router)
app.include_router(tuning.router)
