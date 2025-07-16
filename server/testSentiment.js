const axios = require('axios');

async function test() {
  try {
    const res = await axios.post('http://localhost:8000/analyze/', { text: "I am happy" });
    console.log("Sentiment API response:", res.data);
  } catch (err) {
    console.error("Error calling Sentiment API:", err.message);
  }
}

test();
