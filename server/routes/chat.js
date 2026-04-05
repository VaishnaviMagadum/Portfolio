const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// @route   POST api/chat
// @desc    Get AI completion for portfolio assistant
// @access  Public
router.post('/', async (req, res) => {
  const { message, history } = req.body;

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'AIzaSyPlaceholderKey_Replace_This');
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: "You are an AI assistant for a developer's portfolio. You answer questions about the developer's skills, projects, and educational background. The developer is a Computer Science engineering student specializing in Full-Stack Web Development, Java, and React. Be professional, helpful, and concise.",
        },
        {
          role: "model",
          parts: "Understood. I will represent the developer professionally and helpfully.",
        },
        ...history.map(item => ({
             role: item.role === 'user' ? 'user' : 'model',
             parts: item.content
        }))
      ],
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();
    
    res.json({ reply: text });
  } catch (err) {
    console.error('Gemini API Error:', err.message);
    // Fallback response if API key is missing or invalid
    res.json({ reply: "I'm currently in 'Static Mode' because my AI brain (Gemini API key) isn't configured in the .env file. I can tell you that the developer is a Computer Science student skilled in React, Node.js, and Java!" });
  }
});

module.exports = router;
