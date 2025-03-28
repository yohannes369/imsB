
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FaUserPlus, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import Loader from "./Loader";

// const FetchDataComponent = () => {
//   const [data, setData] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [itemToDelete, setItemToDelete] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const token = localStorage.getItem("token");
//         if (!token) {
//           setError("Unauthorized. Please log in.");
//           return;
//         }

//         const response = await axios.get("http://localhost:5000/api/auth/fetchData", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         setData(response.data);
//       } catch (error) {
//         setError("Error fetching data");
//         console.error("Fetch error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleDeleteClick = (id) => {
//     setItemToDelete(id);
//     setShowConfirm(true);
//   };

//   const deleteItem = async (id) => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem("token");
//       if (!token) {
//         setError("Please log in");
//         return;
//       }

//       await axios.delete(`http://localhost:5000/api/auth/deleteUser/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setData((prevData) => prevData.filter((user) => user.id !== id));
//       setShowConfirm(false);
//     } catch (error) {
//       setError("Error deleting user");
//       console.error("Delete error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const navigateToAddItem = (e) => {
//     e.preventDefault(); // Prevent any default behavior
//     e.stopPropagation(); // Stop event bubbling
//     navigate("/add");
//   };

//   if (loading) return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-400 to-pink-500">
//       <div className="text-center text-white py-12 text-3xl font-extrabold animate-spin-and-bounce">
//         <span className="inline-block animate-spin">🌟</span> Loading Users...
//       </div>
//     </div>
//   );

//   if (error) return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-400 to-orange-500">
//       <div className="text-center text-white py-12 text-2xl font-bold bg-red-700 bg-opacity-80 rounded-xl px-8 animate-wobble">
//         Error: {error}
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-tr from-purple-100 via-teal-100 to-blue-100 p-6 animate-bg-shift">
//       <div className="max-w-6xl mx-auto">
//         {/* Header Section */}
//         <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-6 rounded-2xl shadow-2xl mb-8 transform hover:scale-[1.03] transition-all duration-500 animate-float">
//           <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-teal-500 to-blue-600 mb-4 sm:mb-0 animate-text-glow">
//             Users Management
//           </h2>
//           <button
//             onClick={navigateToAddItem}
//             className="group flex items-center bg-gradient-to-r from-purple-600 via-teal-500 to-blue-600 hover:from-purple-700 hover:via-teal-600 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 animate-pulse-slow"
//           >
//             <FaPlus className="mr-2 group-hover:animate-spin-and-grow transition-all duration-300" />
//             Add User
//           </button>
//         </div>

//         {/* No Data Message */}
//         {data.length === 0 ? (
//           <div className="text-center text-gray-700 bg-white p-12 rounded-2xl shadow-xl animate-bounce-in">
//             <p className="text-2xl font-bold animate-text-pulse">No users available 😢</p>
//           </div>
//         ) : (
//           /* Table Section */
//           <div className="overflow-x-auto rounded-2xl shadow-2xl bg-white border border-purple-200 animate-fade-in-up">
//             <table className="min-w-full">
//               <thead className="bg-gradient-to-r from-purple-100 via-teal-100 to-blue-100 text-purple-900">
//                 <tr>
//                   {["First Name", "Last Name", "Email", "Role", "Phone Number", "Actions"].map((header) => (
//                     <th
//                       key={header}
//                       className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-widest animate-header-glow"
//                     >
//                       {header}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-300">
//                 {data.map((user) => (
//                   <tr
//                     key={user.id}
//                     className="group hover:bg-gradient-to-r hover:from-purple-50 hover:via-teal-50 hover:to-blue-50 transition-all duration-300 transform hover:scale-[1.01] animate-row-slide"
//                   >
//                     <td className="py-4 px-6 text-sm text-gray-900 animate-cell-pop">{user.first_name}</td>
//                     <td className="py-4 px-6 text-sm text-gray-900 animate-cell-pop">{user.last_name}</td>
//                     <td className="py-4 px-6 text-sm text-gray-900 animate-cell-pop">{user.email}</td>
//                     <td className="py-4 px-6 text-sm text-gray-900 animate-cell-pop">{user.role}</td>
//                     <td className="py-4 px-6 text-sm text-gray-900 animate-cell-pop">{user.phone_number}</td>
//                     <td className="py-4 px-6 text-sm">
//                       <div className="flex space-x-4">
//                         <Link
//                           to={`/edit/${user.id}`}
//                           onClick={(e) => e.stopPropagation()} // Prevent row click interference
//                           className="focus:outline-none"
//                         >
//                           <button
//                             className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-full shadow-md transition-all duration-300 transform hover:scale-125 hover:rotate-45 animate-wiggle"
//                             aria-label="Edit User"
//                           >
//                             <FaEdit size={20} />
//                           </button>
//                         </Link>
//                         <button
//                           onClick={() => handleDeleteClick(user.id)}
//                           className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-125 hover:-rotate-45 animate-bounce-slow"
//                           aria-label="Delete User"
//                         >
//                           <FaTrash size={18} />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* Confirmation Modal */}
//         {showConfirm && (
//           <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-zoom-in">
//             <div className="bg-gradient-to-br from-white to-gray-100 rounded-2xl shadow-3xl p-8 max-w-md w-full transform transition-all duration-500 animate-modal-explode">
//               <h3 className="text-2xl font-bold text-purple-700 mb-4 animate-text-flip">
//                 Confirm Deletion
//               </h3>
//               <p className="text-sm text-gray-700 mb-6 animate-text-pulse">
//                 Are you sure you want to delete this user? This action cannot be undone!
//               </p>
//               <div className="flex space-x-4">
//                 <button
//                   onClick={() => deleteItem(itemToDelete)}
//                   className="flex-1 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 animate-pulse-fast"
//                 >
//                   Delete
//                 </button>
//                 <button
//                   onClick={() => setShowConfirm(false)}
//                   className="flex-1 bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FetchDataComponent;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";

