import express from 'express';
import { getChatbotResponse } from '../controllers/chatbotController.js';

const router = express.Router();

// Route to get chatbot response (POST /chatbot/ask)
router.post('/chatbot/ask', getChatbotResponse);

export default router;