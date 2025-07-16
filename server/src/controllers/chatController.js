const axios = require('axios');
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Memoria de conversación por sesión
const conversationMemory = {};  // { sessionId: [ { role, content }, ... ] }

exports.handleUserMessage = async (req, res) => {
  const { message, context, sessionId } = req.body;

  if (!message || !sessionId) {
    return res.status(400).json({ error: "Missing message or sessionId" });
  }

  try {
    // 1. Llamar a Sentiment API
    const sentimentRes = await axios.post('http://localhost:8000/analyze/', {
      text: message
    });

    const { label, score } = sentimentRes.data;

    // 2. Crear introducción emocional según sentimiento
    let moodIntro = "";
    if (label === "NEGATIVE" || label === "negative") {
      moodIntro = "The user seems to be feeling down or stressed.";
    } else if (label === "POSITIVE" || label === "positive") {
      moodIntro = "The user is in a good mood.";
    } else {
      moodIntro = "The user's mood is neutral or unclear.";
    }

    // 3. Inicializar historial si no existe para sessionId
    if (!conversationMemory[sessionId]) {
      conversationMemory[sessionId] = [
        { role: "system", content: "You are a helpful and emotionally aware AI support assistant." }
      ];
    }

    // 4. Insertar intro emocional al inicio (reemplazar la anterior para no crecer infinito)
    // Nota: puedes ajustar según quieras mantener contexto
    if (conversationMemory[sessionId][0]?.role === "system") {
      conversationMemory[sessionId][0].content = moodIntro;
    } else {
      conversationMemory[sessionId].unshift({ role: "system", content: moodIntro });
    }

    // 5. Agregar mensaje usuario
    conversationMemory[sessionId].push({ role: "user", content: message });

    // 6. Llamar a OpenAI con historial
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: conversationMemory[sessionId],
      temperature: 0.7,
      max_tokens: 150
    });

    const reply = response.choices[0].message.content.trim();

    // 7. Agregar respuesta asistente al historial
    conversationMemory[sessionId].push({ role: "assistant", content: reply });

    // 8. Responder al cliente
    res.json({
      reply,
      sentiment: label.toUpperCase(),
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
