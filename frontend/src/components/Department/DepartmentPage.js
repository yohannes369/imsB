// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const DepartmentPage = () => {
//   const [requests, setRequests] = useState([]);

//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   const fetchRequests = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/requests');
//       setRequests(res.data);
//     } catch (error) {
//       console.error('Error fetching requests:', error);
//     }
//   };

//   const handleUpdateStatus = async (requestId, status, comment) => {
//     try {
//       await axios.put(`http://localhost:5000/api/requests/${requestId}/status`, {
//         status,
//         dept_comment: comment,
//       });
//       fetchRequests();
//     } catch (error) {
//       console.error('Error updating request status:', error);
//     }
//   };

//   return (
//     <div className="p-4 bg-white rounded-lg shadow-md">
//       <h2 className="text-xl font-bold mb-4">Requests</h2>
//       <ul>
//         {requests.map((request) => (
//           <li key={request.request_id} className="mb-4 p-4 border rounded">
//             <p>Item ID: {request.item_id}</p>
//             <p>Quantity: {request.quantity}</p>
//             <p>Status: {request.status}</p>
//             <p>Department Comment: {request.dept_comment}</p>
//             <div className="mt-2">
//               <button
//                 onClick={() => handleUpdateStatus(request.request_id, 'Accepted', 'Approved by department')}
//                 className="bg-green-500 text-white p-2 rounded mr-2"
//               >
//                 Accept
//               </button>
//               <button
//                 onClick={() => handleUpdateStatus(request.request_id, 'Declined', 'Rejected by department')}
//                 className="bg-red-500 text-white p-2 rounded"
//               >
//                 Decline
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default DepartmentPage;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const DepartmentPage = () => {
//   const [requests, setRequests] = useState([]);
//   const [notification, setNotification] = useState('');
//   const [comment, setComment] = useState('');

//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   const fetchRequests = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/requests');
//       setRequests(res.data);
//     } catch (error) {
//       console.error('Error fetching requests:', error);
//     }
//   };

//   const handleUpdateStatus = async (requestId, status) => {
//     try {
//       await axios.put(`http://localhost:5000/api/requests/${requestId}/status`, {
//         status,
//         dept_comment: comment,
//       });
//       setNotification(`Request ${status.toLowerCase()} successfully!`);
//       setComment(''); // Clear the comment after submission
//       fetchRequests();
//     } catch (error) {
//       console.error('Error updating request status:', error);
//       setNotification('Error updating request status. Please try again.');
//     }
//   };

//   return (
//     <div className="p-4 bg-white rounded-lg shadow-md">
//       <h2 className="text-xl font-bold mb-4">Requests</h2>
//       {notification && (
//         <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4">
//           {notification}
//         </div>
//       )}
//       <ul>
//         {requests.map((request) => (
//           <li key={request.request_id} className="mb-4 p-4 border rounded">
//             <p>Item ID: {request.item_id}</p>
//             <p>Quantity: {request.quantity}</p>
//             <p>Status: {request.status}</p>
//             <p>Department Comment: {request.dept_comment}</p>
//             <div className="mt-2">
//               <textarea
//                 value={comment}
//                 onChange={(e) => setComment(e.target.value)}
//                 placeholder="Add a comment"
//                 className="w-full p-2 border border-gray-300 rounded-md mb-2"
//               />
//               <button
//                 onClick={() => handleUpdateStatus(request.request_id, 'Accepted')}
//                 className="bg-green-500 text-white p-2 rounded mr-2"
//               >
//                 Accept
//               </button>
//               <button
//                 onClick={() => handleUpdateStatus(request.request_id, 'Declined')}
//                 className="bg-red-500 text-white p-2 rounded"
//               >
//                 Decline
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default DepartmentPage;








import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const DepartmentPage = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [notification, setNotification] = useState("");
  const [comment, setComment] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [statusFilter, setStatusFilter] = useState("Pending");
  const [currentPage, setCurrentPage] = useState(1);
  const [requestsPerPage] = useState(5);

  useEffect(() => {
    fetchRequests();
  }, []);

  useEffect(() => {
    filterRequests();
  }, [requests, statusFilter]);

  const fetchRequests = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/requests");
      setRequests(res.data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  const filterRequests = () => {
    const filtered = requests.filter((req) => req.status === statusFilter);
    setFilteredRequests(filtered);
  };

  const handleUpdateStatus = async (requestId, status) => {
    try {
      await axios.put(`http://localhost:5000/api/requests/${requestId}/status`, {
        status,
        dept_comment: comment,
      });
      setNotification(`Request ${status.toLowerCase()} successfully!`);
      setComment("");
      fetchRequests();
      setTimeout(() => setNotification(""), 3000);
    } catch (error) {
      console.error("Error updating request status:", error);
    }
  };

  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = filteredRequests.slice(indexOfFirstRequest, indexOfLastRequest);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 md:px-12 lg:px-24">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-teal-500 to-green-400">
          Department Requests
        </h1>
        <p className="mt-2 text-lg text-gray-600">Manage and track all department requests here.</p>
      </div>

      {/* Status Filter Buttons */}
      <div className="flex justify-center space-x-4 mb-8">
        {["Pending", "Accepted", "Declined"].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-6 py-2 rounded-full transition duration-300 ${
              statusFilter === status
                ? "bg-teal-600 text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Notification Banner */}
      {notification && (
        <div className="bg-green-100 text-green-800 p-4 rounded-lg shadow-md mb-6 text-center">
          {notification}
        </div>
      )}

      {/* Request Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentRequests.length > 0 ? (
          currentRequests.map((req) => (
            <div
              key={req.request_id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Request #{req.request_id}</h3>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Item ID:</strong> {req.item_id}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <strong> item name:</strong> {req.item_name}
              </p>
               <p className="text-sm text-gray-600 mb-2">
                <strong>Item ID:</strong> {req.item_id}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Quantity:</strong> {req.quantity}
              </p>
              <button
                onClick={() => setSelectedRequest(req)}
                className="text-teal-600 hover:text-teal-800 font-medium underline"
              >
                View Details
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-600">
            No requests available for this status.
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-8 space-x-2">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 bg-gray-200 rounded-l-lg disabled:opacity-50 hover:bg-gray-300 transition-colors"
        >
          <FiChevronLeft size={20} />
        </button>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={indexOfLastRequest >= filteredRequests.length}
          className="p-2 bg-gray-200 rounded-r-lg disabled:opacity-50 hover:bg-gray-300 transition-colors"
        >
          <FiChevronRight size={20} />
        </button>
      </div>

      {/* Request Details Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Request Details</h2>
            <p className="text-sm text-gray-600 mb-2">
              <strong>Request ID:</strong> {selectedRequest.request_id}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <strong>Item ID:</strong> {selectedRequest.item_id}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <strong>Quantity:</strong> {selectedRequest.quantity}
            </p>
            <p className="text-sm text-gray-600 mb-4">
              <strong>Status:</strong> {selectedRequest.status}
            </p>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 mb-4"
            />
            <div className="flex space-x-4">
              <button
                onClick={() => handleUpdateStatus(selectedRequest.request_id, "Accepted")}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg shadow-md transition duration-300"
              >
                Accept
              </button>
              <button
                onClick={() => handleUpdateStatus(selectedRequest.request_id, "Declined")}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg shadow-md transition duration-300"
              >
                Decline
              </button>
            </div>
            <button
              onClick={() => setSelectedRequest(null)}
              className="w-full mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg shadow-md transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentPage;


