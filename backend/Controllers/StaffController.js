// import Request from "../models/requestModel.js";

// // ✅ Staff requests an item
// export const createRequest = async (req, res) => {
//   try {
//     const { employee_id, item_id, quantity } = req.body;

//     if (!employee_id || !item_id || !quantity) {
//       return res.status(400).json({ error: "employee_id, item_id, and quantity are required" });
//     }

//     const newRequest = await Request.create({ employee_id, item_id, quantity });
//     res.status(201).json({ message: "Request submitted successfully", request: newRequest });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // ✅ Get all requests
// export const getRequests = async (req, res) => {
//   try {
//     const requests = await Request.findAll();
//     res.json(requests);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // ✅ Get a request by ID
// export const getRequestById = async (req, res) => {
//   try {
//     const { request_id } = req.params;
//     const request = await Request.findByPk(request_id);

//     if (!request) return res.status(404).json({ message: "Request not found" });

//     res.json(request);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // ✅ Approve or Reject request by Department
// export const updateRequestStatus = async (req, res) => {
//   try {
//     const { request_id } = req.params;
//     const { status, dept_comment } = req.body;

//     if (!["Accepted", "Declined"].includes(status)) {
//       return res.status(400).json({ error: "Invalid status. Use 'Accepted' or 'Declined'" });
//     }

//     const request = await Request.findByPk(request_id);
//     if (!request) return res.status(404).json({ message: "Request not found" });

//     await request.update({ status, dept_comment, dept_action_at: new Date() });
//     res.json({ message: "Request status updated", request });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // ✅ Clerk adds a comment to a request
// export const addClerkComment = async (req, res) => {
//   try {
//     const { request_id } = req.params;
//     const { clerk_comment } = req.body;

//     const request = await Request.findByPk(request_id);
//     if (!request) return res.status(404).json({ message: "Request not found" });

//     await request.update({ clerk_comment, clerk_action_at: new Date() });
//     res.json({ message: "Clerk comment added", request });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // ✅ Delete a request
// export const deleteRequest = async (req, res) => {
//   try {
//     const { request_id } = req.params;
//     const request = await Request.findByPk(request_id);

//     if (!request) return res.status(404).json({ message: "Request not found" });

//     await request.destroy();
//     res.json({ message: "Request deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };



// correct one 

// import db from '../config/db.js';

// // ✅ Staff requests an item
// export const createRequest = async (req, res) => {
//   try {
//     const { employee_id, item_id, quantity } = req.body;

//     if (!employee_id || !item_id || !quantity) {
//       return res.status(400).json({ error: "employee_id, item_id, and quantity are required" });
//     }

//     const sql = `INSERT INTO requests (employee_id, item_id, quantity) VALUES (?, ?, ?)`;
//     const [result] = await db.query(sql, [employee_id, item_id, quantity]);

//     // Return the newly created request with its ID
//     const [newRequest] = await db.query('SELECT * FROM requests WHERE request_id = ?', [result.insertId]);

//     // Send notification
//     const notificationMessage = `Your request for item ${item_id} has been created.`;
//     await db.query('INSERT INTO notifications (employee_id, request_id, message) VALUES (?, ?, ?)', [employee_id, result.insertId, notificationMessage]);

//     res.status(201).json({ message: "Request submitted successfully", request: newRequest[0] });
//   } catch (error) {
//     console.error('Error creating request:', error);
//     res.status(500).json({ error: error.message });
//   }
// };

// // ✅ Get all requests
// export const getRequests = async (req, res) => {
//   try {
//     const [requests] = await db.query('SELECT * FROM requests');
//     res.json(requests);
//   } catch (error) {
//     console.error('Error fetching requests:', error);
//     res.status(500).json({ error: error.message });
//   }
// };
// //finde request by emloye id and get request 

// // ✅ Get a request by ID
// export const getRequestById = async (req, res) => {
//   try {
//     const { request_id } = req.params;
//     const [request] = await db.query('SELECT * FROM requests WHERE request_id = ?', [request_id]);

