import express from 'express';
import { addKnowledge, editKnowledge, deleteKnowledge, getAllKnowledge } from '../controllers/managerController.js';

const router = express.Router();

// Add knowledge
router.post('/knowledge', addKnowledge);

// Edit knowledge
router.put('/knowledge/:id', editKnowledge);

// Delete knowledge
router.delete('/knowledge/:id', deleteKnowledge);

// Get all knowledge
router.get('/knowledge', getAllKnowledge);

export default router;