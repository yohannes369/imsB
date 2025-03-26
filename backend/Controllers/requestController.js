// import db from '../config/db.js';

// // Create a new request
// export const createRequest = async (req, res) => {
//   const { employee_id, item_id, quantity } = req.body;

//   try {
//     const sql = `INSERT INTO requests (employee_id, item_id, quantity) VALUES (?, ?, ?)`;
//     const [result] = await db.query(sql, [employee_id, item_id, quantity]);
    
//     // Return the newly created request with its ID
//     const [newRequest] = await db.query('SELECT * FROM requests WHERE request_id = ?', [result.insertId]);
//     res.status(201).json(newRequest[0]);
//   } catch (error) {
//     console.error('Error creating request:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// // Update request status
// export const updateRequestStatus = async (req, res) => {
//   const { request_id } = req.params;
//   const { status } = req.body;

//   try {
//     const sql = `UPDATE requests SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE request_id = ?`;
//     await db.query(sql, [status, request_id]);

//     res.status(200).json({ message: 'Request status updated!' });
//   } catch (error) {
//     console.error('Error updating request status:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// // Get all requests
// export const getAllRequests = async (req, res) => {
//   try {
//     const sql = `SELECT * FROM requests`;
//     const [rows] = await db.query(sql);
//     res.status(200).json(rows);
//   } catch (error) {
//     console.error('Error fetching requests:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

import db from '../config/db.js';

// Create a new request
export const createRequest = async (req, res) => {
  const { employee_id, item_id, quantity } = req.body;

  try {
    const sql = `INSERT INTO requests (employee_id, item_id, quantity) VALUES (?, ?, ?)`;
    const [result] = await db.query(sql, [employee_id, item_id, quantity]);
    
    // Return the newly created request with its ID
    const [newRequest] = await db.query('SELECT * FROM requests WHERE request_id = ?', [result.insertId]);

    // Send notification
    const notificationMessage = `Your request for item ${item_id} has been created.`;
    await db.query('INSERT INTO notifications (employee_id, request_id, message) VALUES (?, ?, ?)', [employee_id, result.insertId, notificationMessage]);

    res.status(201).json(newRequest[0]);
  } catch (error) {
    console.error('Error creating request:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update request status
export const updateRequestStatus = async (req, res) => {
  const { request_id } = req.params;
  const { status, dept_comment } = req.body;

  try {
    const sql = `UPDATE requests SET status = ?, dept_comment = ?, updated_at = CURRENT_TIMESTAMP WHERE request_id = ?`;
    await db.query(sql, [status, dept_comment, request_id]);

    // Fetch the updated request
    const [updatedRequest] = await db.query('SELECT * FROM requests WHERE request_id = ?', [request_id]);

    // Send notification
    const notificationMessage = `Your request for item ${updatedRequest[0].item_id} has been ${status.toLowerCase()} by the department.`;
    await db.query('INSERT INTO notifications (employee_id, request_id, message) VALUES (?, ?, ?)', [updatedRequest[0].employee_id, request_id, notificationMessage]);

    res.status(200).json({ message: 'Request status updated!', request: updatedRequest[0] });
  } catch (error) {
    console.error('Error updating request status:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all requests
export const getAllRequests = async (req, res) => {
  try {
    const sql = `SELECT * FROM requests`;
    const [rows] = await db.query(sql);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching requests:', error);
    res.status(500).json({ error: 'Server error' });
  }
};