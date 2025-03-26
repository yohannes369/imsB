import db from '../config/db.js';

// Add data
export const addKnowledge = async (req, res) => {
  const { question, answer } = req.body;

  try {
    const sql = `INSERT INTO chatbot_knowledge (question, answer) VALUES (?, ?)`;
    await db.query(sql, [question, answer]);
    res.status(201).json({ message: 'Knowledge added successfully!' });
  } catch (error) {
    console.error('Error adding knowledge:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Edit data
export const editKnowledge = async (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;

  try {
    const sql = `UPDATE chatbot_knowledge SET question = ?, answer = ? WHERE id = ?`;
    await db.query(sql, [question, answer, id]);
    res.status(200).json({ message: 'Knowledge updated successfully!' });
  } catch (error) {
    console.error('Error updating knowledge:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete data
export const deleteKnowledge = async (req, res) => {
  const { id } = req.params;

  try {
    const sql = `DELETE FROM chatbot_knowledge WHERE id = ?`;
    await db.query(sql, [id]);
    res.status(200).json({ message: 'Knowledge deleted successfully!' });
  } catch (error) {
    console.error('Error deleting knowledge:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all data
export const getAllKnowledge = async (req, res) => {
  try {
    const sql = `SELECT * FROM chatbot_knowledge`;
    const [rows] = await db.query(sql);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching knowledge:', error);
    res.status(500).json({ error: 'Server error' });
  }
};