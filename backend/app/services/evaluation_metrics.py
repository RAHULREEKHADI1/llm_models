import nltk
import numpy as np
from nltk.translate.bleu_score import sentence_bleu, SmoothingFunction
from rouge_score import rouge_scorer
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

embedding_model = SentenceTransformer("all-MiniLM-L6-v2")

def compute_bleu(reference: str, generated: str) -> float:
    reference_tokens = [nltk.word_tokenize(reference.lower())]
    generated_tokens = nltk.word_tokenize(generated.lower())
    smoothie = SmoothingFunction().method4
    return sentence_bleu(reference_tokens, generated_tokens, smoothing_function=smoothie)


def compute_rouge_l(reference: str, generated: str) -> float:
    scorer = rouge_scorer.RougeScorer(["rougeL"], use_stemmer=True)
    score = scorer.score(reference, generated)
    return score["rougeL"].fmeasure


def compute_semantic_similarity(reference: str, generated: str) -> float:
    embeddings = embedding_model.encode([reference, generated])
    sim = cosine_similarity([embeddings[0]], [embeddings[1]])[0][0]
    return float(sim)


def compute_repetition_score(text: str) -> float:
    tokens = nltk.word_tokenize(text.lower())
    if not tokens:
        return 0.0
    unique_tokens = set(tokens)
    repetition = 1 - (len(unique_tokens) / len(tokens))
    return round(repetition, 3)
