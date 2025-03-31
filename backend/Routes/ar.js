import express from "express";
import { getAcceptedRequests } from "../Controllers/acppted.js";

const router = express.Router();

// Route to fetch accepted requests with department comments
router.get("/requests/accepted", getAcceptedRequests);

export default router;