// const FetchDataComponent = () => {
//   const [data, setData] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [itemToDelete, setItemToDelete] = useState(null);
//   const navigate = useNavigate();

//   // Fetch all users
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const token = localStorage.getItem("token");
//         if (!token) {
//           setError("Unauthorized. Please log in.");
//           return;
//         }

//         const response = await axios.get("http://localhost:5000/api/auth/fetchData", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         setData(response.data);
//       } catch (error) {
//         setError("Error fetching data");
//         console.error("Fetch error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Delete user
//   const handleDeleteClick = (id) => {
//     setItemToDelete(id);
//     setShowConfirm(true);
//   };

//   const deleteItem = async (id) => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem("token");
//       if (!token) {
//         setError("Please log in");
//         return;
//       }

//       await axios.delete(`http://localhost:5000/api/auth/deleteUser/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setData((prevData) => prevData.filter((user) => user.employee_id !== id));
//       setShowConfirm(false);
//     } catch (error) {
//       setError("Error deleting user");
//       console.error("Delete error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Toggle user status (Activate/Deactivate)
//   const toggleStatus = async (id, currentStatus) => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem("token");
//       if (!token) {
//         setError("Please log in");
//         return;
//       }

//       const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
//       await axios.put(
//         `http://localhost:5000/api/auth/toggleStatus/${id}`,
//         { status: newStatus },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setData((prevData) =>
//         prevData.map((user) =>
//           user.employee_id === id ? { ...user, status: newStatus } : user
//         )
//       );
//     } catch (error) {
//       setError("Error updating user status");
//       console.error("Status toggle error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Navigate to Add User page
//   const navigateToAddItem = () => {
//     navigate("/add");
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div>
//       <h2>Users Management</h2>
//       <button onClick={navigateToAddItem}>Add User</button>

//       {data.length === 0 ? (
//         <p>No users available.</p>
//       ) : (
//         <table border="1">
//           <thead>
//             <tr>
//               <th>Employee ID</th>
//               <th>First Name</th>
//               <th>Last Name</th>
//               <th>Email</th>
//               <th>Role</th>
//               <th>Phone Number</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((user) => (
//               <tr key={user.employee_id}>
//                 <td>{user.employee_id}</td>
//                 <td>{user.first_name}</td>
//                 <td>{user.last_name}</td>
//                 <td>{user.email}</td>
//                 <td>{user.role}</td>
//                 <td>{user.phone_number}</td>
//                 <td>{user.status}</td>
//                 <td>
//                   <Link to={`/edit/${user.employee_id}`} onClick={(e) => e.stopPropagation()}>
//                     Edit
//                   </Link>
//                   <button onClick={() => toggleStatus(user.employee_id, user.status)}>
//                     {user.status === "Active" ? "Deactivate" : "Activate"}
//                   </button>
//                   <button onClick={() => handleDeleteClick(user.employee_id)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       {showConfirm && (
//         <div>
//           <p>Are you sure you want to delete this user?</p>
//           <button onClick={() => deleteItem(itemToDelete)}>Delete</button>
//           <button onClick={() => setShowConfirm(false)}>Cancel</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FetchDataComponent;


