// import React, { useState } from 'react';
// import axios from 'axios';

// const Staff = () => {
//   const [employeeId, setEmployeeId] = useState('');
//   const [itemId, setItemId] = useState('');
//   const [quantity, setQuantity] = useState('');

//   const handleSubmit = async (e) => { 
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:5000/api/requests', {
//         employee_id: employeeId,
//         item_id: itemId,
//         quantity,
//       });
//       alert('Request created successfully!');
//       setEmployeeId('');
//       setItemId('');
//       setQuantity('');
//     } catch (error) {
//       console.error('Error creating request:', error);
//       alert('Error creating request. Please try again.');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg shadow-md">
//       <h2 className="text-xl font-bold mb-4">Create Request</h2>
//       <div className="mb-4">
//         <label className="block text-gray-700">Employee ID</label>
//         <input
//           type="text"
//           value={employeeId}
//           onChange={(e) => setEmployeeId(e.target.value)}
//           className="w-full p-2 border border-gray-300 rounded-md"
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-gray-700">Item ID</label>
//         <input
//           type="text"
//           value={itemId}
//           onChange={(e) => setItemId(e.target.value)}
//           className="w-full p-2 border border-gray-300 rounded-md"
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-gray-700">Quantity</label>
//         <input
//           type="number"
//           value={quantity}
//           onChange={(e) => setQuantity(e.target.value)}
//           className="w-full p-2 border border-gray-300 rounded-md"
//         />
//       </div>
//       <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">
//         Create Request
//       </button> 
//     </form>
//   );
// };

// export default Staff
// 
// ;





// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Staff = () => {
//   const [employeeId, setEmployeeId] = useState('');
//   const [itemId, setItemId] = useState('');
//   const [itemname, setItemname] = useState('');
//   const [quantity, setQuantity] = useState('');
//   const [notifications, setNotifications] = useState([]);
//   const [activeTab, setActiveTab] = useState('request');
//   const [requests, setRequests] = useState([]);

//   // Submit new request
//   const handleSubmit = async (e) => { 
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:5000/api/requests', {
//         employee_id: employeeId,
//         item_id: itemId,
//         item_name:itemname,
//         quantity,
//       });
      
//       // Add success notification
//       showNotification('Request created successfully!', 'success');
//       setItemId('');
//       setItemname('');
//       setQuantity('');
//       fetchRequests();
//     } catch (error) {
//       showNotification('Error creating request. Please try again.', 'error');
//       console.error('Error creating request:', error);
//     }
//   };

//   // Show notification
//   const showNotification = (message, type) => {
//     const newNotification = {
//       id: Date.now(),
//       type,
//       message,
//       timestamp: new Date()
//     };
    
//     setNotifications(prev => [newNotification, ...prev]);
    
//     // Auto-dismiss after 5 seconds
//     setTimeout(() => {
//       setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
//     }, 5000);
//   };

//   // Dismiss notification
//   const dismissNotification = (id) => {
//     setNotifications(prev => prev.filter(n => n.id !== id));
//   };

//   // Fetch requests
//   const fetchRequests = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/requests?employee_id=${employeeId}`);
//       setRequests(response.data);
//     } catch (error) {
//       console.error('Error fetching requests:', error);
//     }
//   };

//   // Fetch notifications
//   const fetchNotifications = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/notifications/${employeeId}`);
//       if (response.data.length > 0) {
//         const latestNotification = response.data[0];
//         alert(latestNotification.message);
//         // Mark notification as read
//         await axios.put(`http://localhost:5000/api/notifications/${latestNotification.notification_id}/read`);
//       }
//     } catch (error) {
//       console.error('Error fetching notifications:', error);
//     }
//   };

//   useEffect(() => {
//     if (employeeId) {
//       fetchRequests();
//       fetchNotifications();
//     }
//   }, [employeeId]);

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-800">Staff Request System</h1>
//           <p className="mt-2 text-gray-600">Submit and track your item requests</p>
//         </div>

