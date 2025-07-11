const axios = require('axios');
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Memoria de conversación por sesión (esto es básico para desarrollo local)
const conversationMemory = {};  // Puede migrarse a Redis o DB si deseas escalar

exports.handleUserMessage = async (req, res) => {
  const { message, context, sessionId } = req.body;

  if (!message || !sessionId) {
    return res.status(400).json({ error: "Missing message or sessionId" });
  }

  try {
    // 1. Obtener sentimiento
    const sentimentRes = await axios.post('http://sentiment-api:8000/analyze/', {
      text: message
    });

    console.log("📊 Sentiment API response:", sentimentRes.data);

    const { label, score } = sentimentRes.data;

    // 2. Crear intro emocional según sentimiento
    let moodIntro = "";
    if (label === "NEGATIVE") {
      moodIntro = "The user seems to be feeling down or stressed.";
    } else if (label === "POSITIVE") {
      moodIntro = "The user is in a good mood.";
    } else {
      moodIntro = "The user's mood is neutral or unclear.";
    }

    // 3. Crear historial si no existe
    if (!conversationMemory[sessionId]) {
      conversationMemory[sessionId] = [
        { role: "system", content: "You are a helpful and emotionally aware AI support assistant." }
      ];
    }

    // 4. Agregar nuevo mensaje del usuario al historial
    conversationMemory[sessionId].push({ role: "user", content: `${message}` });

    // 5. Agregar mensaje de contexto emocional
    conversationMemory[sessionId].unshift({
      role: "system",
      content: moodIntro
    });

    // 6. Enviar a OpenAI con historial completo
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Cambia a gpt-4 si lo deseas
      messages: conversationMemory[sessionId],
      temperature: 0.7,
      max_tokens: 150
    });

    const reply = response.choices[0].message.content.trim();

    // 7. Agregar respuesta del asistente al historial
    conversationMemory[sessionId].push({ role: "assistant", content: reply });

    // 8. Responder al cliente
    res.json({
      reply,
      sentiment: label,
      score
    });

  } catch (err) {
    console.error("❌ Error in handleUserMessage:", err.message);
    if (err.response) {
      console.error("🔎 Response data:", err.response.data);
      console.error("📄 Status:", err.response.status);
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};

