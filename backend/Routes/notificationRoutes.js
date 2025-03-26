import express from 'express';
import {
  getNotifications,
  markNotificationAsRead
} from '../controllers/notificationController.js';

const router = express.Router();

// Get notifications for an employee
router.get('/:employeeid', getNotifications);

// Mark notification as read
router.put('/:notification_id/read', markNotificationAsRead);

export default router;