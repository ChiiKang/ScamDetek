import pinecone
from config import PINECONE_API_KEY, PINECONE_ENV, PINECONE_INDEX

def init_pinecone():
    pinecone.init(api_key=PINECONE_API_KEY, environment=PINECONE_ENV)
    if PINECONE_INDEX not in pinecone.list_indexes():
        pinecone.create_index(PINECONE_INDEX, dimension=384)
    return pinecone.Index(PINECONE_INDEX)

def upsert_documents(index, documents):
    index.upsert(documents)