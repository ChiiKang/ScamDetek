from utils import load_jsonl, format_context
from embedder import embed_text
from indexer import init_pinecone, upsert_documents
from retriever import retrieve_context
from generator import generate_answer

def load_and_index(path, category):
    index = init_pinecone()
    docs = load_jsonl(path)
    batch = []
    for doc in docs:
        embedding = embed_text(doc["content"])
        batch.append({
            "id": doc["id"],
            "values": embedding,
            "metadata": {
                "title": doc["title"],
                "content": doc["content"],
                "category": category
            }
        })
    upsert_documents(index, batch)

def ask(query):
    matches = retrieve_context(query)
    context = format_context(matches)
    return generate_answer(context, query)

if __name__ == "__main__":
    # Indexing (uncomment once to index)
    # load_and_index("Scam Types.jsonl", "Scam Types")
    # load_and_index("User Safety.jsonl", "User Safety")
    # ... add other modules as needed

    # Ask a question
    response = ask("How do I identify and report smishing attacks?")
    print(response)
