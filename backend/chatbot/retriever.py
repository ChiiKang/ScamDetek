from embedder import embed_text
from indexer import init_pinecone
from config import PINECONE_INDEX

def retrieve_context(query: str, top_k: int = 5):
    index = init_pinecone()
    query_vector = embed_text(query)
    results = index.query(vector=query_vector, top_k=top_k, include_metadata=True)
    return results["matches"]