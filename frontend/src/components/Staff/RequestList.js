import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RequestList = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/requests');
      setRequests(res.data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const handleUpdateStatus = async (requestId, status, comment) => {
    try {
      await axios.put(`http://localhost:5000/api/requests/${requestId}/status`, {
        status,
        dept_comment: comment,
      });
      fetchRequests();
    } catch (error) {
      console.error('Error updating request status:', error);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Requests</h2>
      <ul>
        {requests.map((request) => (
          <li key={request.request_id} className="mb-4 p-4 border rounded">
            <p>Item ID: {request.item_id}</p>
            <p>Quantity: {request.quantity}</p>
            <p>Status: {request.status}</p>
            <p>Department Comment: {request.dept_comment}</p>
            <div className="mt-2">
              <button
                onClick={() => handleUpdateStatus(request.request_id, 'Accepted', 'Approved by department')}
                className="bg-green-500 text-white p-2 rounded mr-2"
              >
                Accept
              </button>
              <button
                onClick={() => handleUpdateStatus(request.request_id, 'Declined', 'Rejected by department')}
                className="bg-red-500 text-white p-2 rounded"
              >
                Decline
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RequestList;