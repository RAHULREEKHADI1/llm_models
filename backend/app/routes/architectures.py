from fastapi import APIRouter
from app.models.architecture_schema import ArchitectureResponse

router = APIRouter(prefix="/architectures", tags=["LLM Architectures"])

ARCHITECTURES_DATA = [
    ArchitectureResponse(
        model_name="Mistral",
        architecture_type="Decoder-only Transformer",
        generation_mechanism="Predicts the next token autoregressively using previous tokens.",
        pros=[
            "Strong text generation",
            "Efficient and fast",
            "Good reasoning for its size"
        ],
        cons=[
            "Less structured output",
            "Limited understanding of full input context"
        ],
        context_window="8k tokens",
        primary_use_case="Chat, reasoning, text generation"
    ),
    ArchitectureResponse(
        model_name="LLaMA-2",
        architecture_type="Decoder-only Transformer",
        generation_mechanism="Autoregressive next-token prediction trained on large text corpora.",
        pros=[
            "Open-source",
            "Highly customizable",
            "Good performance with fine-tuning"
        ],
        cons=[
            "Smaller context window",
            "Needs tuning for specific tasks"
        ],
        context_window="4k–32k tokens",
        primary_use_case="Chatbots, assistants, research"
    ),
    ArchitectureResponse(
        model_name="FLAN-T5",
        architecture_type="Encoder-Decoder Transformer",
        generation_mechanism="Encodes the entire input first, then decodes the output step-by-step.",
        pros=[
            "Excellent for translation and summarization",
            "Strong instruction following"
        ],
        cons=[
            "Slower than decoder-only models",
            "Weaker creative generation"
        ],
        context_window="512–2048 tokens",
        primary_use_case="Summarization, translation, QA"
    ),
    ArchitectureResponse(
        model_name="Long-T5",
        architecture_type="Encoder-Decoder Transformer (Long Context)",
        generation_mechanism="Encodes long sequences using sparse attention, then decodes output.",
        pros=[
            "Handles very long documents",
            "Better memory of earlier context"
        ],
        cons=[
            "Higher compute cost",
            "Slower inference"
        ],
        context_window="4k–16k+ tokens",
        primary_use_case="Long document summarization"
    ),
    ArchitectureResponse(
        model_name="all-MiniLM",
        architecture_type="Embedding Model (Encoder-only)",
        generation_mechanism="Encodes text into dense numerical vectors (no text generation).",
        pros=[
            "Fast and lightweight",
            "Great for semantic similarity"
        ],
        cons=[
            "Cannot generate text",
            "Limited to representation learning"
        ],
        context_window="256–512 tokens",
        primary_use_case="Search, similarity, clustering"
    )
]


@router.get("/", response_model=list[ArchitectureResponse])
def get_architectures():
    return ARCHITECTURES_DATA
