import Request from "../models/requestModel.js";

// ✅ Department approves or rejects request
export const reviewRequest = async (req, res) => {
  try {
    const { request_id } = req.params;
    const { status, dept_comment } = req.body;

    if (!["Accepted", "Declined"].includes(status)) {
      return res.status(400).json({ error: "Invalid status. Use 'Accepted' or 'Declined'" });
    }

    const request = await Request.findByPk(request_id);
    if (!request) return res.status(404).json({ message: "Request not found" });

    await request.update({ status, dept_comment, dept_action_at: new Date() });
    res.json({ message: `Request ${status} by department`, request });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
