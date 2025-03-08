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
import React, { useState } from "react";
import "./Logout.css"; // Import the custom CSS for the modal styling

const Logout = () => {
  const [showModal, setShowModal] = useState(false); // To control the modal visibility

  const handleLogoutClick = () => {
    setShowModal(true); // Show the confirmation modal
  };

  const confirmLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/"; // Redirect to login page after logout
  };

  const cancelLogout = () => {
    setShowModal(false); // Close the modal if user cancels
  };

  return (
    <div>
      <button
        onClick={handleLogoutClick}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>

      {/* Custom Confirmation Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h2 className="modal-title">Are you sure you want to logout?</h2>
            <div className="modal-buttons">
              <button onClick={confirmLogout} className="confirm-btn">
                Yes
              </button>
              <button onClick={cancelLogout} className="cancel-btn">
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

