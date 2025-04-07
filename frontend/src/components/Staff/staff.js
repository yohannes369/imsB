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
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);

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
    setIsLoading(true);
    
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
    } catch (error) {
      const errorMsg = error.response?.data?.error || 'Error creating request. Please try again.';
      showNotification(errorMsg, 'error');
      console.error('Error creating request:', error);
    } finally {
      setIsLoading(false);
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
          <p className="mt-2 text-gray-600">Submit resource requests</p>
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
          {/* Form content */}
          <div className="p-6">
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
                    disabled={isLoading}
                    className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
                      isLoading ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                  >
                    {isLoading ? 'Processing...' : 'Submit Request'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Staff;