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







// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

// const DepartmentPage = () => {
//   const [requests, setRequests] = useState([]);
//   const [filteredRequests, setFilteredRequests] = useState([]);
//   const [notification, setNotification] = useState("");
//   const [comment, setComment] = useState("");
//   const [selectedRequest, setSelectedRequest] = useState(null);
//   const [statusFilter, setStatusFilter] = useState("Pending");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [requestsPerPage] = useState(5);

//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   useEffect(() => {
//     filterRequests();
//   }, [requests, statusFilter]);

//   const fetchRequests = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/requests");
//       setRequests(res.data);
//     } catch (error) {
//       console.error("Error fetching requests:", error);
//     }
//   };

//   const filterRequests = () => {
//     const filtered = requests.filter((req) => req.status === statusFilter);
//     setFilteredRequests(filtered);
//   };

//   const handleUpdateStatus = async (requestId, status) => {
//     try {
//       await axios.put(`http://localhost:5000/api/requests/${requestId}/status`, {
//         status,
//         dept_comment: comment,
//       });
//       setNotification(`Request ${status.toLowerCase()} successfully!`);
//       setComment("");
//       fetchRequests();
//       setTimeout(() => setNotification(""), 3000);
//     } catch (error) {
//       console.error("Error updating request status:", error);
//     }
//   };

//   const indexOfLastRequest = currentPage * requestsPerPage;
//   const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
//   const currentRequests = filteredRequests.slice(indexOfFirstRequest, indexOfLastRequest);

//   return (
//     <div className="min-h-screen bg-gray-100 py-8 px-4 md:px-12 lg:px-24">
//       {/* Header */}
//       <div className="mb-8 text-center">
//         <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-950 via-teal-700 to-green-500">
//           Department Requests
//         </h1>
//         <p className="mt-2 text-lg text-green-950">Manage and track all department requests here.</p>
//       </div>

//       {/* Status Filter Buttons */}
//       <div className="flex justify-center space-x-4 mb-8">
//         {["Pending", "Accepted", "Declined"].map((status) => (
//           <button
//             key={status}
//             onClick={() => setStatusFilter(status)}
//             className={`px-6 py-2 rounded-full transition duration-300 ${
//               statusFilter === status
//                 ? "bg-green-950 text-white shadow-md"
//                 : "bg-gray-200 text-green-950 hover:bg-gray-300"
//             }`}
//           >
//             {status}
//           </button>
//         ))}
//       </div>

//       {/* Notification Banner */}
//       {notification && (
//         <div className="bg-green-100 text-green-950 p-4 rounded-lg shadow-md mb-6 text-center">
//           {notification}
//         </div>
//       )}

//       {/* Request Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {currentRequests.length > 0 ? (
//           currentRequests.map((req) => (
//             <div
//               key={req.request_id}
//               className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
//             >
//               <h3 className="text-lg font-semibold text-green-950 mb-2">Request #{req.request_id}</h3>
//               <p className="text-sm text-green-950 mb-2">
//                 <strong>Item ID:</strong> {req.item_id}
//               </p>
//               <p className="text-sm text-green-950 mb-2">
//                 <strong>Item Name:</strong> {req.item_name}
//               </p>
//               <p className="text-sm text-green-950 mb-2">
//                 <strong>Quantity:</strong> {req.quantity}
//               </p>
//               <button
//                 onClick={() => setSelectedRequest(req)}
//                 className="text-green-950 hover:text-green-800 font-medium underline"
//               >
//                 View Details
//               </button>
//             </div>
//           ))
//         ) : (
//           <div className="col-span-full text-center text-green-950">
//             No requests available for this status.
//           </div>
//         )}
//       </div>

//       {/* Pagination Controls */}
//       <div className="flex justify-center mt-8 space-x-2">
//         <button
//           onClick={() => setCurrentPage(currentPage - 1)}
//           disabled={currentPage === 1}
//           className="p-2 bg-gray-200 rounded-l-lg disabled:opacity-50 hover:bg-green-950 hover:text-white transition-colors"
//         >
//           <FiChevronLeft size={20} />
//         </button>
//         <button
//           onClick={() => setCurrentPage(currentPage + 1)}
//           disabled={indexOfLastRequest >= filteredRequests.length}
//           className="p-2 bg-gray-200 rounded-r-lg disabled:opacity-50 hover:bg-green-950 hover:text-white transition-colors"
//         >
//           <FiChevronRight size={20} />
//         </button>
//       </div>