// correct one 

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import { FaUserPlus, FaEdit, FaTrash, FaPlus } from "react-icons/fa";

// const FetchDataComponent = () => {
//   const [data, setData] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [itemToDelete, setItemToDelete] = useState(null);
//   const navigate = useNavigate();

//   // Fetch all users
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const token = localStorage.getItem("token");
//         if (!token) {
//           setError("Unauthorized. Please log in.");
//           return;
//         }

//         const response = await axios.get("http://localhost:5000/api/auth/fetchData", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         setData(response.data);
//       } catch (error) {
//         setError("Error fetching data");
//         console.error("Fetch error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Delete user
//   const handleDeleteClick = (id) => {
//     setItemToDelete(id);
//     setShowConfirm(true);
//   };

//   const deleteItem = async (id) => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem("token");
//       if (!token) {
//         setError("Please log in");
//         return;
//       }

//       await axios.delete(`http://localhost:5000/api/auth/deleteUser/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setData((prevData) => prevData.filter((user) => user.employee_id !== id));
//       setShowConfirm(false);
//     } catch (error) {
//       setError("Error deleting user");
//       console.error("Delete error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Toggle user status (Activate/Deactivate)
//   const toggleStatus = async (id, currentStatus) => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem("token");
//       if (!token) {
//         setError("Please log in");
//         return;
//       }

//       const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
//       await axios.put(
//         `http://localhost:5000/api/auth/toggleStatus/${id}`,
//         { status: newStatus },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setData((prevData) =>
//         prevData.map((user) =>
//           user.employee_id === id ? { ...user, status: newStatus } : user
//         )
//       );
//     } catch (error) {
//       setError("Error updating user status");
//       console.error("Status toggle error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Navigate to Add User page
//   const navigateToAddItem = () => {
//     navigate("/add");
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div>
//       <h2>Users Management</h2>
//       <button onClick={navigateToAddItem}>Add User</button>

