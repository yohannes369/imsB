// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const AcceptedRequests = () => {
//   const [acceptedRequests, setAcceptedRequests] = useState([]); // State to store accepted requests
//   const [loading, setLoading] = useState(false); // State to manage loading state
//   const [error, setError] = useState(null); // State to manage errors

//   // Fetch accepted requests from the backend
//   const fetchAcceptedRequests = async () => {
//     setLoading(true); // Start loading
//     setError(null); // Reset error state
//     try {
//       const response = await axios.get("http://localhost:5000/api/requests/accepted/ac");
//       setAcceptedRequests(response.data); // Update state with fetched data
//     } catch (error) {
//       if (error.response?.status === 404) {
//         setError("No accepted requests found.");
//       } else {
//         setError("Failed to fetch accepted requests. Please try again.");
//       }
//     } finally {
//       setLoading(false); // Stop loading
//     }
//   };

//   // Fetch requests on component mount
//   useEffect(() => {
//     fetchAcceptedRequests();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-800">Accepted Requests</h1>
//           <p className="mt-2 text-gray-600">View all accepted requests with department comments</p>
//         </div>

//         {/* Loading State */}
//         {loading && (
//           <div className="text-center text-blue-600">
//             <p>Loading accepted requests...</p>
//           </div>
//         )}

//         {/* Error State */}
//         {error && (
//           <div className="text-center text-red-600">
//             <p>{error}</p>
//           </div>
//         )}

//         {/* Accepted Requests List */}
//         {!loading && !error && acceptedRequests.length > 0 && (
//           <div className="space-y-4">
//             {acceptedRequests.map((request) => (
//               <div key={request.request_id} className="p-4 border rounded-lg bg-white shadow">
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <h3 className="font-medium text-lg">Request #{request.request_id}</h3>
//                     <p className="text-sm text-gray-600">Employee ID: {request.employee_id}</p>
//                     <p className="text-sm text-gray-600">Item Name: {request.item_name}</p>
//                     <p className="text-sm text-gray-600">Quantity: {request.quantity}</p>
//                   </div>
//                   <span
//                     className={`px-2 py-1 text-xs font-semibold rounded-full ${
//                       request.status === "Accepted"
//                         ? "bg-green-100 text-green-800"
//                         : "bg-gray-100 text-gray-800"
//                     }`}
//                   >
//                     {request.status}
//                   </span>
//                 </div>
//                 <div className="mt-3 pt-3 border-t border-gray-100">
//                   <p className="text-sm text-gray-600">
//                     Department Comment: {request.dept_comment || "No comment provided"}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* No Requests Found */}
//         {!loading && !error && acceptedRequests.length === 0 && (
//           <div className="text-center text-gray-600">
//             <p>No accepted requests available.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AcceptedRequests;
import React, { useState } from 'react';
import axios from 'axios';

const AcceptedRequests = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);

  const fetchRequests = async () => {
    if (!employeeId) {
      setError('Please enter an Employee ID');
      setRequests([]);
      return;
    }
    try {
      const response = await axios.get(`http://localhost:5000/api/requests?employee_id=${employeeId}`);
      const acceptedRequests = response.data.filter(request => request.status === 'Accepted');
      setRequests(acceptedRequests);
      setError(acceptedRequests.length === 0 ? 'No accepted requests found' : null);
    } catch (error) {
      console.error('Error fetching requests:', error);
      setError('Failed to fetch requests');
      setRequests([]);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Accepted Requests</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Employee ID"
            />
            <button
              onClick={fetchRequests}
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Find Requests
            </button>
          </div>
        </div>
        {error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <div className="space-y-4">
            {requests.map(request => (
              <div key={request.request_id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">Request #{request.request_id}</h3>
                    <p className="text-sm text-gray-600">Employee ID: {request.employee_id}</p>
                    <p className="text-sm text-gray-600">Item Name: {request.item_name}</p>
                    <p className="text-sm text-gray-600">Item ID: {request.item_id}</p>
                    <p className="text-sm text-gray-600">Quantity: {request.quantity}</p>
                  </div>
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    Accepted
                  </span>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-sm text-gray-600">Department Comment: {request.dept_comment || 'None'}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AcceptedRequests;