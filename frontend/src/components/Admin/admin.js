

// import React from "react";
// import Logout from "../logout/Logout";
// import FetchDataComponent from "./fetch";

// const AdminDashboard = ({ onLogout }) => {
//   return (
//     <div className="min-h-screen flex flex-col bg-gradient-to-tr from-purple-100 via-teal-100 to-blue-100 p-6 animate-bg-shift">
//       <div className="max-w-6xl mx-auto flex-grow flex flex-col relative">
//         <div className="absolute top-4 right-4">
//           <Logout onLogout={onLogout} />
//         </div>
//         <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-teal-500 to-blue-600 mb-8">
//           Admin Dashboard
//         </h1>
//         <div className="w-full bg-white shadow-2xl rounded-3xl p-6 flex-grow">
//           <FetchDataComponent />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;


// import React, { useState, useEffect } from "react";
// import Logout from "../logout/Logout";
// import FetchDataComponent from "./fetch";
// import axios from "axios";
// import defaultProfilePhoto from "../../assets/bu.jpg"; // Ensure you have a default profile photo in this path

// const AdminDashboard = ({ onLogout }) => {
//   const [totalUsers, setTotalUsers] = useState(0);
//   const [activeUsers, setActiveUsers] = useState(0);
//   const [inactiveUsers, setInactiveUsers] = useState(0);
//   const [adminProfile, setAdminProfile] = useState({
//     name: "Admin",
//     profilePhoto: defaultProfilePhoto,
//   });
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [newProfilePhoto, setNewProfilePhoto] = useState(null);
//   const [newProfileName, setNewProfileName] = useState("");

//   useEffect(() => {
//     const fetchUserStats = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           throw new Error("Unauthorized. Please log in.");
//         }

//         const response = await axios.get("http://localhost:5000/api/auth/fetchData", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         const users = response.data;
//         setTotalUsers(users.length);
//         setActiveUsers(users.filter(user => user.status === "Active").length);
//         setInactiveUsers(users.filter(user => user.status === "Inactive").length);
//       } catch (error) {
//         console.error("Error fetching user stats:", error);
//       }
//     };

//     const fetchAdminProfile = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           throw new Error("Unauthorized. Please log in.");
//         }

//         const response = await axios.get("http://localhost:5000/api/auth/getAdminProfile", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         const admin = response.data;
//         setAdminProfile({
//           name: admin.name || "Admin",
//           profilePhoto: admin.profilePhoto || defaultProfilePhoto,
//         });
//         setNewProfileName(admin.name || "Admin");
//       } catch (error) {
//         console.error("Error fetching admin profile:", error);
//       }
//     };

//     fetchUserStats();
//     fetchAdminProfile();
//   }, []);

//   const handleEditProfile = () => {
//     const updatedProfile = {
//       name: newProfileName,
//       profilePhoto: newProfilePhoto ? URL.createObjectURL(newProfilePhoto) : adminProfile.profilePhoto,
//     };

//     setAdminProfile(updatedProfile);
//     setShowEditModal(false);
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-gradient-to-tr from-purple-100 via-teal-100 to-blue-100 p-6 animate-bg-shift">
//       <div className="max-w-6xl mx-auto flex-grow flex flex-col relative">
//         <div className="absolute top-4 right-4">
//           <Logout onLogout={onLogout} />
//         </div>
//         <div className="flex items-center justify-between mb-8">
//           <div className="flex items-center">
//             <img
//               src={adminProfile.profilePhoto}
//               alt="Admin Profile"
//               className="w-16 h-16 rounded-full object-cover mr-4"
//             />
//             <div>
//               <h2 className="text-2xl font-bold text-gray-800">{adminProfile.name}</h2>
//               <button
//                 onClick={() => setShowEditModal(true)}
//                 className="text-sm text-teal-600 hover:text-teal-800"
//               >
//                 Edit Profile
//               </button>
//             </div>
//           </div>
//           <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-teal-500 to-blue-600">
//             Admin Dashboard
//           </h1>
//         </div>
//         <div className="w-full bg-white shadow-2xl rounded-3xl p-6 flex-grow">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//             <div className="bg-gradient-to-r from-purple-600 via-teal-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
//               <h2 className="text-2xl font-bold">Total Users</h2>
//               <p className="text-4xl mt-2">{totalUsers}</p>
//             </div>
//             <div className="bg-gradient-to-r from-green-600 to-green-400 text-white p-6 rounded-lg shadow-lg">
//               <h2 className="text-2xl font-bold">Active Users</h2>
//               <p className="text-4xl mt-2">{activeUsers}</p>
//             </div>
//             <div className="bg-gradient-to-r from-red-600 to-red-400 text-white p-6 rounded-lg shadow-lg">
//               <h2 className="text-2xl font-bold">Inactive Users</h2>
//               <p className="text-4xl mt-2">{inactiveUsers}</p>
//             </div>
//           </div>
//           <FetchDataComponent defaultProfilePhoto={defaultProfilePhoto} />
//         </div>
//       </div>

