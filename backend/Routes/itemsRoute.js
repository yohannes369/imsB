import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import { authorizeManager } from '../middleware/authorizeManager.js';
import { addItem,getItems,deleteItem,updateItem } from '../controllers/itemControllers.js';

const router = express.Router();

// Route to add an item (only accessible by managers)
router.post('/addItem', authenticate, authorizeManager, addItem);
// Route to get all items
router.get('/getItems', getItems);
// Route to delete an item (only accessible by managers)
router.delete('/deleteItem/:id', authenticate, authorizeManager, deleteItem);
// Route to update an item (only accessible by managers)
router.put('/updateItem/:id', authenticate, authorizeManager, updateItem);

export default router;
