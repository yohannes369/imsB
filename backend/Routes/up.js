
import express from "express";
import {
 
  updateInventory,
} from "../controllers/update.js";


const router = express.Router();




router.post('/updateInventory', updateInventory);


;






export default router;