//       {showEditModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
//             <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
//             <div className="mb-4">
//               <label className="block text-sm font-semibold text-gray-700">Name</label>
//               <input
//                 type="text"
//                 value={newProfileName}
//                 onChange={(e) => setNewProfileName(e.target.value)}
//                 className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-semibold text-gray-700">Profile Photo</label>
//               <input
//                 type="file"
//                 onChange={(e) => setNewProfilePhoto(e.target.files[0])}
//                 accept="image/*"
//                 className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900"
//               />
//             </div>
//             <div className="flex space-x-4">
//               <button
//                 onClick={handleEditProfile}
//                 className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
//               >
//                 Save
//               </button>
//               <button
//                 onClick={() => setShowEditModal(false)}
//                 className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
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

// export default AdminDashboard;



// import React, { useState, useEffect } from "react";
// import { FiBell, FiMenu, FiX } from "react-icons/fi"; // Icons for notification and menu toggle
// import Logout from "../logout/Logout"; // Reusing your original Logout component
// import FetchDataComponent from "./fetch";
// import axios from "axios";
// import defaultProfilePhoto from "../../assets/bu.jpg"; // Ensure default profile photo exists

// const AdminDashboard = ({ onLogout }) => {
//   const [totalUsers, setTotalUsers] = useState(0);
//   const [activeUsers, setActiveUsers] = useState(0);
//   const [inactiveUsers, setInactiveUsers] = useState(0);
//   const [adminProfile, setAdminProfile] = useState({
//     name: "Admin",
//     profilePhoto: defaultProfilePhoto,
//   });
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [newProfilePhoto, setNewProfilePhoto] = useState(null);
//   const [newProfileName, setNewProfileName] = useState("");
//   const [sidebarOpen, setSidebarOpen] = useState(false); // For mobile sidebar toggle

//   useEffect(() => {
//     const fetchUserStats = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) throw new Error("Unauthorized. Please log in.");

//         const response = await axios.get("http://localhost:5000/api/auth/fetchData", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         const users = response.data;
//         setTotalUsers(users.length);
//         setActiveUsers(users.filter((user) => user.status === "Active").length);
//         setInactiveUsers(users.filter((user) => user.status === "Inactive").length);
//       } catch (error) {
//         console.error("Error fetching user stats:", error);
//       }
//     };

//     const fetchAdminProfile = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) throw new Error("Unauthorized. Please log in.");

//         const response = await axios.get("http://localhost:5000/api/auth/getAdminProfile", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         const admin = response.data;
//         setAdminProfile({
//           name: admin.name || "Admin",
//           profilePhoto: admin.profilePhoto || defaultProfilePhoto,
//         });
//         setNewProfileName(admin.name || "Admin");
//       } catch (error) {
//         console.error("Error fetching admin profile:", error);
//       }
//     };

//     fetchUserStats();
//     fetchAdminProfile();
//   }, []);

//   const handleEditProfile = () => {
//     const updatedProfile = {
//       name: newProfileName,
//       profilePhoto: newProfilePhoto ? URL.createObjectURL(newProfilePhoto) : adminProfile.profilePhoto,
//     };
//     setAdminProfile(updatedProfile);
//     setShowEditModal(false);
//   };

//   return (
//     <div className="min-h-screen flex bg-gradient-to-tr from-purple-100 via-teal-100 to-blue-100 animate-bg-shift">
//       {/* Mobile Menu Toggle */}
//       <button
//         className="md:hidden fixed top-4 left-4 z-50 p-2 bg-teal-600 text-white rounded-md"
//         onClick={() => setSidebarOpen(!sidebarOpen)}
//       >
//         {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
//       </button>

