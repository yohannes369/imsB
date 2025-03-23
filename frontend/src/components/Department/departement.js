import React, { useState, useEffect } from "react";
import axios from "axios";

const Department = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const res = await axios.get("http://localhost:5000/api/requests");
    setRequests(res.data);
  };

  const handleReview = async (id, status) => {
    await axios.put(`http://localhost:5000/api/requests/update`, { request_id: id, status });
    alert(`Request ${status}`);
    fetchRequests(); // Refresh requests after review
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Department Approvals</h2>
      <ul className="mt-4">
        {requests.map((req) => (
          <li key={req._id} className="border p-2 mt-2">
            {req.item_id.item_name} - {req.quantity} ({req.status})
            {req.status === "Pending" && (
              <>
                <button onClick={() => handleReview(req._id, "Accepted")} className="bg-green-500 text-white p-2 ml-2">Accept</button>
                <button onClick={() => handleReview(req._id, "Declined")} className="bg-red-500 text-white p-2 ml-2">Decline</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Department;