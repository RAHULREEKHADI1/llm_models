from app.services.model_container import ModelContainer

def count_trainable_params(model):
    trainable = sum(p.numel() for p in model.parameters() if p.requires_grad)
    total = sum(p.numel() for p in model.parameters())
    return trainable, total


def lora_demo_stats():
    model = ModelContainer.decoder_lora_model

    if model is None:
        raise RuntimeError("LoRA model not initialized")

    trainable, total = count_trainable_params(model)

    return {
        "trainable_params": trainable,
        "total_params": total,
        "trainable_percentage": round(100 * trainable / total, 4)
    }
