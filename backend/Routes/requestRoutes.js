import express from 'express';
import {
  createRequest,
  updateRequestStatus,
  getAllRequests
} from '../controllers/requestController.js';

const router = express.Router();

// Create a new request
router.post('/', createRequest);

// Update request status
router.put('/:request_id/status', updateRequestStatus);

// Get all requests
router.get('/', getAllRequests);

export default router;