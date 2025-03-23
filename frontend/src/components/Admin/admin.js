

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
import React, { useState, useEffect } from "react";
import { FiBell, FiMenu, FiX } from "react-icons/fi";
import Logout from "../logout/Logout";
import FetchDataComponent from "./fetch";
import axios from "axios";
import defaultProfilePhoto from "../../assets/bu.jpg";

const AdminDashboard = ({ onLogout }) => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [inactiveUsers, setInactiveUsers] = useState(0);
  const [adminProfile, setAdminProfile] = useState(() => {
    const savedProfile = localStorage.getItem("adminProfile");
    return savedProfile
      ? JSON.parse(savedProfile)
      : { name: "Admin", profilePhoto: defaultProfilePhoto };
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const [newProfilePhoto, setNewProfilePhoto] = useState(null);
  const [newProfileName, setNewProfileName] = useState(adminProfile.name);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Unauthorized. Please log in.");

        const response = await axios.get("http://localhost:5000/api/auth/fetchData", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const users = response.data;
        setTotalUsers(users.length);
        setActiveUsers(users.filter((user) => user.status === "Active").length);
        setInactiveUsers(users.filter((user) => user.status === "Inactive").length);
      } catch (error) {
        console.error("Error fetching user stats:", error);
      }
    };

    fetchUserStats();
  }, []);

  // Compress image and save to localStorage
  const compressAndSaveProfile = (file, name) => {
    const img = new Image();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    img.onload = () => {
      // Set max dimensions (e.g., 200x200) to reduce size
      const MAX_WIDTH = 200;
      const MAX_HEIGHT = 200;
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      // Convert to Base64 with reduced quality (0.7 = 70% quality)
      const base64String = canvas.toDataURL("image/jpeg", 0.7);

      const updatedProfile = {
        name: name,
        profilePhoto: base64String,
      };

      try {
        setAdminProfile(updatedProfile);
        localStorage.setItem("adminProfile", JSON.stringify(updatedProfile));
        setShowEditModal(false);
        setNewProfilePhoto(null);
        setErrorMessage(null);
      } catch (error) {         
        setShowEditModal(false);
        setNewProfilePhoto(null);
      }
    };

    img.src = URL.createObjectURL(file);
  };

  const handleEditProfile = () => {
    if (newProfilePhoto) {
      compressAndSaveProfile(newProfilePhoto, newProfileName);
    } else {
      const updatedProfile = {
        name: newProfileName,
        profilePhoto: adminProfile.profilePhoto,
      };
      try {
        setAdminProfile(updatedProfile);
        localStorage.setItem("adminProfile", JSON.stringify(updatedProfile));
        setShowEditModal(false);
        setErrorMessage(null);
      } catch (error) {
        console.error("Error saving profile:", error);
        setErrorMessage("Failed to save profile changes.");
      }
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-tr from-purple-100 via-teal-100 to-blue-100 animate-bg-shift">
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
            onClick={() => {
              setShowEditModal(true);
              setNewProfileName(adminProfile.name);
              setErrorMessage(null); // Clear error on edit
            }}
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
          <div className="w-full">
            <Logout onLogout={onLogout} />
          </div>
        </div>
      </div>

      {/* Overlay for Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-grow p-6 md:ml-64">
        <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-teal-500 to-blue-600 mb-8">
          Admin Dashboard
        </h1>
        <div className="w-full bg-white shadow-2xl rounded-3xl p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-r from-purple-600 via-teal-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold">Total Users</h2>
              <p className="text-4xl mt-2">{totalUsers}</p>
            </div>
            <div className="bg-gradient-to-r from-green-600 to-green-400 text-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold">Active Users</h2>
              <p className="text-4xl mt-2">{activeUsers}</p>
            </div>
            <div className="bg-gradient-to-r from-red-600 to-red-400 text-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold">Inactive Users</h2>
              <p className="text-4xl mt-2">{inactiveUsers}</p>
            </div>
          </div>
          <FetchDataComponent defaultProfilePhoto={defaultProfilePhoto} />
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
            {errorMessage && (
              <p className="text-red-600 mb-4">{errorMessage}</p>
            )}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700">Name</label>
              <input
                type="text"
                value={newProfileName}
                onChange={(e) => setNewProfileName(e.target.value)}
                className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700">Profile Photo</label>
              <input
                type="file"
                onChange={(e) => setNewProfilePhoto(e.target.files[0])}
                accept="image/*"
                className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900"
              />
              <img
                src={
                  newProfilePhoto
                    ? URL.createObjectURL(newProfilePhoto)
                    : adminProfile.profilePhoto
                }
                alt="Preview"
                className="mt-2 w-24 h-24 rounded-full object-cover"
              />
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleEditProfile}
                className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setNewProfilePhoto(null);
                  setNewProfileName(adminProfile.name);
                  setErrorMessage(null);
                }}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
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

export default AdminDashboard;