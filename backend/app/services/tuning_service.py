from app.services.model_container import ModelContainer


def generate_text(prompt: str, model, tokenizer, temperature=0.7):
    inputs = tokenizer(prompt, return_tensors="pt")
    outputs = model.generate(
        **inputs,
        max_new_tokens=60,
        do_sample=True,
        temperature=temperature,
        top_p=0.9,
        repetition_penalty=1.2,
        no_repeat_ngram_size=3,
        eos_token_id=tokenizer.eos_token_id
    )
    return tokenizer.decode(outputs[0], skip_special_tokens=True)


def prompt_tuning(template: str, input_text: str):
    tokenizer = ModelContainer.decoder_tokenizer
    model = ModelContainer.decoder_model

    final_prompt = template.replace("{input}", input_text)
    output = generate_text(final_prompt, model, tokenizer, temperature=0.7)
    return final_prompt, output


def lora_tuning(input_text: str):
    tokenizer = ModelContainer.decoder_tokenizer
    model = ModelContainer.decoder_lora_model

    if model is None:
        raise RuntimeError("LoRA model not loaded")

    output = generate_text(
        prompt=input_text,
        model=model,
        tokenizer=tokenizer,
        temperature=0.6
    )

    return input_text, output


def fine_tuned_behavior(input_text: str):
    tokenizer = ModelContainer.decoder_tokenizer
    model = ModelContainer.decoder_model  

    output = generate_text(prompt=input_text,model=model,tokenizer=tokenizer,temperature=0.3)
    return input_text, output
