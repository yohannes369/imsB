import db from '../config/db.js';

// Get chatbot response
export const getChatbotResponse = async (req, res) => {
  const { query } = req.body;

  try {
    const sql = `SELECT answer FROM chatbot_knowledge WHERE question LIKE ?`;
    const [rows] = await db.query(sql, [`%${query}%`]);
    const response = rows.length ? rows[0].answer : 'Sorry, I did not understand your request.';
    res.status(200).json({ response });
  } catch (error) {
    console.error('Error getting chatbot response:', error);
    res.status(500).json({ error: 'Server error' });
  }
};