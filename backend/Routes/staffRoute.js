// import express from "express";
// import { createRequest, getRequests, getRequestById, updateRequestStatus, addClerkComment, deleteRequest } from "../controllers/requestController.js";

// const router = express.Router();

// // ✅ Staff submits a request
// router.post("/requests", createRequest);

// // ✅ Get all requests
// router.get("/requests", getRequests);

// // ✅ Get a request by ID
// router.get("/requests/:request_id", getRequestById);

// // ✅ Department approves or rejects request
// router.put("/requests/:request_id/status", updateRequestStatus);

// // ✅ Clerk adds a comment to a request
// router.put("/requests/:request_id/clerk-comment", addClerkComment);

// // ✅ Delete a request
// router.delete("/requests/:request_id", deleteRequest);

// export default router;

// import express from "express";
// import {
//   createRequest,
//   getRequests,
//   getRequestById,
//   getRequestsByEmployeeId,
//   updateRequestStatus,
//   addClerkComment,
//   deleteRequest,
//   getNotifications,
//   updateInventory,
// } from "../controllers/requestController.js";

// const router = express.Router();

// // ✅ Staff submits a request
// router.post("/requests", createRequest);

// router.post('/updateInventory', updateInventory);


// // ✅ Get all requests
// router.get("/requests", getRequests);

// // ✅ Get a request by ID
// router.get("/requests/:request_id", getRequestById);

// // ✅ Get requests by Employee ID (Fixed Endpoint)
// router.get("/requests/employee/:employee_id", getRequestsByEmployeeId);

// // ✅ Department approves or rejects request
// router.put("/requests/:request_id/status", updateRequestStatus);

// // ✅ Clerk adds a comment to a request
// router.put("/requests/:request_id/clerk-comment", addClerkComment);

// // ✅ Delete a request
// router.delete("/requests/:request_id", deleteRequest);

// // ✅ Get notifications
// router.get("/notifications/:employee_id", getNotifications);

// export default router;