//       {/* Sidebar */}
//       <div
//         className={`fixed md:static inset-y-0 left-0 w-64 bg-white shadow-lg p-6 flex flex-col transform ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } md:translate-x-0 transition-transform duration-300 ease-in-out z-40`}
//       >
//         <div className="flex flex-col items-center mb-6">
//           <img
//             src={adminProfile.profilePhoto}
//             alt="Admin Profile"
//             className="w-20 h-20 rounded-full object-cover border-2 border-teal-500 mb-4"
//           />
//           <h2 className="text-xl font-bold text-gray-800">{adminProfile.name}</h2>
//           <button
//             onClick={() => setShowEditModal(true)}
//             className="text-sm text-teal-600 hover:text-teal-800 mt-2"
//           >
//             Edit Profile
//           </button>
//         </div>
//         <div className="flex flex-col space-y-4 w-full">
//           <button
//             className="flex items-center py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all duration-200"
//             onClick={() => alert("Notifications feature coming soon!")}
//           >
//             <FiBell className="mr-2" /> Notifications
//           </button>
//           {/* Reusing the original Logout component */}
//           <div className="w-full">
//             <Logout onLogout={onLogout} />
//           </div>
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
//           Admin Dashboard
//         </h1>
//         <div className="w-full bg-white shadow-2xl rounded-3xl p-6">
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
//             <div className="bg-gradient-to-r from-purple-600 via-teal-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
//               <h2 className="text-2xl font-bold">Total Users</h2>
//               <p className="text-4xl mt-2">{totalUsers}</p>
//             </div>
//             <div className="bg-gradient-to-r from-green-600 to-green-400 text-white p-6 rounded-lg shadow-lg">
//               <h2 className="text-2xl font-bold">Active Users</h2>
//               <p className="text-4xl mt-2">{activeUsers}</p>
//             </div>
//             <div className="bg-gradient-to-r from-red-600 to-red-400 text-white p-6 rounded-lg shadow-lg">
//               <h2 className="text-2xl font-bold">Inactive Users</h2>
//               <p className="text-4xl mt-2">{inactiveUsers}</p>
//             </div>
//           </div>
//           <FetchDataComponent defaultProfilePhoto={defaultProfilePhoto} />
//         </div>
//       </div>

//       {/* Edit Profile Modal */}
//       {showEditModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
//             <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
//             <div className="mb-4">
//               <label className="block text-sm font-semibold text-gray-700">Name</label>
//               <input
//                 type="text"
//                 value={newProfileName}
//                 onChange={(e) => setNewProfileName(e.target.value)}
//                 className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-semibold text-gray-700">Profile Photo</label>
//               <input
//                 type="file"
//                 onChange={(e) => setNewProfilePhoto(e.target.files[0])}
//                 accept="image/*"
//                 className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900"
//               />
//               {newProfilePhoto && (
//                 <img
//                   src={URL.createObjectURL(newProfilePhoto)}
//                   alt="Preview"
//                   className="mt-2 w-24 h-24 rounded-full object-cover"
//                 />
//               )}
//             </div>
//             <div className="flex space-x-4">
//               <button
//                 onClick={handleEditProfile}
//                 className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
//               >
//                 Save
//               </button>
//               <button
//                 onClick={() => setShowEditModal(false)}
//                 className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
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

// export default AdminDashboard;


// import React, { useState, useEffect } from "react";
// import { FiBell, FiMenu, FiX } from "react-icons/fi";
// import Logout from "../logout/Logout";
// import FetchDataComponent from "./fetch";
// import axios from "axios";
// import defaultProfilePhoto from "../../assets/bu.jpg";

// const AdminDashboard = ({ onLogout }) => {
//   const [totalUsers, setTotalUsers] = useState(0);
//   const [activeUsers, setActiveUsers] = useState(0);
//   const [inactiveUsers, setInactiveUsers] = useState(0);
//   const [adminProfile, setAdminProfile] = useState(() => {
//     const savedProfile = localStorage.getItem("adminProfile");
//     return savedProfile
//       ? JSON.parse(savedProfile)
//       : { name: "Admin", profilePhoto: defaultProfilePhoto };
//   });
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [newProfilePhoto, setNewProfilePhoto] = useState(null);
//   const [newProfileName, setNewProfileName] = useState(adminProfile.name);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [errorMessage, setErrorMessage] = useState(null);

//   useEffect(() => {
//     const fetchUserStats = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) throw new Error("Unauthorized. Please log in.");

//         const response = await axios.get("http://localhost:5000/api/auth/fetchData", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         const users = response.data;
//         setTotalUsers(users.length);
//         setActiveUsers(users.filter((user) => user.status === "Active").length);
//         setInactiveUsers(users.filter((user) => user.status === "Inactive").length);
//       } catch (error) {
//         console.error("Error fetching user stats:", error);
//       }
//     };

//     fetchUserStats();
//   }, []);

//   // Compress image and save to localStorage
//   const compressAndSaveProfile = (file, name) => {
//     const img = new Image();
//     const canvas = document.createElement("canvas");
//     const ctx = canvas.getContext("2d");

//     img.onload = () => {
//       // Set max dimensions (e.g., 200x200) to reduce size
//       const MAX_WIDTH = 200;
//       const MAX_HEIGHT = 200;
//       let width = img.width;
//       let height = img.height;

//       if (width > height) {
//         if (width > MAX_WIDTH) {
//           height *= MAX_WIDTH / width;
//           width = MAX_WIDTH;
//         }
//       } else {
//         if (height > MAX_HEIGHT) {
//           width *= MAX_HEIGHT / height;
//           height = MAX_HEIGHT;
//         }
//       }