//         {/* Notification Area */}
//         <div className="mb-6 space-y-2">
//           {notifications.map(notification => (
//             <div 
//               key={notification.id}
//               className={`p-4 rounded-lg border ${
//                 notification.type === 'success' 
//                   ? 'bg-green-50 border-green-200 text-green-800'
//                   : notification.type === 'error'
//                   ? 'bg-red-50 border-red-200 text-red-800'
//                   : 'bg-blue-50 border-blue-200 text-blue-800'
//               }`}
//             >
//               <div className="flex justify-between items-center">
//                 <div>
//                   <p className="font-medium">{notification.message}</p>
//                   <p className="text-xs opacity-75 mt-1">
//                     {notification.timestamp.toLocaleTimeString()}
//                   </p>
//                 </div>
//                 <button 
//                   onClick={() => dismissNotification(notification.id)}
//                   className="text-gray-500 hover:text-gray-700"
//                 >
//                   ✕
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Main Content */}
//         <div className="bg-white rounded-xl shadow-md overflow-hidden">
//           {/* Tab Navigation */}
//           <div className="border-b border-gray-200">
//             <nav className="flex">
//               <button
//                 onClick={() => setActiveTab('request')}
//                 className={`px-6 py-4 font-medium ${
//                   activeTab === 'request'
//                     ? 'border-b-2 border-blue-500 text-blue-600'
//                     : 'text-gray-500 hover:text-gray-700'
//                 }`}
//               >
//                 New Request
//               </button>
//               <button
//                 onClick={() => setActiveTab('status')}
//                 className={`px-6 py-4 font-medium ${
//                   activeTab === 'status'
//                     ? 'border-b-2 border-blue-500 text-blue-600'
//                     : 'text-gray-500 hover:text-gray-700'
//                 }`}
//               >
//                 Request Status
//               </button>
//             </nav>
//           </div>

//           {/* Tab Content */}
//           <div className="p-6">
//             {activeTab === 'request' ? (
//               <div className="space-y-6">
//                 <h2 className="text-xl font-semibold text-gray-800">Create New Request</h2>
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Employee ID
//                     </label>
//                     <input
//                       type="text"
//                       value={employeeId}
//                       onChange={(e) => setEmployeeId(e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Item ID
//                     </label>
//                     <input
//                       type="text"
//                       value={itemId}
//                       onChange={(e) => setItemId(e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       required
//                     />
//                   </div>


//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Item Name
//                     </label>
//                     <input
//                       type="text"
//                       value={itemname}
//                       onChange={(e) => setItemname(e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Quantity
//                     </label>
//                     <input
//                       type="number"
//                       min="1"
//                       value={quantity}
//                       onChange={(e) => setQuantity(e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       required
//                     />
//                   </div>

//                   <button
//                     type="submit"
//                     className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//                   >
//                     Submit Request
//                   </button>
//                 </form>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 <h2 className="text-xl font-semibold text-gray-800">Your Request Status</h2>
//                 <div className="space-y-4">
//                   {requests.map(request => (
//                     <div key={request.request_id} className="p-4 border rounded-lg">
//                       <div className="flex justify-between items-start">
//                         <div>
                       
//                           <h3 className="font-medium">Request #{request.request_id}</h3>
//                           <p className="text-sm text-gray-600">Employee ID: {request.employee_id}</p>
//                           <p className="text-sm text-gray-600">Item Name: {request.item_name}</p>
//                           <p className="text-sm text-gray-600">Item: {request.item_id}</p>
//                           <p className="text-sm text-gray-600">Quantity: {request.quantity}</p>
//                         </div>
//                         <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
//                           request.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
//                           request.status === 'Accepted' ? 'bg-green-100 text-green-800' :
//                           'bg-red-100 text-red-800'
//                         }`}>
//                           {request.status}
//                         </span>
//                       </div>
//                       <div className="mt-3 pt-3 border-t border-gray-100">
//                         <p className="text-sm text-gray-600">Department Comment: {request.dept_comment}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Staff;



