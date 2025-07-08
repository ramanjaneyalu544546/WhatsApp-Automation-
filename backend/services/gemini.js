const axios = require('axios');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

const askGemini = async (prompt) => {
  try {
    const res = await axios.post(`${GEMINI_ENDPOINT}?key=${GEMINI_API_KEY}`, {
      contents: [{ parts: [{ text: prompt }] }]
    });
    const reply = res.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return reply || 'Sorry, no response from Gemini.';
  } catch (err) {
    console.error('Gemini error:', err);
    return 'There was an error getting a response from Gemini.';
  }
};

module.exports = askGemini;