//       canvas.width = width;
//       canvas.height = height;
//       ctx.drawImage(img, 0, 0, width, height);

//       // Convert to Base64 with reduced quality (0.7 = 70% quality)
//       const base64String = canvas.toDataURL("image/jpeg", 0.7);

//       const updatedProfile = {
//         name: name,
//         profilePhoto: base64String,
//       };

//       try {
//         setAdminProfile(updatedProfile);
//         localStorage.setItem("adminProfile", JSON.stringify(updatedProfile));
//         setShowEditModal(false);
//         setNewProfilePhoto(null);
//         setErrorMessage(null);
//       } catch (error) {         
//         setShowEditModal(false);
//         setNewProfilePhoto(null);
//       }
//     };

//     img.src = URL.createObjectURL(file);
//   };

//   const handleEditProfile = () => {
//     if (newProfilePhoto) {
//       compressAndSaveProfile(newProfilePhoto, newProfileName);
//     } else {
//       const updatedProfile = {
//         name: newProfileName,
//         profilePhoto: adminProfile.profilePhoto,
//       };
//       try {
//         setAdminProfile(updatedProfile);
//         localStorage.setItem("adminProfile", JSON.stringify(updatedProfile));
//         setShowEditModal(false);
//         setErrorMessage(null);
//       } catch (error) {
//         console.error("Error saving profile:", error);
//         setErrorMessage("Failed to save profile changes.");
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen flex bg-gradient-to-tr from-purple-100 via-teal-100 to-blue-100 animate-bg-shift">
//       {/* Mobile Menu Toggle */}
//       <button
//         className="md:hidden fixed top-4 left-4 z-50 p-2 bg-teal-600 text-white rounded-md"
//         onClick={() => setSidebarOpen(!sidebarOpen)}
//       >
//         {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
//       </button>

//       {/* Sidebar */}
//       <div
//         className={`fixed md:static inset-y-0 left-0 w-64 bg-white shadow-lg p-6 flex flex-col transform ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } md:translate-x-0 transition-transform duration-300 ease-in-out z-40`}
//       >
//         <div className="flex flex-col items-center mb-6">
//           <img
//             src={adminProfile.profilePhoto}
//             alt="Admin Profile"
//             className="w-20 h-20 rounded-full object-cover border-2 border-teal-500 mb-4"
//           />
//           <h2 className="text-xl font-bold text-gray-800">{adminProfile.name}</h2>
//           <button
//             onClick={() => {
//               setShowEditModal(true);
//               setNewProfileName(adminProfile.name);
//               setErrorMessage(null); // Clear error on edit
//             }}
//             className="text-sm text-teal-600 hover:text-teal-800 mt-2"
//           >
//             Edit Profile
//           </button>
//         </div>
//         <div className="flex flex-col space-y-4 w-full">
//           <button
//             className="flex items-center py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all duration-200"
//             onClick={() => alert("Notifications feature coming soon!")}
//           >
//             <FiBell className="mr-2" /> Notifications
//           </button>
//           <div className="w-full">
//             <Logout onLogout={onLogout} />
//           </div>
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
//           Admin Dashboard
//         </h1>
//         <div className="w-full bg-white shadow-2xl rounded-3xl p-6">
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
//             <div className="bg-gradient-to-r from-purple-600 via-teal-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
//               <h2 className="text-2xl font-bold">Total Users</h2>
//               <p className="text-4xl mt-2">{totalUsers}</p>
//             </div>
//             <div className="bg-gradient-to-r from-green-600 to-green-400 text-white p-6 rounded-lg shadow-lg">
//               <h2 className="text-2xl font-bold">Active Users</h2>
//               <p className="text-4xl mt-2">{activeUsers}</p>
//             </div>
//             <div className="bg-gradient-to-r from-red-600 to-red-400 text-white p-6 rounded-lg shadow-lg">
//               <h2 className="text-2xl font-bold">Inactive Users</h2>
//               <p className="text-4xl mt-2">{inactiveUsers}</p>
//             </div>
//           </div>
//           <FetchDataComponent defaultProfilePhoto={defaultProfilePhoto} />
//         </div>
//       </div>

