import express from "express";
import { reviewRequest } from "../controllers/departmentController.js";

const router = express.Router();

// ✅ Department reviews (approves or rejects) a request
router.put("/requests/:request_id/review", reviewRequest);

export default router;
