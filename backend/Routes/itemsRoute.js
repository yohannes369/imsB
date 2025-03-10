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
import { addItem, getItem, deleteItem, updateItem } from '../controllers/itemControllers.js';

const router = express.Router();

// Route to add an item
router.post('/addItem', addItem);
// Route to get all items
router.get('/getItem', getItem);
router.delete('/deleteItem/:Item_Code', deleteItem);
router.put('/updateItem/:id', updateItem);
export default router;