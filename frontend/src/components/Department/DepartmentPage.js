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



import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DepartmentPage = () => {
  const [requests, setRequests] = useState([]);
  const [notification, setNotification] = useState('');
  const [comment, setComment] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, [sortBy]);

  const fetchRequests = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/requests');
      const sortedRequests = res.data.sort((a, b) => {
        if (sortBy === 'date') {
          return new Date(b.created_at) - new Date(a.created_at);
        } else if (sortBy === 'status') {
          return a.status.localeCompare(b.status);
        }
        return 0;
      });
      setRequests(sortedRequests);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const handleUpdateStatus = async (requestId, status) => {
    try {
      await axios.put(`http://localhost:5000/api/requests/${requestId}/status`, {
        status,
        dept_comment: comment,
      });
      setNotification(`Request ${status.toLowerCase()} successfully!`);
      setComment('');
      fetchRequests();
      setTimeout(() => setNotification(''), 3000);
    } catch (error) {
      console.error('Error updating request status:', error);
      setNotification('Error updating request status. Please try again.');
    }
  };

  const renderRequestCard = (request) => (
    <div key={request.request_id} className="bg-white p-6 rounded-lg shadow-lg border cursor-pointer" onClick={() => setSelectedRequest(request)}>
      <p className="text-gray-700"><strong>Item ID:</strong> {request.item_id}</p>
      <p className="text-gray-700"><strong>Quantity:</strong> {request.quantity}</p>
      <p className="text-gray-700"><strong>Status:</strong> <span className={`px-2 py-1 rounded text-white ${request.status === 'Accepted' ? 'bg-green-500' : request.status === 'Declined' ? 'bg-red-500' : 'bg-yellow-500'}`}>{request.status}</span></p>
    </div>
  );

  return (
    <div className="container mx-auto p-8 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Department Requests</h2>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-2 bg-white border border-gray-300 rounded-lg shadow-sm"
        >
          <option value="date">Date (Newest First)</option>
          <option value="status">Status</option>
        </select>
      </div>

      {notification && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6">
          {notification}
        </div>
      )}

      {selectedRequest ? (
        <div className="bg-white p-6 rounded-lg shadow-lg border">
          <h3 className="text-xl font-semibold">Request Details</h3>
          <p className="text-gray-700"><strong>Item ID:</strong> {selectedRequest.item_id}</p>
          <p className="text-gray-700"><strong>Quantity:</strong> {selectedRequest.quantity}</p>
          <p className="text-gray-700"><strong>Status:</strong> {selectedRequest.status}</p>
          <p className="text-gray-700"><strong>Comment:</strong> {selectedRequest.dept_comment || 'No comment'}</p>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-2 mt-2 border rounded"
            placeholder="Add a comment..."
          />
          <div className="flex space-x-2 mt-4">
            <button onClick={() => handleUpdateStatus(selectedRequest.request_id, 'Accepted')} className="flex-1 bg-green-500 text-white p-2 rounded">Accept</button>
            <button onClick={() => handleUpdateStatus(selectedRequest.request_id, 'Declined')} className="flex-1 bg-red-500 text-white p-2 rounded">Decline</button>
          </div>
          <button onClick={() => setSelectedRequest(null)} className="mt-4 bg-gray-500 text-white p-2 rounded">Back to Requests</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.length === 0 ? (
            <p className="text-gray-500 col-span-full">No requests available.</p>
          ) : (
            requests.map(renderRequestCard)
          )}
        </div>
      )}
    </div>
  );
};

export default DepartmentPage;

