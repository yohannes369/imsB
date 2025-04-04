
import express from "express";
import { forecastItemDemand} from "../controllers/forcast.js";


const router = express.Router();




router.get('/forcast/:item_id', forecastItemDemand);


export default router;

