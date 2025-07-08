const express = require('express');
const router = express.Router();
const askGemini = require('../services/gemini');
const savePrompt = require('../utils/savePrompt');
const twilio = require('twilio');

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);
const TWILIO_PHONE = process.env.TWILIO_PHONE;

router.post('/webhook', async (req, res) => {
  const from = req.body.From;
  const msg = req.body.Body;
  console.log('Message received:', from, msg);

  const response = await askGemini(msg);

  try {
    await twilioClient.messages.create({
      body: response,
      from: `whatsapp:${TWILIO_PHONE}`,
      to: from
    });

    await savePrompt(from, msg, response);
  } catch (err) {
    console.error('Failed to send message or save prompt:', err);
  }

  res.sendStatus(200);
});

module.exports = router;
