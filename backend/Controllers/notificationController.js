import db from '../config/db.js';

// Get notifications for an employee
export const getNotifications = async (req, res) => {
  const { employee_id } = req.params;

  try {
    const sql = `SELECT * FROM notifications WHERE employee_id = ? AND is_read = FALSE ORDER BY created_at DESC`;
    const [rows] = await db.query(sql, [employee_id]);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Mark notification as read
export const markNotificationAsRead = async (req, res) => {
  const { notification_id } = req.params;

  try {
    const sql = `UPDATE notifications SET is_read = TRUE WHERE notification_id = ?`;
    await db.query(sql, [notification_id]);
    res.status(200).json({ message: 'Notification marked as read!' });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(500).json({ error: 'Server error' });
  }
};