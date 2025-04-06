// import React, { useState } from "react";
// import { FiMenu, FiX, FiBell, FiUserPlus, FiFileText } from "react-icons/fi";
// import Logout from "../logout/Logout";
// import DepartmentPage from "./DepartmentPage";
// import defaultProfilePhoto from "../../assets/bu.jpg";

// const Department = ({ onLogout }) => {
//   const [departmentProfile, setDepartmentProfile] = useState(() => {
//     const savedProfile = localStorage.getItem("departmentProfile");
//     return savedProfile
//       ? JSON.parse(savedProfile)
//       : { name: "Department Head", profilePhoto: defaultProfilePhoto };
//   });

//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [newProfilePhoto, setNewProfilePhoto] = useState(null);
//   const [newProfileName, setNewProfileName] = useState(departmentProfile.name);
//   const [notifications, setNotifications] = useState([
//     "New report uploaded.",
//     "Meeting scheduled at 3 PM.",
//     "Employee leave request pending.",
//   ]);

//   const handleEditProfile = () => {
//     if (newProfilePhoto && !["image/jpeg", "image/png"].includes(newProfilePhoto.type)) {
//       alert("Please upload a valid image file (JPEG or PNG).");
//       return;
//     }

//     const updatedProfile = {
//       name: newProfileName,
//       profilePhoto: newProfilePhoto
//         ? URL.createObjectURL(newProfilePhoto)
//         : departmentProfile.profilePhoto,
//     };
//     setDepartmentProfile(updatedProfile);
//     localStorage.setItem("departmentProfile", JSON.stringify(updatedProfile));
//     setShowEditModal(false);
//   };

//   return (
//     <div className="min-h-screen flex bg-gradient-to-tr from-purple-100 via-teal-100 to-blue-100">
//       {/* Mobile Menu Toggle */}
//       <button
//         className="md:hidden fixed top-4 left-4 z-50 p-2 bg-teal-600 text-white rounded-md shadow-lg"
//         onClick={() => setSidebarOpen(!sidebarOpen)}
//         aria-label="Toggle Sidebar"
//       >
//         {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
//       </button>

//       {/* Sidebar */}
//       <div
//         className={`fixed md:static inset-y-0 left-0 w-64 bg-white shadow-xl p-6 flex flex-col transform ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } md:translate-x-0 transition-transform duration-300 ease-in-out z-40`}
//       >
//         <div className="flex flex-col items-center mb-8">
//           {/* Profile Photo Section */}
//           <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-teal-500 shadow-md">
//             <img
//               src={departmentProfile.profilePhoto}
//               alt="Department Profile"
//               className="w-full h-full object-cover"
//             />
//           </div>
//           <h2 className="text-xl font-bold text-gray-800 mt-4">{departmentProfile.name}</h2>
//           <button
//             onClick={() => setShowEditModal(true)}
//             className="text-sm text-teal-600 hover:text-teal-800 mt-2 underline"
//             aria-label="Edit Profile"
//           >
//             Edit Profile
//           </button>
//         </div>

//         {/* Notifications */}
//         <div className="mb-6">
//           <h3 className="text-lg font-semibold text-gray-800 mb-2">Notifications</h3>
//           <ul className="space-y-2">
//             {notifications.map((notification, index) => (
//               <li
//                 key={index}
//                 className="flex items-center text-gray-700 text-sm"
//               >
//                 <FiBell className="mr-2 text-teal-500" />
//                 {notification}
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div className="w-full">
//           <Logout onLogout={onLogout} />
//         </div>
//       </div>

//       {/* Overlay for Mobile */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* Main Content */}
//       <div className="flex-grow p-6 md:ml-64">
//         <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-teal-500 to-blue-600 mb-8">
//           Department Dashboard
//         </h1>

//         {/* Quick Actions */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <button className="bg-teal-600 hover:bg-teal-700 text-white py-4 px-6 rounded-lg shadow-md flex items-center justify-center space-x-2 transition duration-300 ease-in-out">
//             <FiUserPlus size={20} />
//             <span>Add New Employee</span>
//           </button>
//           <button className="bg-purple-600 hover:bg-purple-700 text-white py-4 px-6 rounded-lg shadow-md flex items-center justify-center space-x-2 transition duration-300 ease-in-out">
//             <FiFileText size={20} />
//             <span>View Reports</span>
//           </button>
//           <button className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-lg shadow-md flex items-center justify-center space-x-2 transition duration-300 ease-in-out">
//             <FiBell size={20} />
//             <span>Manage Notifications</span>
//           </button>
//         </div>

//         {/* Department Page */}
//         <div className="w-full bg-white shadow-2xl rounded-3xl p-8">
//           <DepartmentPage />
//         </div>
//       </div>

