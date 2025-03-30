

// import db from '../config/db.js';

// // Create a new request
// export const createRequest = async (req, res) => {
//   const { employee_id, item_id,item_name, quantity, } = req.body;

//   try {
//     const sql = `INSERT INTO requests (employee_id, item_id,item_name, quantity) VALUES (?, ?, ?, ?)`;
//     const [result] = await db.query(sql, [employee_id, item_id, item_name, quantity]);
    
//     // Return the newly created request with its ID
//     const [newRequest] = await db.query('SELECT * FROM requests WHERE request_id = ?', [result.insertId]);

//     // Send notification
//     const notificationMessage = `Your request for item ${item_id} has been created.`;
//     await db.query('INSERT INTO notifications (employee_id, request_id, message) VALUES (?, ?, ?)', [employee_id, result.insertId, notificationMessage]);

//     res.status(201).json(newRequest[0]);
//   } catch (error) {
//     console.error('Error creating request:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// // Update request status
// export const updateRequestStatus = async (req, res) => {
//   const { request_id } = req.params;
//   const { status, dept_comment } = req.body;

//   try {
//     const sql = `UPDATE requests SET status = ?, dept_comment = ?, updated_at = CURRENT_TIMESTAMP WHERE request_id = ?`;
//     await db.query(sql, [status, dept_comment, request_id]);

//     // Fetch the updated request
//     const [updatedRequest] = await db.query('SELECT * FROM requests WHERE request_id = ?', [request_id]);

//     // Send notification
//     const notificationMessage = `Your request for item ${updatedRequest[0].item_id} has been ${status.toLowerCase()} by the department.`;
//     await db.query('INSERT INTO notifications (employee_id, request_id, message) VALUES (?, ?, ?)', [updatedRequest[0].employee_id, request_id, notificationMessage]);

//     res.status(200).json({ message: 'Request status updated!', request: updatedRequest[0] });
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
// }



import db from '../config/db.js';

// Create a new request
export const createRequest = async (req, res) => {
  const { employee_id, item_id, item_name, quantity } = req.body;

  try {
    // Check if employee_id exists in employees table
    const [employeeCheck] = await db.query('SELECT employee_id FROM employees WHERE employee_id = ?', [employee_id]);
    if (!employeeCheck.length) {
      console.log(`Employee ID ${employee_id} is not correct`);
      return res.status(400).json({ error: `Employee ID ${employee_id} is not correct` });
    }

    // Check if item_id exists in items table (optional validation)
    const [itemCheck] = await db.query('SELECT item_id FROM items WHERE item_id = ?', [item_id]);
    if (!itemCheck.length) {
      console.log(`Item ID ${item_id} is not correct`);
      return res.status(400).json({ error: `Item ID ${item_id} is not correct` });
    }

    // Insert the request
    const sql = `INSERT INTO requests (employee_id, item_id, item_name, quantity) VALUES (?, ?, ?, ?)`;
    const [result] = await db.query(sql, [employee_id, item_id, item_name, quantity]);

    // Fetch the newly created request
    const [newRequest] = await db.query('SELECT * FROM requests WHERE request_id = ?', [result.insertId]);

    // Send notification
    const notificationMessage = `Your request for item ${item_id} has been created.`;
    await db.query('INSERT INTO notifications (employee_id, request_id, message) VALUES (?, ?, ?)', [
      employee_id,
      result.insertId,
      notificationMessage,
    ]);

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
    // Fetch the request to get employee_id
    const [requestCheck] = await db.query('SELECT employee_id FROM requests WHERE request_id = ?', [request_id]);
    if (!requestCheck.length) {
      console.log(`Request ID ${request_id} not found`);
      return res.status(404).json({ error: `Request ID ${request_id} not found` });
    }

    const employee_id = requestCheck[0].employee_id;

    // Check if employee_id exists in employees table
    const [employeeCheck] = await db.query('SELECT employee_id FROM employees WHERE employee_id = ?', [employee_id]);
    if (!employeeCheck.length) {
      console.log(`Employee ID ${employee_id} is not correct`);
      return res.status(400).json({ error: `Employee ID ${employee_id} is not correct` });
    }

    // Update the request status
    const sql = `UPDATE requests SET status = ?, dept_comment = ?, updated_at = CURRENT_TIMESTAMP WHERE request_id = ?`;
    await db.query(sql, [status, dept_comment, request_id]);

    // Fetch the updated request
    const [updatedRequest] = await db.query('SELECT * FROM requests WHERE request_id = ?', [request_id]);

    // Send notification
    const notificationMessage = `Your request for item ${updatedRequest[0].item_id} has been ${status.toLowerCase()} by the department.`;
    await db.query('INSERT INTO notifications (employee_id, request_id, message) VALUES (?, ?, ?)', [
      updatedRequest[0].employee_id,
      request_id,
      notificationMessage,
    ]);

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

    // Optional: Validate employee_ids in the response (for logging purposes)
    for (const request of rows) {
      const [employeeCheck] = await db.query('SELECT employee_id FROM employees WHERE employee_id = ?', [request.employee_id]);
      if (!employeeCheck.length) {
        console.log(`Employee ID ${request.employee_id} is not correct in request ID ${request.request_id}`);
      }
    }

    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching requests:', error);
    res.status(500).json({ error: 'Server error' });
  }
};