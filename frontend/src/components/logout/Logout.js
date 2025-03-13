// import React from "react";

// const Logout = () => {
//   const handleLogout = () => {
//     // const confirmLogout = window.confirm("Are you sure you want to logout?"); generate best csss
//     const confirmLogout = window.confirm("Are you sure you want to logout?");
//     if (confirmLogout) {
//       localStorage.removeItem("token");
//       window.location.href = "/"; // Redirect to login page
//     }
//   };

//   return (
//     <button
//       onClick={handleLogout}
//       className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//     >
//       Logout
//     </button>
//   );
// };

// export default Logout;
// import React, { useState } from "react";
// import "./Logout.css"; // Import the custom CSS for the modal styling

// const Logout = () => {
//   const [showModal, setShowModal] = useState(false); // To control the modal visibility

//   const handleLogoutClick = () => {
//     setShowModal(true); // Show the confirmation modal
//   };

//   const confirmLogout = () => {
//     localStorage.removeItem("token");
//     window.location.href = "/"; // Redirect to login page after logout
//   };

//   const cancelLogout = () => {
//     setShowModal(false); // Close the modal if user cancels
//   };

//   return (
//     <div>
//       <button
//         onClick={handleLogoutClick}
//         className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//       >
//         Logout
//       </button>

//       {/* Custom Confirmation Modal */}
//       {showModal && (
//         <div className="modal-overlay">
//           <div className="modal-container">
//             <h2 className="modal-title">Are you sure you want to logout?</h2>
//             <div className="modal-buttons">
//               <button onClick={confirmLogout} className="confirm-btn">
//                 Yes
//               </button>
//               <button onClick={cancelLogout} className="cancel-btn">
//                 No
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Logout;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({ onLogout }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    setShowModal(true); // Show the confirmation modal
  };

  const confirmLogout = () => {
    localStorage.removeItem("token"); // Clear token
    if (onLogout) onLogout(); // Call onLogout to clear role in App state
    navigate("/"); // Redirect to login page
    setShowModal(false); // Close modal
  };

  const cancelLogout = () => {
    setShowModal(false); // Close the modal
  };

  return (
    <div>
      {/* Logout Button */}
      <button
        onClick={handleLogoutClick}
        className="px-6 py-2 bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold rounded-lg shadow-md hover:from-red-700 hover:to-orange-800 hover:shadow-xl transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 group relative overflow-hidden"
      >
        <span className="relative z-10">Logout</span>
        <span className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 opacity-0 group-hover:opacity-30 transition-opacity duration-300 ease-in-out animate-pulse-fast"></span>
      </button>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-zoom-in">
          <div className="bg-gradient-to-br from-white to-gray-100 rounded-2xl shadow-3xl p-8 max-w-md w-full transform transition-all duration-500 animate-modal-explode">
            <h3 className="text-2xl font-bold text-purple-700 mb-4 animate-text-flip">
              Confirm Logout
            </h3>
            <p className="text-sm text-gray-700 mb-6 animate-text-pulse">
              Are you sure you want to logout? You’ll need to sign in again!
            </p>
            <div className="flex space-x-4">
              <button
                onClick={confirmLogout}
                className="flex-1 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 animate-pulse-fast"
              >
                Yes
              </button>
              <button
                onClick={cancelLogout}
                className="flex-1 bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Logout;