from sentence_transformers import SentenceTransformer
from config import EMBEDDING_MODEL_NAME

embedding_model = SentenceTransformer(EMBEDDING_MODEL_NAME)

def embed_text(text: str):
    return embedding_model.encode(text).tolist()