// import React from 'react'
// // import AddItem from '../clerk/f'
// import ItemList from '../clerk/itemlist'
// function Cl() {
//   return (
//     <div>well coemclerk
//       {/* <AddItem /> */}
//     {/* <AddItem /> */}
//     <ItemList />
//     </div>
//   )
// }

import React from 'react';
import ItemList from '../clerk/itemlist';
// import AddItem from '../clerk/f'; // Uncomment if you want to include AddItem later
import { FaUser, FaCog, FaBell, FaShieldAlt } from 'react-icons/fa'; // Import icons from React Icons

function Cl() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 relative">
      {/* Header Section */}
      <div className="bg-teal-600 text-white py-6 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl md:text-3xl font-bold">Welcome, Clerk!</h1>
          <p className="mt-2 text-sm md:text-base">Manage your inventory efficiently</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Uncomment the following if you want to include AddItem */}
          {/* <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Item</h2>
            <AddItem />
          </div> */}

          {/* Item List Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Inventory List</h2>
            <ItemList />
          </div>
        </div>
      </div>

      {/* Sidebar with Settings and Profile */}
      <div className="fixed top-0 left-0 w-48 bg-teal-600 text-white p-6 rounded-md shadow-lg z-10 md:left-0 md:w-48 lg:left-0 lg:w-48 h-screen overflow-y-auto">
        {/* Sidebar Header */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Settings</h2>
        </div>

        {/* Sidebar Menu Items */}
        <ul className="space-y-4">
          <li>
            <button className="flex items-center hover:text-teal-300 w-full">
              <FaUser className="mr-2" /> Profile
            </button>
          </li>
          <li>
            <button className="flex items-center hover:text-teal-300 w-full">
              <FaCog className="mr-2" /> Account Settings
            </button>
          </li>
          <li>
            <button className="flex items-center hover:text-teal-300 w-full">
              <FaBell className="mr-2" /> Notifications
            </button>
          </li>
          <li>
            <button className="flex items-center hover:text-teal-300 w-full">
              <FaShieldAlt className="mr-2" /> Security
            </button>
          </li>
          {/* Add more items to test scrolling */}
          <li>
            <button className="flex items-center hover:text-teal-300 w-full">
              <FaUser className="mr-2" /> Additional Item 1
            </button>
          </li>
          <li>
            <button className="flex items-center hover:text-teal-300 w-full">
              <FaUser className="mr-2" /> Additional Item 2
            </button>
          </li>
          <li>
            <button className="flex items-center hover:text-teal-300 w-full">
              <FaUser className="mr-2" /> Additional Item 3
            </button>
          </li>
       
          <li>
            <button className="flex items-center hover:text-teal-300 w-full">
              <FaUser className="mr-2" /> Additional Item 5
            </button>
          </li>
         
        </ul>

        {/* Sidebar Footer (optional) */}
        <div className="sticky bottom-0 left-0 w-full text-center bg-teal-600 py-2">
          <p className="text-sm">Version 1.0.0</p>
        </div>
      </div>
    </div>
  );
}

export default Cl;







