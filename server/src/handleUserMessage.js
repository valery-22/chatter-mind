exports.handleUserMessage = async (req, res) => {
  console.log("Received body:", req.body);

  const { message, context, sessionId } = req.body;
  if (!message || !sessionId) {
    console.log("Missing message or sessionId");
    return res.status(400).json({ error: "Missing 'message' or 'sessionId'" });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: message }
      ],
      temperature: 0.7,
      max_tokens: 150
    });

    const reply = response.choices?.[0]?.message?.content?.trim() || "Sorry, no reply.";

    res.json({ reply });

  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
