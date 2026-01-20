from transformers import AutoTokenizer, AutoModelForCausalLM
from sqlalchemy.orm import Session
from app.database.models_rlhf import PreferenceLog

MODEL_NAME = "distilgpt2"

tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForCausalLM.from_pretrained(MODEL_NAME)

def generate_candidates(prompt: str, n: int = 3):
    inputs = tokenizer(prompt, return_tensors="pt")
    input_len = inputs["input_ids"].shape[1]

    outputs = model.generate(
        **inputs,
        do_sample=True,
        temperature=1.0,
        top_p=0.9,
        num_return_sequences=n,
        max_new_tokens=80,
        repetition_penalty=1.1
    )

    return [
        tokenizer.decode(o[input_len:], skip_special_tokens=True).strip()
        for o in outputs
    ]

def get_preferred_phrases(db: Session, prompt: str):
    rows = db.query(PreferenceLog).filter(
        PreferenceLog.prompt == prompt,
        PreferenceLog.reward > 0
    ).all()

    return [r.response for r in rows]
