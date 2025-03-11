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
import Logout from "../logout/Logout"; // Importing the Logout component
import FetchDataComponent from "../Admin/fetch";
const AdminDashboard = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <FetchDataComponent />
   
      <Logout />
    </div>
  );
};

export default AdminDashboard;
