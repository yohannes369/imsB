// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Notifications = ({ employeeId }) => {
//   const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     fetchNotifications();
//   }, []);

//   const fetchNotifications = async () => {
//     try {
//       const res = await axios.get(`http://localhost:5000/api/notifications/${employeeId}`);
//       setNotifications(res.data);
//     } catch (error) {
//       console.error('Error fetching notifications:', error);
//     }
//   };

//   const handleMarkAsRead = async (notificationId) => {
//     try {
//       await axios.put(`http://localhost:5000/api/notifications/${notificationId}/read`);
//       fetchNotifications();
//     } catch (error) {
//       console.error('Error marking notification as read:', error);
//     }
//   };

//   return (
//     <div className="p-4 bg-white rounded-lg shadow-md">
//       <h2 className="text-xl font-bold mb-4">Notifications</h2>
//       <ul>
//         {notifications.map((notification) => (
//           <li key={notification.notification_id} className="mb-4 p-4 border rounded">
//             <p>{notification.message}</p>
//             <button
//               onClick={() => handleMarkAsRead(notification.notification_id)}
//               className="bg-blue-500 text-white p-2 rounded mt-2"
//             >
//               Mark as Read
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Notifications;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Notifications = ({ employeeId }) => {
//   const [requests, setRequests] = useState([]);

//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   const fetchRequests = async () => {
//     try {
//       const res = await axios.get(`http://localhost:5000/api/requests?employee_id=${employeeId}`);
//       setRequests(res.data);
//     } catch (error) {
//       console.error('Error fetching requests:', error);
//     }
//   };

//   const handleMarkAsRead = async (requestId) => {
//     try {
//       await axios.put(`http://localhost:5000/api/requests/${requestId}/read`);
//       fetchRequests();
//     } catch (error) {
//       console.error('Error marking request as read:', error);
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
//             <button
//               onClick={() => handleMarkAsRead(request.request_id)}
//               className="bg-blue-500 text-white p-2 rounded mt-2"
//             >
//               Mark as Read
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Notifications;


import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Notifications = ({ employeeId }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (employeeId) {
      fetchRequests();
    }
  }, [employeeId]);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5000/api/requests?employee_id=${employeeId}`);
      setRequests(res.data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (requestId) => {
    try {
      await axios.put(`http://localhost:5000/api/requests/${requestId}/read`);
      fetchRequests();
    } catch (error) {
      console.error('Error marking request as read:', error);
    }
  };

  return (
    <div className="space-y-4">
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : requests.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No requests found</p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {requests.map((request) => (
            <li key={request.request_id} className="py-4">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    Item ID: {request.item_id}
                  </p>
                  <p className="text-sm text-gray-500">
                    Quantity: {request.quantity} | Status: 
                    <span className={`ml-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      request.status === 'approved' ? 'bg-green-100 text-green-800' :
                      request.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {request.status || 'pending'}
                    </span>
                  </p>
                  {request.dept_comment && (
                    <p className="mt-1 text-sm text-gray-600">
                      Comment: {request.dept_comment}
                    </p>
                  )}
                </div>
                <div className="ml-4 flex-shrink-0">
                  <button
                    onClick={() => handleMarkAsRead(request.request_id)}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Mark as Read
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;