import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Staff = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [itemId, setItemId] = useState('');
  const [itemname, setItemname] = useState('');
  const [quantity, setQuantity] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState('request');
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null); // For error messages

  // Submit new request
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/requests', {
        employee_id: employeeId,
        item_id: itemId,
        item_name: itemname,
        quantity,
      });
      
      showNotification('Request created successfully!', 'success');
      setItemId('');
      setItemname('');
      setQuantity('');
      fetchRequests(); // Refresh requests after submission
    } catch (error) {
      const errorMsg = error.response?.data?.error || 'Error creating request. Please try again.';
      showNotification(errorMsg, 'error');
      console.error('Error creating request:', error);
    }
  };

  // Show notification
  const showNotification = (message, type) => {
    const newNotification = {
      id: Date.now(),
      type,
      message,
      timestamp: new Date(),
    };
    setNotifications(prev => [newNotification, ...prev]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
    }, 5000);
  };

  // Dismiss notification
  const dismissNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Fetch requests for the given employeeId
  const fetchRequests = async () => {
    if (!employeeId) {
      setError('Please enter an Employee ID');
      setRequests([]);
      return;
    }
    try {
      const response = await axios.get(`http://localhost:5000/api/requests?employee_id=${employeeId}`);
      setRequests(response.data);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error('Error fetching requests:', error);
      if (error.response?.status === 400) {
        setError(error.response.data.error || 'Employee ID not found');
      } else {
        setError('Failed to fetch requests');
      }
      setRequests([]);
    }
  };

  // Fetch notifications
  const fetchNotifications = async () => {
    if (!employeeId) return;
    try {
      const response = await axios.get(`http://localhost:5000/api/notifications/${employeeId}`);
      if (response.data.length > 0) {
        const latestNotification = response.data[0];
        alert(latestNotification.message);
        await axios.put(`http://localhost:5000/api/notifications/${latestNotification.notification_id}/read`);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  // Handle fetching requests when the user clicks a "Find" button
  const handleFindRequests = () => {
    fetchRequests();
    fetchNotifications();
  };

  // Only fetch when explicitly triggered (via button), not on every employeeId change
  // Removed useEffect to avoid automatic fetching

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Staff Request System</h1>
          <p className="mt-2 text-gray-600">Submit and track your item requests</p>
        </div>

        {/* Notification Area */}
        <div className="mb-6 space-y-2">
          {notifications.map(notification => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg border ${
                notification.type === 'success'
                  ? 'bg-green-50 border-green-200 text-green-800'
                  : 'bg-red-50 border-red-200 text-red-800'
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{notification.message}</p>
                  <p className="text-xs opacity-75 mt-1">
                    {notification.timestamp.toLocaleTimeString()}
                  </p>
                </div>
                <button
                  onClick={() => dismissNotification(notification.id)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('request')}
                className={`px-6 py-4 font-medium ${
                  activeTab === 'request'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                New Request
              </button>
              <button
                onClick={() => setActiveTab('status')}
                className={`px-6 py-4 font-medium ${
                  activeTab === 'status'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Request Status
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'request' ? (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800">Create New Request</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Employee ID
                    </label>
                    <input
                      type="text"
                      value={employeeId}
                      onChange={(e) => setEmployeeId(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Item ID
                    </label>
                    <input
                      type="text"
                      value={itemId}
                      onChange={(e) => setItemId(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Item Name
                    </label>
                    <input
                      type="text"
                      value={itemname}
                      onChange={(e) => setItemname(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quantity
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Submit Request
                  </button>
                </form>
              </div>
            ) : (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">Your Request Status</h2>
                {/* Form to find requests */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Employee ID
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={employeeId}
                        onChange={(e) => setEmployeeId(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter Employee ID"
                      />
                      <button
                        onClick={handleFindRequests}
                        className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        Find Requests
                      </button>
                    </div>
                  </div>
                  {/* Display requests or messages */}
                  {error ? (
                    <p className="text-red-500 text-center">{error}</p>
                  ) : requests.length === 0 ? (
                    <p className="text-gray-600 text-center">
                      {employeeId ? `No requests found for Employee ID: ${employeeId}` : 'Please enter an Employee ID and click "Find Requests"'}
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {requests.map(request => (
                        <div key={request.request_id} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">Request #{request.request_id}</h3>
                              <p className="text-sm text-gray-600">Employee ID: {request.employee_id}</p>
                              <p className="text-sm text-gray-600">Item Name: {request.item_name}</p>
                              <p className="text-sm text-gray-600">Item: {request.item_id}</p>
                              <p className="text-sm text-gray-600">Quantity: {request.quantity}</p>
                            </div>
                            <span
                              className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                request.status === 'Pending'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : request.status === 'Accepted'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {request.status}
                            </span>
                          </div>
                          <div className="mt-3 pt-3 border-t border-gray-100">
                            <p className="text-sm text-gray-600">
                              Department Comment: {request.dept_comment || 'None'}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Staff;






// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Staff = () => {
//   const [employeeId, setEmployeeId] = useState('');
//   const [itemId, setItemId] = useState('');
//   const [itemname, setItemname] = useState('');
//   const [quantity, setQuantity] = useState('');
//   const [notifications, setNotifications] = useState([]);
//   const [activeTab, setActiveTab] = useState('request');
//   const [requests, setRequests] = useState([]);
//   const [error, setError] = useState(null); // For error messages

//   // Submit new request
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/api/requests', {
//         employee_id: employeeId,
//         item_id: itemId,
//         item_name: itemname,
//         quantity,
//       });
      
//       showNotification('Request created successfully!', 'success');
//       setItemId('');
//       setItemname('');
//       setQuantity('');
//       fetchRequests(); // Refresh requests after submission
//     } catch (error) {
//       const errorMsg = error.response?.data?.error || 'Error creating request. Please try again.';
//       showNotification(errorMsg, 'error');
//       console.error('Error creating request:', error);
//     }
//   };

//   // Show notification
//   const showNotification = (message, type) => {
//     const newNotification = {
//       id: Date.now(),
//       type,
//       message,
//       timestamp: new Date(),
//     };
//     setNotifications(prev => [newNotification, ...prev]);
//     setTimeout(() => {
//       setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
//     }, 5000);
//   };

//   // Dismiss notification
//   const dismissNotification = (id) => {
//     setNotifications(prev => prev.filter(n => n.id !== id));
//   };

//   // Fetch requests for the given employeeId
//   const fetchRequests = async () => {
//     if (!employeeId) {
//       setError('Please enter an Employee ID');
//       setRequests([]);
//       return;
//     }
//     try {
//       // First, validate if employee ID exists
//       const employeeResponse = await axios.get(`http://localhost:5000/api/employees/${employeeId}`);
//       if (employeeResponse.status !== 200) {
//         setError('Employee ID not found');
//         setRequests([]);
//         alert(`No employee found with ID: ${employeeId}`);
//         return;
//       }

//       // If employee ID is valid, fetch requests
//       const response = await axios.get(`http://localhost:5000/api/employees/${employeeId}/requests?employee_id=${employeeId}`);
//       if (response.data.length === 0) {
//         setError(`No requests found for Employee ID: ${employeeId}`);
//         alert(`No requests found for Employee ID: ${employeeId}`);
//       } else {
//         setRequests(response.data);
//         setError(null);
//       }
//     } catch (error) {
//       console.error('Error fetching requests:', error);
//       if (error.response?.status === 400) {
//         setError(error.response.data.error || 'Employee ID not found');
//         alert(`Employee ID ${employeeId} is not correct`);
//       } else {
//         setError('Failed to fetch requests');
//         alert('Failed to fetch requests. Please try again.');
//       }
//       setRequests([]);
//     }
//   };

//   // Fetch notifications
//   const fetchNotifications = async () => {
//     if (!employeeId) return;
//     try {
//       const response = await axios.get(`http://localhost:5000/api/notifications/${employeeId}`);
//       if (response.data.length > 0) {
//         const latestNotification = response.data[0];
//         alert(latestNotification.message);
//         await axios.put(`http://localhost:5000/api/notifications/${latestNotification.notification_id}/read`);
//       }
//     } catch (error) {
//       console.error('Error fetching notifications:', error);
//     }
//   };

//   // Handle fetching requests when the user clicks a "Find" button
//   const handleFindRequests = () => {
//     fetchRequests();
//     fetchNotifications();
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-800">Staff Request System</h1>
//           <p className="mt-2 text-gray-600">Submit and track your item requests</p>
//         </div>

//         {/* Notification Area */}
//         <div className="mb-6 space-y-2">
//           {notifications.map(notification => (
//             <div
//               key={notification.id}
//               className={`p-4 rounded-lg border ${
//                 notification.type === 'success'
//                   ? 'bg-green-50 border-green-200 text-green-800'
//                   : 'bg-red-50 border-red-200 text-red-800'
//               }`}
//             >
//               <div className="flex justify-between items-center">
//                 <div>
//                   <p className="font-medium">{notification.message}</p>
//                   <p className="text-xs opacity-75 mt-1">
//                     {notification.timestamp.toLocaleTimeString()}
//                   </p>
//                 </div>
//                 <button
//                   onClick={() => dismissNotification(notification.id)}
//                   className="text-gray-500 hover:text-gray-700"
//                 >
//                   ✕
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Main Content */}
//         <div className="bg-white rounded-xl shadow-md overflow-hidden">
//           {/* Tab Navigation */}
//           <div className="border-b border-gray-200">
//             <nav className="flex">
//               <button
//                 onClick={() => setActiveTab('request')}
//                 className={`px-6 py-4 font-medium ${
//                   activeTab === 'request'
//                     ? 'border-b-2 border-blue-500 text-blue-600'
//                     : 'text-gray-500 hover:text-gray-700'
//                 }`}
//               >
//                 New Request
//               </button>
//               <button
//                 onClick={() => setActiveTab('status')}
//                 className={`px-6 py-4 font-medium ${
//                   activeTab === 'status'
//                     ? 'border-b-2 border-blue-500 text-blue-600'
//                     : 'text-gray-500 hover:text-gray-700'
//                 }`}
//               >
//                 Request Status
//               </button>
//             </nav>
//           </div>

//           {/* Tab Content */}
//           <div className="p-6">
//             {activeTab === 'request' ? (
//               <div className="space-y-6">
//                 <h2 className="text-xl font-semibold text-gray-800">Create New Request</h2>
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Employee ID
//                     </label>
//                     <input
//                       type="text"
//                       value={employeeId}
//                       onChange={(e) => setEmployeeId(e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Item ID
//                     </label>
//                     <input
//                       type="text"
//                       value={itemId}
//                       onChange={(e) => setItemId(e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Item Name
//                     </label>
//                     <input
//                       type="text"
//                       value={itemname}
//                       onChange={(e) => setItemname(e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Quantity
//                     </label>
//                     <input
//                       type="number"
//                       min="1"
//                       value={quantity}
//                       onChange={(e) => setQuantity(e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       required
//                     />
//                   </div>
//                   <button
//                     type="submit"
//                     className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//                   >
//                     Submit Request
//                   </button>
//                 </form>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 <h2 className="text-xl font-semibold text-gray-800">Your Request Status</h2>
//                 {/* Form to find requests */}
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Employee ID
//                     </label>
//                     <div className="flex space-x-2">
//                       <input
//                         type="text"
//                         value={employeeId}
//                         onChange={(e) => setEmployeeId(e.target.value)}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         placeholder="Enter Employee ID"
//                       />
//                       <button
//                         onClick={handleFindRequests}
//                         className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//                       >
//                         Find Requests
//                       </button>
//                     </div>
//                   </div>
//                   {/* Display requests or messages */}
//                   {error ? (
//                     <p className="text-red-500 text-center">{error}</p>
//                   ) : requests.length === 0 ? (
//                     <p className="text-gray-600 text-center">
//                       {employeeId ? `No requests found for Employee ID: ${employeeId}` : 'Please enter an Employee ID and click "Find Requests"'}
//                     </p>
//                   ) : (
//                     <div className="space-y-4">
//                       {requests.map(request => (
//                         <div key={request.request_id} className="p-4 border rounded-lg">
//                           <div className="flex justify-between items-start">
//                             <div>
//                               <h3 className="font-medium">Request #{request.request_id}</h3>
//                               <p className="text-sm text-gray-600">Employee ID: {request.employee_id}</p>
//                               <p className="text-sm text-gray-600">Item Name: {request.item_name}</p>
//                               <p className="text-sm text-gray-600">Item: {request.item_id}</p>
//                               <p className="text-sm text-gray-600">Quantity: {request.quantity}</p>
//                             </div>
//                             <span
//                               className={`px-2 py-1 text-xs font-semibold rounded-full ${
//                                 request.status === 'Pending'
//                                   ? 'bg-yellow-100 text-yellow-800'
//                                   : request.status === 'Accepted'
//                                   ? 'bg-green-100 text-green-800'
//                                   : 'bg-red-100 text-red-800'
//                               }`}
//                             >
//                               {request.status}
//                             </span>
//                           </div>
//                           <div className="mt-3 pt-3 border-t border-gray-100">
//                             <p className="text-sm text-gray-600">
//                               Department Comment: {request.dept_comment || 'None'}
//                             </p>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Staff;