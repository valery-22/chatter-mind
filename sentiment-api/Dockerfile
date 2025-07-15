FROM python:3.9-slim

WORKDIR /app

# Copy requirements first for better caching
COPY ./requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir numpy==1.26.4 && \
    pip install --no-cache-dir -r requirements.txt

# Copy the app code
COPY ./sentiment_api ./sentiment_api

EXPOSE 8000

CMD ["uvicorn", "sentiment_api.main:app", "--host", "0.0.0.0", "--port", "8000"]