//       {/* Request Details Modal */}
//       {selectedRequest && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-2xl">
//             <h2 className="text-2xl font-bold text-green-950 mb-4">Request Details</h2>
//             <p className="text-sm text-green-950 mb-2">
//               <strong>Request ID:</strong> {selectedRequest.request_id}
//             </p>
//             <p className="text-sm text-green-950 mb-2">
//               <strong>Item ID:</strong> {selectedRequest.item_id}
//             </p>
//             <p className="text-sm text-green-950 mb-2">
//               <strong>Quantity:</strong> {selectedRequest.quantity}
//             </p>
//             <p className="text-sm text-green-950 mb-4">
//               <strong>Status:</strong> {selectedRequest.status}
//             </p>
//             <textarea
//               value={comment}
//               onChange={(e) => setComment(e.target.value)}
//               placeholder="Add a comment..."
//               className="w-full p-3 border border-green-950 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
//             />
//             <div className="flex space-x-4">
//               <button
//                 onClick={() => handleUpdateStatus(selectedRequest.request_id, "Accepted")}
//                 className="flex-1 bg-green-950 hover:bg-green-800 text-white py-2 px-4 rounded-lg shadow-md transition duration-300"
//               >
//                 Accept
//               </button>
//               <button
//                 onClick={() => handleUpdateStatus(selectedRequest.request_id, "Declined")}
//                 className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg shadow-md transition duration-300"
//               >
//                 Decline
//               </button>
//             </div>
//             <button
//               onClick={() => setSelectedRequest(null)}
//               className="w-full mt-4 bg-gray-300 hover:bg-green-950 hover:text-white py-2 px-4 rounded-lg shadow-md transition duration-300"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DepartmentPage;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  FiChevronLeft, 
  FiChevronRight, 
  FiCheck, 
  FiX, 
  FiClock,
  FiSearch,
  FiInfo,
  FiBox,
  FiHash,
  FiPlus,
  FiMinus
} from "react-icons/fi";