//     if (request.length === 0) return res.status(404).json({ message: "Request not found" });

//     res.json(request[0]);
//   } catch (error) {
//     console.error('Error fetching request:', error);
//     res.status(500).json({ error: error.message });
//   }
// };

// // ✅ Approve or Reject request by Department
// export const updateRequestStatus = async (req, res) => {
//   try {
//     const { request_id } = req.params;
//     const { status, dept_comment } = req.body;

//     if (!["Accepted", "Declined"].includes(status)) {
//       return res.status(400).json({ error: "Invalid status. Use 'Accepted' or 'Declined'" });
//     }

//     const [request] = await db.query('SELECT * FROM requests WHERE request_id = ?', [request_id]);
//     if (request.length === 0) return res.status(404).json({ message: "Request not found" });

//     await db.query('UPDATE requests SET status = ?, dept_comment = ?, dept_action_at = CURRENT_TIMESTAMP WHERE request_id = ?', [status, dept_comment, request_id]);

//     // Send notification
//     const notificationMessage = `Your request for item ${request[0].item_id} has been ${status.toLowerCase()} by the department.`;
//     await db.query('INSERT INTO notifications (employee_id, request_id, message) VALUES (?, ?, ?)', [request[0].employee_id, request_id, notificationMessage]);

//     res.json({ message: "Request status updated", request: { ...request[0], status, dept_comment } });
//   } catch (error) {
//     console.error('Error updating request status:', error);
//     res.status(500).json({ error: error.message });
//   }
// };

// // ✅ Clerk adds a comment to a request
// export const addClerkComment = async (req, res) => {
//   try {
//     const { request_id } = req.params;
//     const { clerk_comment } = req.body;

//     const [request] = await db.query('SELECT * FROM requests WHERE request_id = ?', [request_id]);
//     if (request.length === 0) return res.status(404).json({ message: "Request not found" });

//     await db.query('UPDATE requests SET clerk_comment = ?, clerk_action_at = CURRENT_TIMESTAMP WHERE request_id = ?', [clerk_comment, request_id]);

//     res.json({ message: "Clerk comment added", request: { ...request[0], clerk_comment } });
//   } catch (error) {
//     console.error('Error adding clerk comment:', error);
//     res.status(500).json({ error: error.message });
//   }
// };

// // ✅ Delete a request
// export const deleteRequest = async (req, res) => {
//   try {
//     const { request_id } = req.params;
//     const [request] = await db.query('SELECT * FROM requests WHERE request_id = ?', [request_id]);

//     if (request.length === 0) return res.status(404).json({ message: "Request not found" });

//     await db.query('DELETE FROM requests WHERE request_id = ?', [request_id]);

//     res.json({ message: "Request deleted successfully" });
//   } catch (error) {
//     console.error('Error deleting request:', error);
//     res.status(500).json({ error: error.message });
//   }
// };
// //get notiffication for department
// export const getNotifications = async (req, res) => {
//   try {
//     const [notifications] = await db.query('SELECT * FROM notifications');
//     res.json(notifications);
//   } catch (error) {
//     console.error('Error fetching notifications:', error);
//     res.status(500).json({ error: error.message });
//   }
// };

import db from '../config/db.js';

