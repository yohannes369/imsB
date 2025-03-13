// import React from 'react';

// function AdminDashboard() {
//   // Logout function with confirmation
//   const logout = () => {
//     const confirmLogout = window.confirm("Are you sure you want to logout?");
//     if (confirmLogout) {
//       localStorage.removeItem("token");
//       window.location.href = "/"; // Redirect to login page
//     }
//   };

//   return (
//     <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
//       <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      
//       <button
//         onClick={logout}
//         className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//       >
//         Logout
//       </button>
//     </div>
//   );
// }

// export default AdminDashboard;

import React from "react";
import Logout from "../logout/Logout";
import FetchDataComponent from "./fetch";

const AdminDashboard = ({ onLogout }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-tr from-purple-100 via-teal-100 to-blue-100 p-6 animate-bg-shift">
      <div className="max-w-6xl mx-auto flex-grow flex flex-col relative">
        <div className="absolute top-4 right-4">
          <Logout onLogout={onLogout} />
        </div>
        <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-teal-500 to-blue-600 mb-8">
          Admin Dashboard
        </h1>
        <div className="w-full bg-white shadow-2xl rounded-3xl p-6 flex-grow">
          <FetchDataComponent />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;