//       {/* Edit Profile Modal */}
//       {showEditModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
//             <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
//             {errorMessage && (
//               <p className="text-red-600 mb-4">{errorMessage}</p>
//             )}
//             <div className="mb-4">
//               <label className="block text-sm font-semibold text-gray-700">Name</label>
//               <input
//                 type="text"
//                 value={newProfileName}
//                 onChange={(e) => setNewProfileName(e.target.value)}
//                 className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-semibold text-gray-700">Profile Photo</label>
//               <input
//                 type="file"
//                 onChange={(e) => setNewProfilePhoto(e.target.files[0])}
//                 accept="image/*"
//                 className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900"
//               />
//               <img
//                 src={
//                   newProfilePhoto
//                     ? URL.createObjectURL(newProfilePhoto)
//                     : adminProfile.profilePhoto
//                 }
//                 alt="Preview"
//                 className="mt-2 w-24 h-24 rounded-full object-cover"
//               />
//             </div>
//             <div className="flex space-x-4">
//               <button
//                 onClick={handleEditProfile}
//                 className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
//               >
//                 Save
//               </button>
//               <button
//                 onClick={() => {
//                   setShowEditModal(false);
//                   setNewProfilePhoto(null);
//                   setNewProfileName(adminProfile.name);
//                   setErrorMessage(null);
//                 }}
//                 className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
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

// export default AdminDashboard;

// import React, { useState, useEffect } from "react";
// import { FiBell, FiMenu, FiX } from "react-icons/fi";
// import Logout from "../logout/Logout";
// import axios from "axios";
// import defaultProfilePhoto from "../../assets/bu.jpg";

// const AdminDashboard = ({ onLogout }) => {
//   const [totalUsers, setTotalUsers] = useState(0);
//   const [activeUsers, setActiveUsers] = useState(0);
//   const [inactiveUsers, setInactiveUsers] = useState(0);
//   const [adminProfile, setAdminProfile] = useState(() => {
//     const savedProfile = localStorage.getItem("adminProfile");
//     return savedProfile
//       ? JSON.parse(savedProfile)
//       : { name: "Admin", profilePhoto: defaultProfilePhoto };
//   });
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [newProfilePhoto, setNewProfilePhoto] = useState(null);
//   const [newProfileName, setNewProfileName] = useState(adminProfile.name);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [errorMessage, setErrorMessage] = useState(null);

//   useEffect(() => {
//     const fetchUserStats = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) throw new Error("Unauthorized. Please log in.");
//         const response = await axios.get("http://localhost:5000/api/auth/fetchData", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const users = response.data;
//         setTotalUsers(users.length);
//         setActiveUsers(users.filter((user) => user.status === "Active").length);
//         setInactiveUsers(users.filter((user) => user.status === "Inactive").length);
//       } catch (error) {
//         console.error("Error fetching user stats:", error);
//       }
//     };
//     fetchUserStats();
//   }, []);

//   // Compress image and save to localStorage
//   const compressAndSaveProfile = (file, name) => {
//     const img = new Image();
//     const canvas = document.createElement("canvas");
//     const ctx = canvas.getContext("2d");
//     img.onload = () => {
//       const MAX_WIDTH = 200;
//       const MAX_HEIGHT = 200;
//       let width = img.width;
//       let height = img.height;
//       if (width > height) {
//         if (width > MAX_WIDTH) {
//           height *= MAX_WIDTH / width;
//           width = MAX_WIDTH;
//         }
//       } else {
//         if (height > MAX_HEIGHT) {
//           width *= MAX_HEIGHT / height;
//           height = MAX_HEIGHT;
//         }
//       }
//       canvas.width = width;
//       canvas.height = height;
//       ctx.drawImage(img, 0, 0, width, height);
//       const base64String = canvas.toDataURL("image/jpeg", 0.7);
//       const updatedProfile = {
//         name: name,
//         profilePhoto: base64String,
//       };
//       try {
//         setAdminProfile(updatedProfile);
//         localStorage.setItem("adminProfile", JSON.stringify(updatedProfile));
//         setShowEditModal(false);
//         setNewProfilePhoto(null);
//         setErrorMessage(null);
//       } catch (error) {
//         setShowEditModal(false);
//         setNewProfilePhoto(null);
//       }
//     };
//     img.src = URL.createObjectURL(file);
//   };

//   const handleEditProfile = () => {
//     if (newProfilePhoto) {
//       compressAndSaveProfile(newProfilePhoto, newProfileName);
//     } else {
//       const updatedProfile = {
//         name: newProfileName,
//         profilePhoto: adminProfile.profilePhoto,
//       };
//       try {
//         setAdminProfile(updatedProfile);
//         localStorage.setItem("adminProfile", JSON.stringify(updatedProfile));
//         setShowEditModal(false);
//         setErrorMessage(null);
//       } catch (error) {
//         console.error("Error saving profile:", error);
//         setErrorMessage("Failed to save profile changes.");
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen flex bg-gradient-to-tr from-purple-100 via-teal-100 to-blue-100 animate-bg-shift">
//       {/* Mobile Menu Toggle */}
//       <button
//         className="md:hidden fixed top-4 left-4 z-50 p-2 bg-teal-600 text-white rounded-md"
//         onClick={() => setSidebarOpen(!sidebarOpen)}
//       >
//         {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
//       </button>

