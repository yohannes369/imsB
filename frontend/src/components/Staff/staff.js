import React, { useState } from 'react';
import axios from 'axios';
import StaffSidebar from './sidebar';

const Staff = () => {
  // Form state
  const [formData, setFormData] = useState({
    employeeId: '',
    itemId: '',
    itemName: '',
    quantity: ''
  });
  
  // UI state
  const [activeTab, setActiveTab] = useState('request');
  const [requests, setRequests] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState({
    submit: false,
    fetch: false
  });
  const [error, setError] = useState(null);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Submit new request
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(prev => ({ ...prev, submit: true }));
    
    try {
      await axios.post('http://localhost:5000/api/requests', {
        employee_id: formData.employeeId,
        item_id: formData.itemId,
        item_name: formData.itemName,
        quantity: formData.quantity,
      });
      
      showNotification('Request created successfully!', 'success');
      setFormData({
        employeeId: formData.employeeId,
        itemId: '',
        itemName: '',
        quantity: ''
      });
      fetchRequests();
    } catch (error) {
      const errorMsg = error.response?.data?.error || 'Error creating request. Please try again.';
      showNotification(errorMsg, 'error');
      console.error('Error creating request:', error);
    } finally {
      setIsLoading(prev => ({ ...prev, submit: false }));
    }
  };

  // Notification system
  const showNotification = (message, type) => {
    const id = Date.now();
    const newNotification = {
      id,
      type,
      message,
      timestamp: new Date().toLocaleTimeString(),
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  // Fetch requests
  const fetchRequests = async () => {
    if (!formData.employeeId) {
      setError('Please enter an Employee ID');
      setRequests([]);
      return;
    }
    
    setIsLoading(prev => ({ ...prev, fetch: true }));
    setError(null);
    
    try {
      const response = await axios.get(
        `http://localhost:5000/api/requests?employee_id=${formData.employeeId}`
      );
      setRequests(response.data);
    } catch (error) {
      console.error('Error fetching requests:', error);
      setError(error.response?.data?.error || 'Failed to fetch requests');
      setRequests([]);
    } finally {
      setIsLoading(prev => ({ ...prev, fetch: false }));
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar positioned at the top left */}
      <StaffSidebar />

      {/* Main content area */}
      <div className="flex-1 p-6">
        {/* Header with professional gradient text */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-900 to-green-700">
            Staff Request Portal
          </h1>
          <p className="mt-2 text-gray-600">Efficient resource management system</p>
        </div>

        {/* Notification system */}
        <div className="fixed top-4 right-4 z-50 space-y-3 w-80">
          {notifications.map(notification => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg shadow-lg border-l-4 ${
                notification.type === 'success' ? 'border-emerald-500 bg-emerald-50' :
                'border-rose-500 bg-rose-50'
              }`}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  {notification.type === 'success' ? (
                    <svg className="h-5 w-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-rose-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">
                    {notification.message}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main content card - positioned optimally */}
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          {/* Tab navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('request')}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === 'request' 
                    ? 'border-b-2 border-green-700 text-green-700' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                New Request
              </button>
              <button
                onClick={() => setActiveTab('status')}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === 'status' 
                    ? 'border-b-2 border-green-700 text-green-700' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Request Status
              </button>
            </nav>
          </div>

          {/* Tab content */}
          <div className="p-6">
            {activeTab === 'request' ? (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800">New Resource Request</h2>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700">
                      Employee ID
                    </label>
                    <input
                      id="employeeId"
                      name="employeeId"
                      type="text"
                      value={formData.employeeId}
                      onChange={handleInputChange}
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                      required
                      placeholder="EMP-12345"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label htmlFor="itemId" className="block text-sm font-medium text-gray-700">
                        Item ID
                      </label>
                      <input
                        id="itemId"
                        name="itemId"
                        type="text"
                        value={formData.itemId}
                        onChange={handleInputChange}
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                        required
                        placeholder="ITM-001"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                        Quantity
                      </label>
                      <input
                        id="quantity"
                        name="quantity"
                        type="number"
                        min="1"
                        value={formData.quantity}
                        onChange={handleInputChange}
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                        required
                        placeholder="1-100"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="itemName" className="block text-sm font-medium text-gray-700">
                      Item Description
                    </label>
                    <input
                      id="itemName"
                      name="itemName"
                      type="text"
                      value={formData.itemName}
                      onChange={handleInputChange}
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                      required
                      placeholder="Detailed description of the item"
                    />
                  </div>
                  
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isLoading.submit}
                      className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
                        isLoading.submit ? 'opacity-75 cursor-not-allowed' : ''
                      }`}
                    >
                      {isLoading.submit ? 'Processing...' : 'Submit Request'}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800">Request Status</h2>
                
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1">
                      <label htmlFor="statusEmployeeId" className="sr-only">Employee ID</label>
                      <input
                        id="statusEmployeeId"
                        name="employeeId"
                        type="text"
                        value={formData.employeeId}
                        onChange={handleInputChange}
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                        placeholder="Enter your Employee ID"
                      />
                    </div>
                    <button
                      onClick={fetchRequests}
                      disabled={isLoading.fetch || !formData.employeeId}
                      className={`py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
                        isLoading.fetch || !formData.employeeId ? 'opacity-75 cursor-not-allowed' : ''
                      }`}
                    >
                      {isLoading.fetch ? 'Fetching...' : 'Check Status'}
                    </button>
                  </div>
                  
                  {isLoading.fetch ? (
                    <div className="flex justify-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
                    </div>
                  ) : error ? (
                    <div className="p-4 bg-rose-50 border-l-4 border-rose-500 text-rose-800 rounded-md">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-rose-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium">{error}</p>
                        </div>
                      </div>
                    </div>
                  ) : requests.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <h3 className="mt-2 text-sm font-medium text-gray-900">
                        {formData.employeeId ? 
                          `No requests found for ${formData.employeeId}` : 
                          'Enter your Employee ID to view requests'
                        }
                      </h3>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {requests.map((request) => (
                        <div 
                          key={request.request_id} 
                          className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <div className="mb-3 sm:mb-0">
                              <h3 className="text-lg font-medium text-gray-900">Request #{request.request_id}</h3>
                              <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
                                <div>Item: <span className="font-medium">{request.item_name}</span></div>
                                <div>Qty: <span className="font-medium">{request.quantity}</span></div>
                                <div>Submitted: <span className="font-medium">{new Date(request.created_at).toLocaleDateString()}</span></div>
                              </div>
                            </div>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              request.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                              request.status === 'Accepted' ? 'bg-emerald-100 text-emerald-800' :
                              'bg-rose-100 text-rose-800'
                            }`}>
                              {request.status}
                            </span>
                          </div>
                          
                          {request.dept_comment && (
                            <div className="mt-3 pt-3 border-t border-gray-100">
                              <p className="text-sm text-gray-600">
                                <span className="font-medium">Admin Note:</span> {request.dept_comment}
                              </p>
                            </div>
                          )}
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