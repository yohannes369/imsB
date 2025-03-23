import React, { useState, useEffect } from "react";
import axios from "axios";

const Staff = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [requests, setRequests] = useState([]);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/items").then((res) => setItems(res.data));
    axios.get("http://localhost:5000/api/requests").then((res) => setRequests(res.data));
  }, []);

  const handleRequest = async () => {
    if (!selectedItem || !quantity) return alert("Select item and quantity");
    await axios.post("http://localhost:5000/api/requests/create", {
      employee_id: 1, // Static for now
      item_id: selectedItem,
      quantity,
    });
    alert("Request Sent!");
    // Refresh requests
    axios.get("http://localhost:5000/api/requests").then((res) => setRequests(res.data));
  };

  const handleStatusChange = async (request_id, status) => {
    await axios.put("http://localhost:5000/api/requests/update", {
      request_id,
      status,
    });
    // Refresh requests
    axios.get("http://localhost:5000/api/requests").then((res) => setRequests(res.data));
    setNotification(`Request ${status}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Request an Item</h2>
      <div className="mt-4">
        <select onChange={(e) => setSelectedItem(e.target.value)} className="border p-2">
          <option value="">Select Item</option>
          {items.map((item) => (
            <option key={item.item_id} value={item.item_id}>{item.item_name}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Quantity"
          className="border p-2 ml-2"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <button onClick={handleRequest} className="bg-blue-500 text-white p-2 ml-2">Request</button>
      </div>
      <h2 className="text-xl font-bold mt-6">Your Requests</h2>
      {notification && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4">{notification}</div>}
      <ul className="mt-4">
        {requests.map((req) => (
          <li key={req._id} className="border p-2 mt-2">
            {req.item_id.item_name} - {req.quantity} ({req.status})
            <div className="mt-2">
              <button
                onClick={() => handleStatusChange(req._id, 'Pending')}
                className={`p-2 mr-2 ${req.status === 'Pending' ? 'bg-yellow-500' : 'bg-gray-300'}`}
              >
                Pending
              </button>
              <button
                onClick={() => handleStatusChange(req._id, 'Accepted')}
                className={`p-2 mr-2 ${req.status === 'Accepted' ? 'bg-green-500' : 'bg-gray-300'}`}
              >
                Accept
              </button>
              <button
                onClick={() => handleStatusChange(req._id, 'Declined')}
                className={`p-2 ${req.status === 'Declined' ? 'bg-red-500' : 'bg-gray-300'}`}
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

export default Staff;