// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const Not = () => {
//   const [employeeId, setEmployeeId] = useState(""); // State for employee ID
//   const [allRequests, setAllRequests] = useState([]); // State for storing ALL requests
//   const [filteredRequests, setFilteredRequests] = useState([]); // State for filtered requests
//   const [error, setError] = useState(null); // State for error messages
//   const [loading, setLoading] = useState(true); // State for loading spinner

//   // Function to fetch all requests from the backend
//   const fetchAllRequests = async () => {
//     try {
//       setLoading(true);
//       setError(null); // Clear previous errors

//       // Fetch all requests from the backend
//       const response = await axios.get("http://localhost:5000/api/requests");

//       setAllRequests(response.data); // Store all requests in state
//     } catch (err) {
//       console.error("Error fetching all requests:", err);
//       setError(err.response?.data?.message || "An error occurred while fetching data.");
//     } finally {
//       setLoading(false); // Stop loading spinner
//     }
//   };

//   // Function to filter requests locally based on employee ID
//   const filterRequestsByEmployeeId = () => {
//     if (!employeeId.trim()) {
//       setError("Please enter a valid Employee ID.");
//       setFilteredRequests([]);
//       return;
//     }

//     // Filter requests by the entered employee ID (case-sensitive match)
//     const filtered = allRequests.filter((request) => request.employee_id === employeeId);

//     if (filtered.length === 0) {
//       setError("No accepted requests found for this employee.");
//       setFilteredRequests([]);
//     } else {
//       setError(null); // Clear any previous errors
//       setFilteredRequests(filtered); // Update filtered requests
//     }
//   };

//   // Fetch all requests when the component mounts
//   useEffect(() => {
//     fetchAllRequests();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
//         {/* Header */}
//         <h1 className="text-3xl font-bold text-gray-800 mb-6">Accepted Requests</h1>

//         {/* Input Form */}
//         <div className="mb-6">
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Enter Employee ID:
//           </label>
//           <div className="flex space-x-4">
//             <input
//               type="text"
//               value={employeeId}
//               onChange={(e) => setEmployeeId(e.target.value)}
//               placeholder="Enter Employee ID"
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <button
//               onClick={filterRequestsByEmployeeId}
//               className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               Filter Requests
//             </button>
//           </div>
//         </div>

//         {/* Error Message */}
//         {error && (
//           <p className="text-red-500 text-center mb-6">{error}</p>
//         )}

//         {/* Display Filtered Requests */}
//         {filteredRequests.length > 0 ? (
//           <div>
//             <h2 className="text-xl font-semibold text-gray-800 mb-4">
//               Your Accepted Requests:
//             </h2>
//             <ul className="space-y-4">
//               {filteredRequests.map((request) => (
//                 <li key={request.request_id} className="p-4 border rounded-lg">
//                   <div>
//                     <p className="font-medium">Request ID: {request.request_id}</p>
//                     <p className="text-sm text-gray-600">Item Name: {request.item_name}</p>
//                     <p className="text-sm text-gray-600">Quantity: {request.quantity}</p>
//                     <p className="text-sm text-gray-600">Status: {request.status}</p>
//                     <p className="text-sm text-gray-600">
//                       Department Comment: {request.dept_comment || "None"}
//                     </p>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ) : (
//           // Show a message if no filtered requests are displayed
//           <p className="text-gray-600 text-center">Enter an Employee ID to filter requests.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Not;


import { useState, useEffect } from "react";
import axios from "axios";
import {
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiSearch,
  FiUser,
  FiPackage,
  FiHash,
  FiMessageSquare,
  FiChevronLeft,
  FiChevronRight
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const Not = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [allRequests, setAllRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const requestsPerPage = 5;

  const statusIcons = {
    Accepted: <FiCheckCircle className="text-green-500" />,
    Rejected: <FiXCircle className="text-red-500" />,
    Pending: <FiClock className="text-amber-500" />,
  };

  const statusColors = {
    Accepted: "bg-green-100 text-green-800",
    Rejected: "bg-red-100 text-red-800",
    Pending: "bg-amber-100 text-amber-800",
  };

  const fetchAllRequests = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get("http://localhost:5000/api/requests");
      const sorted = response.data.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setAllRequests(sorted);
    } catch (err) {
      console.error("Error fetching all requests:", err);
      setError(
        err.response?.data?.message || "Failed to load requests. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const filterRequestsByEmployeeId = () => {
    if (!employeeId.trim()) {
      setError("Please enter a valid Employee ID");
      setFilteredRequests([]);
      return;
    }

    const filtered = allRequests.filter(
      (request) => request.employee_id === employeeId
    );

    if (filtered.length === 0) {
      setError("No requests found for this employee");
    } else {
      setError(null);
    }

    setCurrentPage(1);
    setFilteredRequests(filtered);
  };

  useEffect(() => {
    fetchAllRequests();
  }, []);

  const indexOfLast = currentPage * requestsPerPage;
  const indexOfFirst = indexOfLast - requestsPerPage;
  const currentRequests = filteredRequests.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredRequests.length / requestsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Request Status Portal</h1>
          <p className="text-gray-600">Track your resource request status</p>
        </motion.div>

        <motion.div
          initial={{ scale: 0.98, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-md p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiUser className="text-gray-400" />
              </div>
              <input
                type="text"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                placeholder="Employee ID (e.g. EMP123)"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              />
            </div>
            <button
              onClick={filterRequestsByEmployeeId}
              disabled={loading}
              className="flex items-center justify-center px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiSearch className="mr-2" />
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </motion.div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg"
            >
              <div className="flex">
                <div className="flex-shrink-0">
                  <FiXCircle className="h-5 w-5 text-red-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {loading && (
          <div className="flex justify-center py-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"
            />
          </div>
        )}

        {currentRequests.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FiPackage className="mr-2 text-blue-500" />
              Your Request Status
            </h2>

            {currentRequests.map((request) => (
              <motion.div
                key={request.request_id}
                variants={itemVariants}
                whileHover={{ y: -3 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-all duration-300"
              >
                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center mb-2">
                        <FiHash className="text-gray-400 mr-2" />
                        <span className="font-medium text-gray-900">
                          Request #{request.request_id}
                        </span>
                      </div>
                      <div className="flex items-center mb-1 text-sm text-gray-600">
                        <FiPackage className="mr-2" />
                        {request.item_name} (Qty: {request.quantity})
                      </div>
                      {request.dept_comment && (
                        <div className="flex items-start mt-2 text-sm text-gray-600">
                          <FiMessageSquare className="flex-shrink-0 mr-2 mt-0.5" />
                          <span>Note: {request.dept_comment}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-end">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusColors[request.status]}`}>
                        {statusIcons[request.status]}
                        <span className="ml-1">{request.status}</span>
                      </span>
                      <span className="text-xs text-gray-500 mt-2">
                        {new Date(request.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-6 space-x-2">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
                >
                  <FiChevronLeft />
                </button>

                {[...Array(totalPages).keys()].map((num) => (
                  <button
                    key={num + 1}
                    onClick={() => paginate(num + 1)}
                    className={`px-3 py-1 rounded ${currentPage === num + 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                      }`}
                  >
                    {num + 1}
                  </button>
                ))}

                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
                >
                  <FiChevronRight />
                </button>
              </div>
            )}
          </motion.div>
        ) : (
          !loading && !error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center py-12 bg-white rounded-xl shadow-sm"
            >
              <FiSearch className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                No requests to display
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Enter an employee ID to view their requests
              </p>
            </motion.div>
          )
        )}
      </div>
    </motion.div>
  );
};

export default Not;
