from app.services.model_container import ModelContainer
import torch



def generate_samples(prompt, temperature, top_k, top_p, num_outputs,max_new_token=120):
    tokenizer = ModelContainer.decoder_tokenizer
    model = ModelContainer.decoder_model

    if tokenizer is None or model is None:
        raise RuntimeError("Decoder model not loaded")

    inputs = tokenizer(prompt, return_tensors="pt")

    outputs = model.generate(
        **inputs,
        do_sample=True,
        temperature=temperature,
        top_k=top_k if top_k > 0 else None,
        top_p=top_p,
        max_new_tokens=max_new_token,
        num_return_sequences=num_outputs,
        return_dict_in_generate=True,
        output_scores=True
    )

    sequences = outputs.sequences
    scores = outputs.scores 

    all_outputs = []
    all_tokens = []
    all_probs = []

    for seq_idx, seq in enumerate(sequences):
        generated_tokens = seq[len(inputs['input_ids'][0]):] 
        token_strs = tokenizer.convert_ids_to_tokens(generated_tokens)
        token_probs = []

        for i, token_id in enumerate(generated_tokens):
            if i < len(scores):
                logits = scores[i][seq_idx]
                prob = torch.softmax(logits, dim=-1)[token_id].item()
                token_probs.append(prob)

        all_outputs.append(tokenizer.decode(seq, skip_special_tokens=True))
        all_tokens.append(token_strs)
        all_probs.append(token_probs)

    return {
        "outputs": all_outputs,
        "tokens": all_tokens,
        "token_probs": all_probs
    }