// ✅ Staff requests an item
export const createRequest = async (req, res) => {
  try {
    const { employee_id, item_id, quantity } = req.body;

    if (!employee_id || !item_id || !quantity) {
      return res.status(400).json({ error: "employee_id, item_id, and quantity are required" });
    }

    const sql = `INSERT INTO requests (employee_id, item_id, quantity) VALUES (?, ?, ?)`;
    const [result] = await db.query(sql, [employee_id, item_id, quantity]);

    const [newRequest] = await db.query('SELECT * FROM requests WHERE request_id = ?', [result.insertId]);

    // Send notification
    const notificationMessage = `Your request for item ${item_id} has been created.`;
    await db.query('INSERT INTO notifications (employee_id, request_id, message) VALUES (?, ?, ?)', [employee_id, result.insertId, notificationMessage]);

    res.status(201).json({ message: "Request submitted successfully", request: newRequest[0] });
  } catch (error) {
    console.error('Error creating request:', error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get all requests
export const getRequests = async (req, res) => {
  try {
    const [requests] = await db.query('SELECT * FROM requests');
    res.json(requests);
  } catch (error) {
    console.error('Error fetching requests:', error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get a request by ID
export const getRequestById = async (req, res) => {
  try {
    const { request_id } = req.params;
    const [request] = await db.query('SELECT * FROM requests WHERE request_id = ?', [request_id]);

    if (request.length === 0) return res.status(404).json({ message: "Request not found" });

    res.json(request[0]);
  } catch (error) {
    console.error('Error fetching request:', error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get requests by Employee ID
export const getRequestsByEmployeeId = async (req, res) => {
  try {
    const { employee_id } = req.params;

    // Validate employee_id
    if (!employee_id || employee_id.trim() === "") {
      return res.status(400).json({ message: "Invalid Employee ID provided." });
    }

    console.log(`Fetching requests for Employee ID: ${employee_id}`);

    // Query the database for requests by employee_id
    const [requests] = await db.query(
      "SELECT * FROM requests WHERE employee_id = ?",
      [employee_id]
    );

    // Check if any requests were found
    if (requests.length === 0) {
      return res.status(404).json({ message: "No requests found for this employee." });
    }

    // Return the requests
    res.status(200).json(requests);
  } catch (error) {
    console.error("Error fetching requests by employee ID:", error);
    res.status(500).json({ error: "An error occurred while fetching requests. Please try again later." });
  }
};

// ✅ Approve or Reject request by Department
export const updateRequestStatus = async (req, res) => {
  try {
    const { request_id } = req.params;
    const { status, dept_comment } = req.body;

    if (!["Accepted", "Declined"].includes(status)) {
      return res.status(400).json({ error: "Invalid status. Use 'Accepted' or 'Declined'" });
    }

    const [request] = await db.query('SELECT * FROM requests WHERE request_id = ?', [request_id]);
    if (request.length === 0) return res.status(404).json({ message: "Request not found" });

    await db.query('UPDATE requests SET status = ?, dept_comment = ?, dept_action_at = CURRENT_TIMESTAMP WHERE request_id = ?', [status, dept_comment, request_id]);

    // Send notification
    const notificationMessage = `Your request for item ${request[0].item_id} has been ${status.toLowerCase()} by the department.`;
    await db.query('INSERT INTO notifications (employee_id, request_id, message) VALUES (?, ?, ?)', [request[0].employee_id, request_id, notificationMessage]);

    res.json({ message: "Request status updated", request: { ...request[0], status, dept_comment } });
  } catch (error) {
    console.error('Error updating request status:', error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Clerk adds a comment to a request
export const addClerkComment = async (req, res) => {
  try {
    const { request_id } = req.params;
    const { clerk_comment } = req.body;

    const [request] = await db.query('SELECT * FROM requests WHERE request_id = ?', [request_id]);
    if (request.length === 0) return res.status(404).json({ message: "Request not found" });

    await db.query('UPDATE requests SET clerk_comment = ?, clerk_action_at = CURRENT_TIMESTAMP WHERE request_id = ?', [clerk_comment, request_id]);

    res.json({ message: "Clerk comment added", request: { ...request[0], clerk_comment } });
  } catch (error) {
    console.error('Error adding clerk comment:', error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Delete a request
export const deleteRequest = async (req, res) => {
  try {
    const { request_id } = req.params;
    const [request] = await db.query('SELECT * FROM requests WHERE request_id = ?', [request_id]);

    if (request.length === 0) return res.status(404).json({ message: "Request not found" });

    await db.query('DELETE FROM requests WHERE request_id = ?', [request_id]);

    res.json({ message: "Request deleted successfully" });
  } catch (error) {
    console.error('Error deleting request:', error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get notifications for department
export const getNotifications = async (req, res) => {
  try {
    const [notifications] = await db.query('SELECT * FROM notifications');
    res.json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ error: error.message });
  }
};
