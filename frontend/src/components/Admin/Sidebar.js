// import React from 'react';
// import { FiBell, FiMenu, FiX } from "react-icons/fi";
// import FetchDataComponent from '../FetchDataComponent';
// const Sidebar = ({ adminProfile, setShowEditModal, sidebarOpen, setSidebarOpen }) => {
//   return (
//     <div className={`fixed md:static inset-y-0 left-0 w-64 bg-white shadow-lg p-6 flex flex-col transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition-transform duration-300 ease-in-out z-40`}>
//       <div className="flex flex-col items-center mb-6">
//         <img src={adminProfile.profilePhoto} alt="Admin Profile" className="w-20 h-20 rounded-full object-cover border-2 border-teal-500 mb-4" />
//         <h2 className="text-xl font-bold text-gray-800">{adminProfile.name}</h2>
//         <button onClick={() => setShowEditModal(true)} className="text-sm text-teal-600 hover:text-teal-800 mt-2">Edit Profile</button>
//       </div>
//       <div className="flex flex-col space-y-4 w-full">
//         <button className="flex items-center py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all duration-200">
//           <FiBell className="mr-2" /> Notifications
//         </button>
//         <button className="flex items-center py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all duration-200">
//           <FiBell className="mr-2" /> Notifications
//         </button>
//         <button className="py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all duration-200">Logout</button>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;


import React, { useState } from "react";
import { FiBell, FiMenu, FiX } from "react-icons/fi";
import { FaUsers } from "react-icons/fa"; // Import FaUsers for User Management
import { FaShoppingCart } from "react-icons/fa"; // Import FaShoppingCart for Orders
import { useNavigate } from 'react-router-dom';
import Logout from "../logout/Logout";


const Sidebar = ({ adminProfile, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-teal-600 text-white rounded-md"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed md:static inset-y-0 left-0 w-64 bg-white shadow-lg p-6 flex flex-col transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-40`}
      >
        <div className="flex flex-col items-center mb-6">
          <img
            src={adminProfile.profilePhoto}
            alt="Admin Profile"
            className="w-20 h-20 rounded-full object-cover border-2 border-teal-500 mb-4"
          />
          <h2 className="text-xl font-bold text-gray-800">{adminProfile.name}</h2>
          <button
            onClick={() => setSidebarOpen(true)} // Open ProfileModal logic can be added here
            className="text-sm text-teal-600 hover:text-teal-800 mt-2"
          >
            Edit Profile
          </button>
          
        </div>
        <div className="flex flex-col space-y-4 w-full">
          <button
            className="flex items-center py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all duration-200"
            onClick={() => alert("Notifications feature coming soon!")}
          >
            <FiBell className="mr-2" /> Notifications
          </button>
          <li>
            <button
              onClick={() => navigate('/fetch')} // Navigate to User Management
              className="flex items-center hover:text-green-900 w-full transition-colors duration-200"
            >
              <FaUsers className="mr-2" /> User Management
            </button>
          </li>
          <button
            className="flex items-center py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all duration-200"
            onClick={() => alert("Orders feature coming soon!")}
          >
            <FaShoppingCart className="mr-2" /> Orders
          </button>
          {/* <div className="w-full">
            <Logout onLogout={onLogout} />
          </div> */}
        </div>
      </div>

      {/* Overlay for Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

    </>
  );
};

export default Sidebar;
