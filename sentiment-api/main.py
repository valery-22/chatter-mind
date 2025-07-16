from fastapi import FastAPI, Request
from pydantic import BaseModel
from transformers import pipeline

app = FastAPI()
sentiment_analyzer = pipeline("sentiment-analysis")

class Message(BaseModel):
    text: str

@app.post("/analyze/")
async def analyze_sentiment(msg: Message):
    result = sentiment_analyzer(msg.text)[0]
    return {"label": result['label'], "score": result['score']}