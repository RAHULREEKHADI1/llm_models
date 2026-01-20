from transformers import AutoTokenizer

SHORT_MODEL = "distilgpt2"
LONG_MODEL = "google/long-t5-tglobal-base"

tokenizers = {
    "short": AutoTokenizer.from_pretrained(SHORT_MODEL),
    "long": AutoTokenizer.from_pretrained(LONG_MODEL),
}

CONTEXT_LIMITS = {
    "short": 1024,
    "long": 16384,
}

def process_context(text: str, model_type: str):
    if model_type not in tokenizers:
        raise ValueError("Invalid model_type")

    tokenizer = tokenizers[model_type]
    max_tokens = CONTEXT_LIMITS[model_type]

    tokens = tokenizer.encode(text)
    total_tokens = len(tokens)

    if total_tokens <= max_tokens:
        return {
            "total_input_tokens": total_tokens,
            "used_tokens": total_tokens,
            "dropped_tokens": 0,
            "used_text": text,
            "dropped_text": "",
        }

    used_token_ids = tokens[-max_tokens:]
    dropped_token_ids = tokens[:-max_tokens]

    return {
        "total_input_tokens": total_tokens,
        "used_tokens": len(used_token_ids),
        "dropped_tokens": len(dropped_token_ids),
        "used_text": tokenizer.decode(used_token_ids),
        "dropped_text": tokenizer.decode(dropped_token_ids),
    }
