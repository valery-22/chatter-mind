FROM python:3.9-slim

WORKDIR /app

COPY ./requirements.txt .
COPY ./sentiment_api ./sentiment_api

RUN pip install --no-cache-dir numpy==1.26.4 && \
    pip install --no-cache-dir -r requirements.txt


EXPOSE 8000

CMD ["uvicorn", "sentiment_api.main:app", "--host", "0.0.0.0", "--port", "8000"]
