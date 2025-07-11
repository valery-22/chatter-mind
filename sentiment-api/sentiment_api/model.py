# sentiment_api/model.py

from textblob import TextBlob

def analyze_sentiment(text: str) -> dict:
    """
    Analyzes the sentiment of the given text.
    Returns polarity, subjectivity, and sentiment label.
    """
    blob = TextBlob(text)
    polarity = blob.sentiment.polarity
    subjectivity = blob.sentiment.subjectivity

    if polarity > 0.2:
        sentiment = "positive"
    elif polarity < -0.2:
        sentiment = "negative"
    else:
        sentiment = "neutral"

    return {
        "text": text,
        "polarity": polarity,
        "subjectivity": subjectivity,
        "sentiment": sentiment
    }
