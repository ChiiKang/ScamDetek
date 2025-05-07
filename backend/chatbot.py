from sentence_transformers import SentenceTransformer
from pinecone import Pinecone
import google.generativeai as genai
from config import PINECONE_API_KEY, PINECONE_ENV, PINECONE_INDEX_NAME, GEMINI_API_KEY, EMBEDDING_MODEL_NAME

model = SentenceTransformer(EMBEDDING_MODEL_NAME)
pc = Pinecone(api_key=PINECONE_API_KEY)
index = pc.Index(PINECONE_INDEX_NAME)

genai.configure(api_key=GEMINI_API_KEY)
gemini = genai.GenerativeModel("gemini-2.0-flash-lite")

def ask_bot(query, top_k=3):
    query_vector = model.encode(query).tolist()
    results = index.query(vector=query_vector, top_k=top_k, include_metadata=True)

    context = "\n\n".join([
        f"{match['metadata']['title']}:{match['metadata']['content']}"
        for match in results['matches']
    ])

    prompt = f"""You are a helpful scam detection assistant.

Use the following background information:
{context}

User question:
{query}

Answer:"""

    response = gemini.generate_content(prompt)
    return response.text