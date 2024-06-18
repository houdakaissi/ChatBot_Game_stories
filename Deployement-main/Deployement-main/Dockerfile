FROM python:3.11.5-slim

WORKDIR /app


RUN pip install --upgrade pip

COPY requirements.txt /app/requirements.txt

RUN pip install --no-cache-dir -r /app/requirements.txt

COPY . /app

COPY chromaa /app/chromaa

EXPOSE 80


CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]