const DepartmentPage = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [notification, setNotification] = useState("");
  const [comment, setComment] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [statusFilter, setStatusFilter] = useState("Pending");
  const [currentPage, setCurrentPage] = useState(1);
  const [requestsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchRequests();
  }, []);

  useEffect(() => {
    filterRequests();
  }, [requests, statusFilter, searchTerm]);

  const fetchRequests = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/requests");
      setRequests(res.data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  const filterRequests = () => {
    let filtered = requests.filter((req) => req.status === statusFilter);
    
    if (searchTerm) {
      filtered = filtered.filter(req => 
        req.item_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.request_id.toString().includes(searchTerm) ||
        req.item_id.toString().includes(searchTerm)
      );
    }
    
    setFilteredRequests(filtered);
    setCurrentPage(1); // Reset to first page when filters change
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
      setNotification("Failed to update request status");
      setTimeout(() => setNotification(""), 3000);
    }
  };

  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = filteredRequests.slice(indexOfFirstRequest, indexOfLastRequest);
  const totalPages = Math.ceil(filteredRequests.length / requestsPerPage);

  const getStatusIcon = (status) => {
    switch (status) {
      case "Accepted":
        return <FiCheck className="text-green-500" />;
      case "Declined":
        return <FiX className="text-red-500" />;
      default:
        return <FiClock className="text-yellow-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 md:px-12 lg:px-24">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-950 via-teal-700 to-green-500">
          Department Requests
        </h1>
        <p className="mt-2 text-lg text-green-950">Manage and track all department requests here.</p>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-1/3">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by item name, request ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        
        {/* Status Filter Buttons */}
        <div className="flex space-x-2">
          {[
            { status: "Pending", icon: <FiClock size={16} /> },
            { status: "Accepted", icon: <FiCheck size={16} /> },
            { status: "Declined", icon: <FiX size={16} /> }
          ].map(({ status, icon }) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`flex items-center px-4 py-2 rounded-full transition duration-300 ${
                statusFilter === status
                  ? "bg-green-950 text-white shadow-md"
                  : "bg-gray-200 text-green-950 hover:bg-gray-300"
              }`}
            >
              {icon}
              <span className="ml-2">{status}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Notification Banner */}
      {notification && (
        <div className={`p-4 rounded-lg shadow-md mb-6 text-center ${
          notification.includes("Failed") 
            ? "bg-red-100 text-red-800" 
            : "bg-green-100 text-green-800"
        }`}>
          {notification}
        </div>
      )}

      {/* Request Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentRequests.length > 0 ? (
          currentRequests.map((req) => (
            <div
              key={req.request_id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-green-500"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-green-950">
                  <FiHash className="inline mr-1" />{req.request_id}
                </h3>
                <span className="flex items-center text-sm">
                  {getStatusIcon(req.status)}
                  <span className="ml-1">{req.status}</span>
                </span>
              </div>
              
              <div className="space-y-2">
                <p className="flex items-center text-sm text-green-950">
                  <FiBox className="mr-2" />
                  <strong>Item:</strong> {req.item_name} (ID: {req.item_id})
                </p>
                <p className="flex items-center text-sm text-green-950">
                  <FiPlus className="mr-2" />
                  <strong>Quantity:</strong> {req.quantity}
                </p>
                {req.dept_comment && (
                  <p className="flex items-start text-sm text-green-950">
                    <FiInfo className="mr-2 mt-1 flex-shrink-0" />
                    <strong>Comment:</strong> {req.dept_comment}
                  </p>
                )}
              </div>
              
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => setSelectedRequest(req)}
                  className="text-green-950 hover:text-green-800 font-medium flex items-center"
                >
                  <FiInfo className="mr-1" /> Details
                </button>
                {req.status === "Pending" && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleUpdateStatus(req.request_id, "Accepted")}
                      className="text-green-500 hover:text-green-700"
                      title="Accept"
                    >
                      <FiCheck size={20} />
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(req.request_id, "Declined")}
                      className="text-red-500 hover:text-red-700"
                      title="Decline"
                    >
                      <FiX size={20} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-green-950 py-12">
            <FiInfo className="mx-auto mb-4 text-4xl" />
            No requests found matching your criteria.
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {filteredRequests.length > requestsPerPage && (
        <div className="flex justify-between items-center mt-8">
          <div className="text-sm text-gray-600">
            Showing {indexOfFirstRequest + 1}-{Math.min(indexOfLastRequest, filteredRequests.length)} of {filteredRequests.length} requests
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-green-950 hover:text-white transition-colors flex items-center"
            >
              <FiChevronLeft size={20} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
              <button
                key={number}
                onClick={() => setCurrentPage(number)}
                className={`w-10 h-10 rounded-lg ${currentPage === number ? 'bg-green-950 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
              >
                {number}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-green-950 hover:text-white transition-colors flex items-center"
            >
              <FiChevronRight size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Request Details Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-2xl">
            <h2 className="text-2xl font-bold text-green-950 mb-4 flex items-center">
              {getStatusIcon(selectedRequest.status)}
              <span className="ml-2">Request Details</span>
            </h2>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Request ID</span>
                <span className="text-sm font-medium">#{selectedRequest.request_id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Item Name</span>
                <span className="text-sm font-medium">{selectedRequest.item_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Item ID</span>
                <span className="text-sm font-medium">{selectedRequest.item_id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Quantity</span>
                <span className="text-sm font-medium">{selectedRequest.quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Status</span>
                <span className="text-sm font-medium">{selectedRequest.status}</span>
              </div>
              {selectedRequest.dept_comment && (
                <div className="pt-3 border-t">
                  <p className="text-sm text-gray-600">Previous Comment</p>
                  <p className="text-sm font-medium">{selectedRequest.dept_comment}</p>
                </div>
              )}
            </div>
            
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add your comment here..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-4 text-sm"
              rows="3"
            />
            
            {selectedRequest.status === "Pending" && (
              <div className="flex space-x-4">
                <button
                  onClick={() => handleUpdateStatus(selectedRequest.request_id, "Accepted")}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg shadow-md transition duration-300 flex items-center justify-center"
                >
                  <FiCheck className="mr-2" /> Accept
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedRequest.request_id, "Declined")}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg shadow-md transition duration-300 flex items-center justify-center"
                >
                  <FiX className="mr-2" /> Decline
                </button>
              </div>
            )}
            
            <button
              onClick={() => setSelectedRequest(null)}
              className="w-full mt-4 bg-gray-200 hover:bg-green-950 hover:text-white py-2 px-4 rounded-lg shadow-md transition duration-300"
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