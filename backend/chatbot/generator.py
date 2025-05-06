import google.generativeai as genai
from config import GEMINI_API_KEY

genai.configure(api_key=GEMINI_API_KEY)
gemini = genai.GenerativeModel("gemini-pro")

def generate_answer(context: str, user_query: str):
    prompt = f"""
You are a helpful assistant for scam detection.

Background:
{context}

User question:
{user_query}

Answer:
"""
    response = gemini.generate_content(prompt)
    return response.text
