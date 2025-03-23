// import express from 'express';
// import { authenticate } from '../middleware/authMiddleware.js';
// import { authorizeManager } from '../middleware/authorizeManager.js';
// import { addItem,getItems,deleteItem,updateItem } from '../controllers/itemControllers.js';

// const router = express.Router();

// // Route to add an item (only accessible by managers)
// router.post('/addItem', authenticate, authorizeManager, addItem);
// // Route to get all items
// router.get('/getItems', getItems);

// export default router;
import express from 'express';
import { addItem, getItem, deleteItem, updateItem, getItemById } from '../controllers/itemControllers.js';

const router = express.Router();

// Route to add a new item (POST /items)
router.post('/items', addItem);

// Route to get all items (GET /items)
router.get('/items', getItem);

// Route to get a single item by item_id (GET /items/:item_id)
router.get('/items/:item_id', getItemById);

// Route to delete an item by item_id (DELETE /items/:item_id)
router.delete('/items/:item_id', deleteItem);

// Route to update an item by item_id (PUT /items/:item_id)
router.put('/items/:item_id', updateItem);

export default router;