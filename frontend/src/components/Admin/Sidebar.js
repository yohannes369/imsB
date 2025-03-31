import React from 'react';
import { FiBell, FiMenu, FiX } from "react-icons/fi";

const Sidebar = ({ adminProfile, setShowEditModal, sidebarOpen, setSidebarOpen }) => {
  return (
    <div className={`fixed md:static inset-y-0 left-0 w-64 bg-white shadow-lg p-6 flex flex-col transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition-transform duration-300 ease-in-out z-40`}>
      <div className="flex flex-col items-center mb-6">
        <img src={adminProfile.profilePhoto} alt="Admin Profile" className="w-20 h-20 rounded-full object-cover border-2 border-teal-500 mb-4" />
        <h2 className="text-xl font-bold text-gray-800">{adminProfile.name}</h2>
        <button onClick={() => setShowEditModal(true)} className="text-sm text-teal-600 hover:text-teal-800 mt-2">Edit Profile</button>
      </div>
      <div className="flex flex-col space-y-4 w-full">
        <button className="flex items-center py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all duration-200">
          <FiBell className="mr-2" /> Notifications
        </button>
        <button className="py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all duration-200">Logout</button>
      </div>
    </div>
  );
};

export default Sidebar;
