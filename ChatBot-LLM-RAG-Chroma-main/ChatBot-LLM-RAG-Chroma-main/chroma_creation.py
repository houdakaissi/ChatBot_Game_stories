from langchain.document_loaders import DirectoryLoader
from langchain.embeddings import SentenceTransformerEmbeddings
from langchain.vectorstores import Chroma
from langchain.text_splitter import RecursiveCharacterTextSplitter

# Constants
DIRECTORY = "data/books"
PERSIST_DIRECTORY = "chroma"
MODEL_NAME = "all-MiniLM-L6-v2"
CHUNK_SIZE = 300
CHUNK_OVERLAP = 100


# Load documents from the specified directory.
def load_docs(directory):
    loader = DirectoryLoader(directory)
    documents = loader.load()
    return documents


# Create sentence embeddings using the specified model
def create_embeddings(model_name):
    return SentenceTransformerEmbeddings(model_name=model_name)



# Create and persist a Chroma vector store from the documents
def create_chroma_db(documents, embeddings, persist_directory):
    db = Chroma.from_documents(documents, embedding=embeddings, persist_directory=persist_directory)
    db.persist()
    return db


# Split documents into smaller chunks
def split_docs(documents, chunk_size, chunk_overlap):
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=chunk_size, 
        chunk_overlap=chunk_overlap, 
        length_function=len, 
        add_start_index=True
    )
    return text_splitter.split_documents(documents)



# Main execution
if __name__ == "__main__":
    # Load documents
    documents = load_docs(DIRECTORY)
    print(f"Loaded {len(documents)} documents")

    # Create embeddings
    embeddings = create_embeddings(MODEL_NAME)

    # Create and persist Chroma vector store
    create_chroma_db(documents, embeddings, PERSIST_DIRECTORY)
    print(f"Chroma database created and persisted at {PERSIST_DIRECTORY}")

    # Split documents into chunks
    docs = split_docs(documents, CHUNK_SIZE, CHUNK_OVERLAP)
    print(f"Split into {len(docs)} chunks")