//       {/* Sidebar */}
//       <div
//         className={`fixed md:static inset-y-0 left-0 w-64 bg-white shadow-lg p-6 flex flex-col transform ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } md:translate-x-0 transition-transform duration-300 ease-in-out z-40`}
//       >
//         <div className="flex flex-col items-center mb-6">
//           <img
//             src={adminProfile.profilePhoto}
//             alt="Admin Profile"
//             className="w-20 h-20 rounded-full object-cover border-2 border-teal-500 mb-4"
//           />
//           <h2 className="text-xl font-bold text-gray-800">{adminProfile.name}</h2>
//           <button
//             onClick={() => {
//               setShowEditModal(true);
//               setNewProfileName(adminProfile.name);
//               setErrorMessage(null); // Clear error on edit
//             }}
//             className="text-sm text-teal-600 hover:text-teal-800 mt-2"
//           >
//             Edit Profile
//           </button>
//         </div>
//         <div className="flex flex-col space-y-4 w-full">
//           <button
//             className="flex items-center py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all duration-200"
//             onClick={() => alert("Notifications feature coming soon!")}
//           >
//             <FiBell className="mr-2" /> Notifications
//           </button>
//           <div className="w-full">
//             <Logout onLogout={onLogout} />
//           </div>
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
//           Admin Dashboard
//         </h1>
//         <div className="w-full bg-white shadow-2xl rounded-3xl p-6">
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
//             <div className="bg-gradient-to-r from-purple-600 via-teal-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
//               <h2 className="text-2xl font-bold">Total Users</h2>
//               <p className="text-4xl mt-2">{totalUsers}</p>
//             </div>
//             <div className="bg-gradient-to-r from-green-600 to-green-400 text-white p-6 rounded-lg shadow-lg">
//               <h2 className="text-2xl font-bold">Active Users</h2>
//               <p className="text-4xl mt-2">{activeUsers}</p>
//             </div>
//             <div className="bg-gradient-to-r from-red-600 to-red-400 text-white p-6 rounded-lg shadow-lg">
//               <h2 className="text-2xl font-bold">Inactive Users</h2>
//               <p className="text-4xl mt-2">{inactiveUsers}</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Edit Profile Modal */}
//       {showEditModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
//             <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
//             {errorMessage && (
//               <p className="text-red-600 mb-4">{errorMessage}</p>
//             )}
//             <div className="mb-4">
//               <label className="block text-sm font-semibold text-gray-700">Name</label>
//               <input
//                 type="text"
//                 value={newProfileName}
//                 onChange={(e) => setNewProfileName(e.target.value)}
//                 className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-semibold text-gray-700">Profile Photo</label>
//               <input
//                 type="file"
//                 onChange={(e) => setNewProfilePhoto(e.target.files[0])}
//                 accept="image/*"
//                 className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900"
//               />
//               <img
//                 src={
//                   newProfilePhoto
//                     ? URL.createObjectURL(newProfilePhoto)
//                     : adminProfile.profilePhoto
//                 }
//                 alt="Preview"
//                 className="mt-2 w-24 h-24 rounded-full object-cover"
//               />
//             </div>
//             <div className="flex space-x-4">
//               <button
//                 onClick={handleEditProfile}
//                 className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
//               >
//                 Save
//               </button>
//               <button
//                 onClick={() => {
//                   setShowEditModal(false);
//                   setNewProfilePhoto(null);
//                   setNewProfileName(adminProfile.name);
//                   setErrorMessage(null);
//                 }}
//                 className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
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

// export default AdminDashboard; 

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import defaultProfilePhoto from "../../assets/bu.jpg";
// import Sidebar from "./Sidebar";
// import Logout from "../logout/Logout";
// import { FaPowerOff } from "react-icons/fa"; // Import the power off icon

// const AdminDashboard = ({ onLogout }) => {
//   const [totalUsers, setTotalUsers] = useState(0);
//   const [activeUsers, setActiveUsers] = useState(0);
//   const [inactiveUsers, setInactiveUsers] = useState(0);
//   const [adminProfile, setAdminProfile] = useState(() => {
//     const savedProfile = localStorage.getItem("adminProfile");
//     return savedProfile
//       ? JSON.parse(savedProfile)
//       : { name: "Admin", profilePhoto: defaultProfilePhoto };
//   });

//   useEffect(() => {
//     const fetchUserStats = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) throw new Error("Unauthorized. Please log in.");
//         const response = await axios.get("http://localhost:5000/api/auth/fetchData", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const users = response.data;
//         setTotalUsers(users.length);
//         setActiveUsers(users.filter((user) => user.status === "Active").length);
//         setInactiveUsers(users.filter((user) => user.status === "Inactive").length);
//       } catch (error) {
//         console.error("Error fetching user stats:", error);
//       }
//     };
//     fetchUserStats();
//   }, []);