//       {/* Edit Profile Modal */}
//       {showEditModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
//             <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Profile</h2>
//             <div className="mb-6">
//               <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
//               <input
//                 type="text"
//                 value={newProfileName}
//                 onChange={(e) => setNewProfileName(e.target.value)}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
//                 placeholder="Enter your name"
//                 aria-label="Profile Name"
//               />
//             </div>
//             <div className="mb-6">
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Profile Photo
//               </label>
//               <input
//                 type="file"
//                 onChange={(e) => setNewProfilePhoto(e.target.files[0])}
//                 accept="image/*"
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
//                 aria-label="Upload Profile Photo"
//               />
//               {newProfilePhoto && (
//                 <div className="mt-4 flex justify-center">
//                   <img
//                     src={URL.createObjectURL(newProfilePhoto)}
//                     alt="Preview"
//                     className="w-24 h-24 rounded-full object-cover border-4 border-teal-500 shadow-md"
//                   />
//                 </div>
//               )}
//             </div>
//             <div className="flex space-x-4">
//               <button
//                 onClick={handleEditProfile}
//                 className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out"
//                 aria-label="Save Changes"
//               >
//                 Save
//               </button>
//               <button
//                 onClick={() => setShowEditModal(false)}
//                 className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out"
//                 aria-label="Cancel Editing"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Department;
// DepartmentPage.js

// Department.js

// Department.js
// Department.js









import React, { useState } from "react";
import Sidebar from "./side"; // Import the Sidebar component
import Depaactivity from "./depaactivity";
const Department = () => {
  // State for Sidebar Open/Closed
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // State for Department Profile (initialized from localStorage)
  const savedProfile = localStorage.getItem("departmentProfile");
  const initialProfile = savedProfile
    ? JSON.parse(savedProfile)
    : { name: "Department Head", profilePhoto: "https://via.placeholder.com/150" };

  const [departmentProfile, setDepartmentProfile] = useState(initialProfile);

  // State for Notifications
  const [notifications, setNotifications] = useState([
    "New report uploaded.",
    "Meeting scheduled at 3 PM.",
    "Employee leave request pending.",
  ]);

  // Function to handle logout
  const handleLogout = () => {
    alert("Logging out...");
    // Add your logout logic here
  };

  // State for Edit Profile Modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [newProfileName, setNewProfileName] = useState(departmentProfile.name);
  const [newProfilePhoto, setNewProfilePhoto] = useState(null);

  // Handle Save Changes in Edit Profile Modal
  const handleSaveChanges = () => {
    if (newProfilePhoto && !["image/jpeg", "image/png"].includes(newProfilePhoto.type)) {
      alert("Please upload a valid image file (JPEG or PNG).");
      return;
    }

    const updatedProfile = {
      name: newProfileName,
      profilePhoto: newProfilePhoto
        ? URL.createObjectURL(newProfilePhoto)
        : departmentProfile.profilePhoto,
    };

    // Update state and localStorage
    setDepartmentProfile(updatedProfile);
    localStorage.setItem("departmentProfile", JSON.stringify(updatedProfile));
    setShowEditModal(false);
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-teal-600 text-white rounded-md shadow-lg"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle Sidebar"
      >
        {sidebarOpen ? "Close" : "Menu"}
      </button>

      {/* Sidebar Component */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        departmentProfile={departmentProfile}
        notifications={notifications}
        onLogout={handleLogout}
        setShowEditModal={setShowEditModal}
      />

      {/* Overlay for Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-grow p-6">
        {/* Department Dashboard Title */}
        <div className="bg-green-950 rounded-2xl p-8 mb-6">
          <h1 className="text-4xl font-extrabold text-center text-white">
            Department Dashboard
          </h1>
        </div>
              <Depaactivity />
        {/* Rest of the Department Page Content */}
        <div className="bg-white shadow-2xl rounded-3xl p-8">
          <p className="text-lg text-gray-700">
      
          </p>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
            <h2 className="text-2xl font-bold text-green-950 mb-6">Edit Profile</h2>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-green-950 mb-2">Name</label>
              <input
                type="text"
                value={newProfileName}
                onChange={(e) => setNewProfileName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter your name"
                aria-label="Profile Name"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-green-950 mb-2">
                Profile Photo
              </label>
              <input
                type="file"
                onChange={(e) => setNewProfilePhoto(e.target.files[0])}
                accept="image/*"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                aria-label="Upload Profile Photo"
              />
              {newProfilePhoto && (
                <div className="mt-4 flex justify-center">
                  <img
                    src={URL.createObjectURL(newProfilePhoto)}
                    alt="Preview"
                    className="w-32 h-32 rounded-full object-cover border-4 border-teal-500 shadow-md"
                  />
                </div>
              )}
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleSaveChanges}
                className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out"
                aria-label="Save Changes"
              >
                Save
              </button>
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-green-950 py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out"
                aria-label="Cancel Editing"
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

export default Department;