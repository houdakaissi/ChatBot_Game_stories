from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional
import os

from langchain_community.llms import HuggingFaceHub
from langchain_core.prompts import PromptTemplate
from langchain_community.embeddings import SentenceTransformerEmbeddings
from langchain_community.vectorstores import Chroma
from langchain.chains.question_answering import load_qa_chain

app = FastAPI()

class QueryRequest(BaseModel):
    query: str
    context: Optional[str] = None

# Initialize Chroma directory path
CHROMA_PATH = "chroma"

# Initialize Sentence Transformer embeddings
embeddings = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")

# Initialize the Chroma vector store
db = Chroma(persist_directory=CHROMA_PATH, embedding_function=embeddings)



# Set up Hugging Face Hub model
os.environ['HUGGINGFACEHUB_API_TOKEN'] = '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'
model = HuggingFaceHub(
    repo_id="mistralai/Mixtral-8x7B-Instruct-v0.1",
    task="text-generation",
    model_kwargs={
        "max_new_tokens": 2048,
        "top_k": 30,
        "temperature": 0.1,
        "repetition_penalty": 1.03,
    },
)


# Define the prompt template
PROMPT_TEMPLATE = """
Répondez à la question en français en vous basant uniquement sur le contexte suivant :

{context}

---

Répondez à la question en français en vous basant sur le contexte ci-dessus : {question}
"""

# Create the PromptTemplate object
prompt = PromptTemplate(template=PROMPT_TEMPLATE, input_variables=["context", "question"])

# Load the QA chain
chain = load_qa_chain(model, chain_type="stuff", prompt=prompt, verbose=False)



@app.post("/answer/")
async def get_answer(query_request: QueryRequest):
    # Search for matching documents using Chroma
    matching_docs = db.similarity_search(query_request.query)

    # Extract the content from the matching documents to form the context
    context = "\n\n".join([doc.page_content for doc in matching_docs])

    # Concatenate additional context with context from Chroma database
    if query_request.context:
        context += "\n\n" + query_request.context

    # Format the input to the chain using the prompt template
    formatted_input = prompt.format(context=context, question=query_request.query)

    # Run the chain and get the answer
    answer = chain.run(input_documents=matching_docs, question=query_request.query)

    # Extract the response part after the prompt and question
    response_start = "Répondez à la question en français en vous basant sur le contexte ci-dessus :"
    response = answer.split(response_start)[-1].strip()

    # Remove the question from the response
    if response.startswith(query_request.query):
        response = response[len(query_request.query):].strip()

    return {response}