//       {data.length === 0 ? (
//         <p>No users available.</p>
//       ) : (
//         <table border="1">
//           <thead>
//             <tr>
//               <th>Employee ID</th>
//               <th>First Name</th>
//               <th>Last Name</th>
//               <th>Email</th>
//               <th>Role</th>
//               <th>Phone Number</th>
//               <th>Status</th>
//               <th>Profile Photo</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((user) => (
//               <tr key={user.employee_id}>
//                 <td>{user.employee_id}</td>
//                 <td>{user.first_name}</td>
//                 <td>{user.last_name}</td>
//                 <td>{user.email}</td>
//                 <td>{user.role}</td>
//                 <td>{user.phone_number}</td>
//                 <td>{user.status}</td>
//                 <td>
//                   {user.profile_photo ? (
//                     <img
//                       src={`http://localhost:5000${user.profile_photo}`}
//                       alt="Profile"
//                       style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "50%" }}
//                     />
//                   ) : (
//                     <FaUserPlus size={20} />
//                   )}
//                 </td>
//                 <td>
//                   <Link to={`/edit/${user.employee_id}`} onClick={(e) => e.stopPropagation()}>
//                     <button>Edit</button>
//                   </Link>
//                   <button onClick={() => toggleStatus(user.employee_id, user.status)}>
//                     {user.status === "Active" ? "Deactivate" : "Activate"}
//                   </button>
//                   <button onClick={() => handleDeleteClick(user.employee_id)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       {showConfirm && (
//         <div>
//           <p>Are you sure you want to delete this user?</p>
//           <button onClick={() => deleteItem(itemToDelete)}>Delete</button>
//           <button onClick={() => setShowConfirm(false)}>Cancel</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FetchDataComponent;
import React, { useState, useEffect, memo } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaUserPlus, FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const FetchDataComponent = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [totalUsers, setTotalUsers] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [inactiveUsers, setInactiveUsers] = useState(0);
  const navigate = useNavigate();

  // Fetch all users and calculate totals
  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized. Please log in.");

      const response = await axios.get("http://localhost:5000/api/auth/fetchData", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const users = response.data;
      setData(users);
      calculateTotals(users);
    } catch (err) {
      setError("Error fetching data");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Calculate totals for users
  const calculateTotals = (users) => {
    const total = users.length;
    const active = users.filter((user) => user.status === "Active").length;
    const inactive = total - active;

    setTotalUsers(total);
    setActiveUsers(active);
    setInactiveUsers(inactive);
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Delete user
  const handleDeleteClick = (id) => {
    setItemToDelete(id);
    setShowConfirm(true);
  };

  const deleteItem = async (id) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Please log in");

      await axios.delete(`http://localhost:5000/api/auth/deleteUser/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const updatedData = data.filter((user) => user.employee_id !== id);
      setData(updatedData);
      calculateTotals(updatedData);
      setShowConfirm(false);
    } catch (err) {
      setError("Error deleting user");
      console.error("Delete error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Toggle user status (Activate/Deactivate) with confirmation
  const toggleStatus = async (id, currentStatus) => {
    const confirmMessage =
      currentStatus === "Active"
        ? "Are you sure you want to deactivate this user?"
        : "Are you sure you want to activate this user?";

    const isConfirmed = window.confirm(confirmMessage); // Show confirmation dialog
    if (!isConfirmed) return; // Exit if user cancels

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Please log in");

      const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
      await axios.put(
        `http://localhost:5000/api/auth/toggleStatus/${id}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const updatedData = data.map((user) =>
        user.employee_id === id ? { ...user, status: newStatus } : user
      );
      setData(updatedData);
      calculateTotals(updatedData);
    } catch (err) {
      setError("Error updating user status");
      console.error("Status toggle error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Navigate to Add User page
  const navigateToAddItem = () => {
    navigate("/add");
  };

  // Skeleton loader for smooth transitions during loading
  if (loading) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {[1, 2, 3].map((index) => (
            <div
              key={index}
              className="bg-gray-300 animate-pulse p-6 rounded-lg shadow-lg"
            ></div>
          ))}
        </div>
        <div className="animate-pulse bg-gray-300 h-10 w-full rounded-lg mb-4"></div>
        <div className="animate-pulse bg-gray-300 h-64 w-full rounded-lg"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg font-semibold text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Dashboard Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-4xl font-bold mt-2">{totalUsers}</p>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-700 text-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold">Active Users</h3>
          <p className="text-4xl font-bold mt-2">{activeUsers}</p>
        </div>
        <div className="bg-gradient-to-r from-red-500 to-red-700 text-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold">Inactive Users</h3>
          <p className="text-4xl font-bold mt-2">{inactiveUsers}</p>
        </div>
      </div>

      {/* Users Management Section */}
      <h2 className="text-2xl font-bold mb-4">Users Management</h2>
      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300"
        onClick={navigateToAddItem}
      >
        <FaPlus className="inline-block mr-2" /> Add User
      </button>

      {data.length === 0 ? (
        <p className="text-center text-gray-600">No users available.</p>
      ) : (
        <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Employee ID</th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">First Name</th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Last Name</th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Email</th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Role</th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Phone Number</th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <tr
                key={user.employee_id}
                className="hover:bg-gray-100 transition-all duration-300"
              >
                <td className="py-3 px-6">{user.employee_id}</td>
                <td className="py-3 px-6">{user.first_name}</td>
                <td className="py-3 px-6">{user.last_name}</td>
                <td className="py-3 px-6">{user.email}</td>
                <td className="py-3 px-6">{user.role}</td>
                <td className="py-3 px-6">{user.phone_number}</td>
                <td className="py-3 px-6">{user.status}</td>
                <td className="py-3 px-6 flex space-x-2">
                  <Link to={`/edit/${user.employee_id}`} onClick={(e) => e.stopPropagation()}>
                    <button className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300">
                      <FaEdit />
                    </button>
                  </Link>
                  <button
                    className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all duration-300"
                    onClick={() => toggleStatus(user.employee_id, user.status)}
                  >
                    {user.status === "Active" ? "Deactivate" : "Activate"}
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300"
                    onClick={() => handleDeleteClick(user.employee_id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out">
            <p className="text-lg font-semibold mb-4">Are you sure you want to delete this user?</p>
            <div className="flex space-x-4">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300"
                onClick={() => deleteItem(itemToDelete)}
              >
                Delete
              </button>
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-300"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(FetchDataComponent);