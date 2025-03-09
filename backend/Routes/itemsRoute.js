import express from 'express';
import { authenticate } from '../middleware/authenticate';
import { authorizeManager } from './middleware/authorizeManager';
import { addItem, updateItem, deleteItem } from '../controllers/itemController';

const router = express.Router();

// Route to add an item (only accessible by managers)
router.post('/addItem', authenticate, authorizeManager, addItem);

// Route to update an item (only accessible by managers)
router.put('/item/:itemId', authenticate, authorizeManager, updateItem);

// Route to delete an item (only accessible by managers)
router.delete('/item/:itemId', authenticate, authorizeManager, deleteItem);

export default router;
