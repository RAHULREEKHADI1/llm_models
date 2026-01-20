from transformers import (
    AutoTokenizer,
    AutoModelForCausalLM,
    AutoModelForSeq2SeqLM
)

# Decoder-only
DECODER_MODEL_NAME = "distilgpt2"  # lightweight alternative
decoder_tokenizer = AutoTokenizer.from_pretrained(DECODER_MODEL_NAME)
decoder_model = AutoModelForCausalLM.from_pretrained(DECODER_MODEL_NAME)

# Encoder-Decoder
ENC_DEC_MODEL_NAME = "google/flan-t5-base"
enc_dec_tokenizer = AutoTokenizer.from_pretrained(ENC_DEC_MODEL_NAME)
enc_dec_model = AutoModelForSeq2SeqLM.from_pretrained(ENC_DEC_MODEL_NAME)
