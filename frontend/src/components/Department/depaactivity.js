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
  FiMinus,
  FiBarChart2,
  FiActivity,
  FiPieChart,
  FiRefreshCw
} from "react-icons/fi";
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import Logout from "../logout/Logout";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Depaactivity = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [notification, setNotification] = useState("");
  const [comment, setComment] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [statusFilter, setStatusFilter] = useState("Pending");
  const [currentPage, setCurrentPage] = useState(1);
  const [requestsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeChart, setActiveChart] = useState("bar");
  const [isLoading, setIsLoading] = useState(false);

  // Statistics
  const [stats, setStats] = useState({
    pending: 0,
    accepted: 0,
    declined: 0
  });

  // Recent activity
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  useEffect(() => {
    filterRequests();
    calculateStats();
  }, [requests, statusFilter, searchTerm]);

  const fetchRequests = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/requests");
      setRequests(res.data);
      
      // Simulate activity log - in a real app, this would come from the backend
      const newActivity = {
        id: Date.now(),
        action: "Data refreshed",
        timestamp: new Date().toISOString(),
        details: `Fetched ${res.data.length} requests`
      };
      setActivities(prev => [newActivity, ...prev].slice(0, 5));
    } catch (error) {
      console.error("Error fetching requests:", error);
      setNotification("Failed to fetch requests");
      setTimeout(() => setNotification(""), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateStats = () => {
    const pending = requests.filter(req => req.status === "Pending").length;
    const accepted = requests.filter(req => req.status === "Accepted").length;
    const declined = requests.filter(req => req.status === "Declined").length;
    
    setStats({
      pending,
      accepted,
      declined,
      total: pending + accepted + declined
    });
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
      
      const actionText = status === "Accepted" ? "approved" : "rejected";
      const newActivity = {
        id: Date.now(),
        action: `Request ${actionText}`,
        timestamp: new Date().toISOString(),
        details: `Request ID: ${requestId} was ${actionText}`
      };
      setActivities(prev => [newActivity, ...prev].slice(0, 5));
      
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

  // Chart data
  const chartData = {
    labels: ['Pending', 'Accepted', 'Declined'],
    datasets: [
      {
        label: 'Requests',
        data: [stats.pending, stats.accepted, stats.declined],
        backgroundColor: [
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(255, 99, 132, 0.7)'
        ],
        borderColor: [
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 md:px-12 lg:px-24">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-950 via-teal-700 to-green-500">
          Department Requests Dashboard
        </h1>
        <p className="mt-2 text-lg text-green-950">Manage and track all department requests</p>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Pending Card */}
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-gray-500 text-sm font-medium">Pending Requests</h3>
              <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <FiClock size={24} />
            </div>
          </div>
          <p className="mt-2 text-xs text-gray-500">Awaiting your review</p>
        </div>

        {/* Accepted Card */}
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-gray-500 text-sm font-medium">Accepted Requests</h3>
              <p className="text-3xl font-bold text-green-600">{stats.accepted}</p>
            </div>
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <FiCheck size={24} />
            </div>
          </div>
          <p className="mt-2 text-xs text-gray-500">Approved this period</p>
        </div>

        {/* Declined Card */}
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-gray-500 text-sm font-medium">Declined Requests</h3>
              <p className="text-3xl font-bold text-red-600">{stats.declined}</p>
            </div>
            <div className="p-3 rounded-full bg-red-100 text-red-600">
              <FiX size={24} />
            </div>
          </div>
          <p className="mt-2 text-xs text-gray-500">Not approved</p>
        </div>
      </div>

      {/* Charts and Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Chart Section */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-green-950 flex items-center">
              <FiBarChart2 className="mr-2" /> Requests Overview
            </h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveChart("bar")}
                className={`p-2 rounded-lg ${activeChart === "bar" ? 'bg-green-950 text-white' : 'bg-gray-200'}`}
                title="Bar Chart"
              >
                <FiBarChart2 size={18} />
              </button>
              <button
                onClick={() => setActiveChart("pie")}
                className={`p-2 rounded-lg ${activeChart === "pie" ? 'bg-green-950 text-white' : 'bg-gray-200'}`}
                title="Pie Chart"
              >
                <FiPieChart size={18} />
              </button>
            </div>
          </div>
          
          <div className="h-64">
            {activeChart === "bar" ? (
              <Bar 
                data={chartData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                  },
                }}
              />
            ) : (
              <Pie 
                data={chartData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                  },
                }}
              />
            )}
          </div>
        </div>

        {/* Activity Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-green-950 flex items-center">
              <FiActivity className="mr-2" /> Recent Activity
            </h2>
            <button 
              onClick={fetchRequests}
              className="p-2 rounded-lg bg-gray-200 hover:bg-green-950 hover:text-white transition-colors"
              title="Refresh"
            >
              <FiRefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
            </button>
          </div>
          
          <div className="space-y-4">
            {activities.length > 0 ? (
              activities.map(activity => (
                <div key={activity.id} className="flex items-start pb-4 border-b border-gray-100 last:border-0">
                  <div className="p-2 bg-green-100 rounded-full mr-3 text-green-600">
                    <FiActivity size={14} />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-green-950">{activity.action}</p>
                    <p className="text-xs text-gray-500">{new Date(activity.timestamp).toLocaleString()}</p>
                    <p className="text-xs mt-1 text-gray-600">{activity.details}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-4">
                No recent activities found
              </div>
            )}
          </div>
        </div>
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

export default Depaactivity;