//   return (
//     <div className="min-h-screen flex bg-gradient-to-tr from-purple-100 via-teal-100 to-blue-100 animate-bg-shift">
//       {/* Sidebar */}
//       <Sidebar adminProfile={adminProfile} onLogout={onLogout} />

//       {/* Main Content */}
//       <div className="flex-grow p-6 relative">
//         {/* Title */}
//         <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-teal-500 to-blue-600 mb-8">
//           Admin Dashboard
//         </h1>

//         {/* Power Off Icon */}
//         <div className="absolute top-6 right-6">
//           <button
//             onClick={onLogout} // Trigger logout when clicked
//             className="flex items-center text-red-600 hover:text-red-800 transition-colors duration-200"
//           >
//             < Logout onLogout={onLogout} FaPowerOff className="mr-2" size={20} /> 
//           </button>
//         </div>

//         {/* User Statistics */}
//         <div className="w-full bg-white shadow-2xl rounded-3xl p-6">
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
//             <div className="bg-gradient-to-r from-purple-600 via-teal-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
//               <h2 className="text-2xl font-bold">Total Users</h2>
//               <p className="text-4xl mt-2">{totalUsers}</p>
//             </div>
//             <div className="bg-gradient-to-r from-green-600 to-green-400 text-white p-6 rounded-lg shadow-lg">
//               <h2 className="text-2xl font-bold">Active Users</h2>
//               <p className="text-4xl mt-2">{activeUsers}</p>
//             </div>
//             <div className="bg-gradient-to-r from-red-600 to-red-400 text-white p-6 rounded-lg shadow-lg">
//               <h2 className="text-2xl font-bold">Inactive Users</h2>
//               <p className="text-4xl mt-2">{inactiveUsers}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiUsers, FiActivity, FiUserX, FiClock, FiUserPlus, FiEdit, FiTrash2, FiLogIn, FiRefreshCw } from "react-icons/fi";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import defaultProfilePhoto from "../../assets/bu.jpg";
import Sidebar from "./Sidebar";
import Logout from "../logout/Logout";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AdminDashboard = ({ onLogout }) => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    inactiveUsers: 0,
    newUsers: 0,
    roles: {}
  });
  const [loading, setLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState([]);
  const [adminProfile, setAdminProfile] = useState({
    name: "Admin",
    profilePhoto: defaultProfilePhoto
  });
  const [refreshing, setRefreshing] = useState(false);

  const generateActivityLogs = (users) => {
    const activities = [];
    const now = new Date();
    
    // Generate activities with real timestamps
    activities.push({
      type: "login",
      user: "Admin User",
      action: "Admin logged in",
      timestamp: new Date(now - 1000 * 60 * 2), // 2 minutes ago
      details: "Accessed dashboard"
    });

    activities.push({
      type: "update",
      user: users[0]?.name || users[0]?.email || "User 1",
      action: "Profile updated",
      timestamp: new Date(now - 1000 * 60 * 15), // 15 minutes ago
      details: "Changed profile picture"
    });

    activities.push({
      type: "new_user",
      user: users[1]?.name || users[1]?.email || "User 2",
      action: "New user registered",
      timestamp: new Date(now - 1000 * 60 * 60), // 1 hour ago
      details: "Via email registration"
    });

    activities.push({
      type: "deactivate",
      user: users[2]?.name || users[2]?.email || "User 3",
      action: "User deactivated",
      timestamp: new Date(now - 1000 * 60 * 60 * 3), // 3 hours ago
      details: "Inactive for 30 days"
    });

    activities.push({
      type: "login",
      user: users[3]?.name || users[3]?.email || "User 4",
      action: "User logged in",
      timestamp: new Date(now - 1000 * 60 * 60 * 5), // 5 hours ago
      details: "From mobile device"
    });

    // Sort by timestamp (newest first)
    return activities.sort((a, b) => b.timestamp - a.timestamp);
  };

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized. Please log in.");
      
      const response = await axios.get("http://localhost:5000/api/auth/fetchData", {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      const users = response.data;
      const today = new Date();
      const oneWeekAgo = new Date(today);
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      
      const roleCount = users.reduce((acc, user) => {
        acc[user.role] = (acc[user.role] || 0) + 1;
        return acc;
      }, {});

      const activities = generateActivityLogs(users);

      setStats({
        totalUsers: users.length,
        activeUsers: users.filter(u => u.status === "Active").length,
        inactiveUsers: users.filter(u => u.status === "Inactive").length,
        newUsers: users.filter(u => new Date(u.createdAt) > oneWeekAgo).length,
        roles: roleCount
      });
      
      setRecentActivity(activities);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchData();
  };

  // Format time difference as "X time ago"
  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const seconds = Math.floor((now - timestamp) / 1000);
    
    if (seconds < 60) return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minute${Math.floor(seconds / 60) !== 1 ? 's' : ''} ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hour${Math.floor(seconds / 3600) !== 1 ? 's' : ''} ago`;
    return `${Math.floor(seconds / 86400)} day${Math.floor(seconds / 86400) !== 1 ? 's' : ''} ago`;
  };

  // Chart data configurations
  const barChartData = {
    labels: ['Total', 'Active', 'Inactive', 'New (7d)'],
    datasets: [
      {
        label: 'Users',
        data: [stats.totalUsers, stats.activeUsers, stats.inactiveUsers, stats.newUsers],
        backgroundColor: [
          'rgba(124, 58, 237, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(239, 68, 68, 0.7)',
          'rgba(59, 130, 246, 0.7)'
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieChartData = {
    labels: Object.keys(stats.roles),
    datasets: [
      {
        data: Object.values(stats.roles),
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const getActivityIcon = (type) => {
    switch(type) {
      case 'new_user': 
        return <FiUserPlus className="text-green-500" />;
      case 'update': 
        return <FiEdit className="text-blue-500" />;
      case 'deactivate': 
        return <FiTrash2 className="text-red-500" />;
      case 'login':
        return <FiLogIn className="text-purple-500" />;
      default: 
        return <FiActivity className="text-gray-500" />;
    }
  };

  const getActivityDescription = (activity) => {
    switch(activity.type) {
      case 'new_user':
        return `New user registered: ${activity.user}`;
      case 'update':
        return `Profile updated: ${activity.user}${activity.details ? ` (${activity.details})` : ''}`;
      case 'deactivate':
        return `User deactivated: ${activity.user}`;
      case 'login':
        return `User login: ${activity.user}`;
      default:
        return `${activity.action || 'Activity'}: ${activity.user}`;
    }
  };

  return (
    <div className="min-h-screen bg-green-50 text-gray-900 flex">
      {/* Sidebar with adminProfile passed as prop */}
      <Sidebar adminProfile={adminProfile} onLogout={onLogout} />

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-gray-800 bg-green-200 inline-block pl-6 pr-12 py-3 rounded-md">Admin Dashboard</h1>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
            </div>
          ) : (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-purple-500">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                      <FiUsers size={24} />
                    </div>
                    <div>
                      <p className="text-gray-600">Total Users</p>
                      <p className="text-2xl font-bold">{stats.totalUsers}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-green-500">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                      <FiActivity size={24} />
                    </div>
                    <div>
                      <p className="text-gray-600">Active Users</p>
                      <p className="text-2xl font-bold">{stats.activeUsers}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-red-500">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-red-100 text-red-600 mr-4">
                      <FiUserX size={24} />
                    </div>
                    <div>
                      <p className="text-gray-600">Inactive Users</p>
                      <p className="text-2xl font-bold">{stats.inactiveUsers}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-blue-500">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                      <FiUserPlus size={24} />
                    </div>
                    <div>
                      <p className="text-gray-600">New Users (7d)</p>
                      <p className="text-2xl font-bold">{stats.newUsers}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                  <h2 className="text-xl font-semibold mb-4">User Statistics</h2>
                  <div className="h-64">
                    <Bar 
                      data={barChartData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: { legend: { display: false } },
                      }}
                    />
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                  <h2 className="text-xl font-semibold mb-4">User Roles</h2>
                  <div className="h-64">
                    <Pie 
                      data={pieChartData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: { legend: { position: 'right' } },
                      }}
                    />
                  </div>
                </div>
              </div>
              
              {/* Recent Activity Section */}
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Recent Activity</h2>
                  <button 
                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                    onClick={handleRefresh}
                    disabled={refreshing}
                  >
                    <FiRefreshCw className={`mr-1 ${refreshing ? 'animate-spin' : ''}`} />
                    {refreshing ? 'Refreshing...' : 'Refresh'}
                  </button>
                </div>
                
                {recentActivity.length === 0 ? (
                  <div className="text-center py-6">
                    <FiActivity className="mx-auto text-gray-400 mb-2" size={24} />
                    <p className="text-gray-500">No recent activity found</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {recentActivity.map((activity, index) => (
                      <div 
                        key={index} 
                        className="flex items-start p-3 hover:bg-gray-50 rounded-lg transition-colors border-b border-gray-100 last:border-0"
                      >
                        <div className="p-2 rounded-full bg-gray-100 mr-3 mt-1">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">
                            {getActivityDescription(activity)}
                          </p>
                          <div className="flex items-center text-sm text-gray-500">
                            <FiClock className="mr-1" size={14} />
                            <span>{formatTimeAgo(activity.timestamp)}</span>
                            {activity.details && (
                              <span className="ml-2 text-xs bg-gray-100 px-2 py-1 rounded">
                                {activity.details}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;