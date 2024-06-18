# Langchain RAG 

Install dependencies.

```python
pip install -r requirements.txt
```

Create the Chroma DB.

```python
python chroma_creation.py
```

Query the Chroma DB using the Model.

```postman
uvicorn llm:app --reload
http://localhost:8000/answer

{
    "query": "de quoi parle l'histoire de La naissance du serpent?",
    "context": ""
}

You'll also need to set up a haggingface account (and set the haggingface key in your environment variable) for this to work.
