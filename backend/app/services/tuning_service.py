from transformers import AutoTokenizer, AutoModelForCausalLM

MODEL_NAME = "distilgpt2"

tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForCausalLM.from_pretrained(MODEL_NAME)


def generate_text(prompt: str, temperature=0.7):
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
    final_prompt = template.replace("{input}", input_text)
    output = generate_text(final_prompt, temperature=0.7)
    return final_prompt, output


def lora_tuning(input_text: str):
    lora_bias = (
        "Answer concisely, focus on efficiency, avoid unnecessary details.\n"
    )
    final_prompt = lora_bias + input_text
    output = generate_text(final_prompt, temperature=0.6)
    return final_prompt, output


def fine_tuned_behavior(input_text: str):
    fine_tuned_instruction = (
        "You are a highly specialized technical model trained only on this domain. "
        "Answer formally and precisely.\n"
    )
    final_prompt = fine_tuned_instruction + input_text
    output = generate_text(final_prompt, temperature=0.3)
    return final_prompt, output
