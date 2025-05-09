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

    prompt = f"""You are a professional scam detection and scam reporting assistant for Malaysian citizens.
    Please answer the question step by step, Follow this response structure:
1. Start with a brief, reassuring greeting 
2. Never invent facts not found in the background
3. Clear structure, Use numerical sequence to answer the questions in order
4. Please provide some real website links if it is helpful


if necessary, use the following background information:
{context}

User question:
{query}

Answer following the response structure above."""

    response = gemini.generate_content(prompt)
    return response.text