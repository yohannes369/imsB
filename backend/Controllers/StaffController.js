import Request from "../models/requestModel.js";

// ✅ Staff requests an item
export const createRequest = async (req, res) => {
  try {
    const { employee_id, item_id, quantity } = req.body;

    if (!employee_id || !item_id || !quantity) {
      return res.status(400).json({ error: "employee_id, item_id, and quantity are required" });
    }

    const newRequest = await Request.create({ employee_id, item_id, quantity });
    res.status(201).json({ message: "Request submitted successfully", request: newRequest });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get all requests
export const getRequests = async (req, res) => {
  try {
    const requests = await Request.findAll();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get a request by ID
export const getRequestById = async (req, res) => {
  try {
    const { request_id } = req.params;
    const request = await Request.findByPk(request_id);

    if (!request) return res.status(404).json({ message: "Request not found" });

    res.json(request);
  } catch (error) {
    res.status(500).json({ error: error.message });
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

    const request = await Request.findByPk(request_id);
    if (!request) return res.status(404).json({ message: "Request not found" });

    await request.update({ status, dept_comment, dept_action_at: new Date() });
    res.json({ message: "Request status updated", request });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Clerk adds a comment to a request
export const addClerkComment = async (req, res) => {
  try {
    const { request_id } = req.params;
    const { clerk_comment } = req.body;

    const request = await Request.findByPk(request_id);
    if (!request) return res.status(404).json({ message: "Request not found" });

    await request.update({ clerk_comment, clerk_action_at: new Date() });
    res.json({ message: "Clerk comment added", request });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Delete a request
export const deleteRequest = async (req, res) => {
  try {
    const { request_id } = req.params;
    const request = await Request.findByPk(request_id);

    if (!request) return res.status(404).json({ message: "Request not found" });

    await request.destroy();
    res.json({ message: "Request deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
