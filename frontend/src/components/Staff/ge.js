import React, { useState, useEffect } from "react";
import axios from "axios";

const Not = () => {
  const [employeeId, setEmployeeId] = useState(""); // State for employee ID
  const [allRequests, setAllRequests] = useState([]); // State for storing ALL requests
  const [filteredRequests, setFilteredRequests] = useState([]); // State for filtered requests
  const [error, setError] = useState(null); // State for error messages
  const [loading, setLoading] = useState(true); // State for loading spinner

  // Function to fetch all requests from the backend
  const fetchAllRequests = async () => {
    try {
      setLoading(true);
      setError(null); // Clear previous errors

      // Fetch all requests from the backend
      const response = await axios.get("http://localhost:5000/api/requests");

      setAllRequests(response.data); // Store all requests in state
    } catch (err) {
      console.error("Error fetching all requests:", err);
      setError(err.response?.data?.message || "An error occurred while fetching data.");
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  // Function to filter requests locally based on employee ID
  const filterRequestsByEmployeeId = () => {
    if (!employeeId.trim()) {
      setError("Please enter a valid Employee ID.");
      setFilteredRequests([]);
      return;
    }

    // Filter requests by the entered employee ID (case-sensitive match)
    const filtered = allRequests.filter((request) => request.employee_id === employeeId);

    if (filtered.length === 0) {
      setError("No accepted requests found for this employee.");
      setFilteredRequests([]);
    } else {
      setError(null); // Clear any previous errors
      setFilteredRequests(filtered); // Update filtered requests
    }
  };

  // Fetch all requests when the component mounts
  useEffect(() => {
    fetchAllRequests();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Accepted Requests</h1>

        {/* Input Form */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter Employee ID:
          </label>
          <div className="flex space-x-4">
            <input
              type="text"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              placeholder="Enter Employee ID"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={filterRequestsByEmployeeId}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Filter Requests
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-center mb-6">{error}</p>
        )}

        {/* Display Filtered Requests */}
        {filteredRequests.length > 0 ? (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Your Accepted Requests:
            </h2>
            <ul className="space-y-4">
              {filteredRequests.map((request) => (
                <li key={request.request_id} className="p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Request ID: {request.request_id}</p>
                    <p className="text-sm text-gray-600">Item Name: {request.item_name}</p>
                    <p className="text-sm text-gray-600">Quantity: {request.quantity}</p>
                    <p className="text-sm text-gray-600">Status: {request.status}</p>
                    <p className="text-sm text-gray-600">
                      Department Comment: {request.dept_comment || "None"}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          // Show a message if no filtered requests are displayed
          <p className="text-gray-600 text-center">Enter an Employee ID to filter requests.</p>
        )}
      </div>
    </div>
  );
};

export default Not;