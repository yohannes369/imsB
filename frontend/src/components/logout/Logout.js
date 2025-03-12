import React from "react";

const Logout = () => {
  const handleLogout = () => {
    // const confirmLogout = window.confirm("Are you sure you want to logout?"); generate best csss
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      window.location.href = "/"; // Redirect to login page
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
    >
      Logout
    </button>
  );
};

export default Logout;


