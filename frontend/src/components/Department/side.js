// import React from "react";
// import { FiBell } from "react-icons/fi";
// import Logout from "../logout/Logout";

// const Sidebar = ({
//   sidebarOpen,
//   setSidebarOpen,
//   departmentProfile,
//   notifications,
//   onLogout,
//   setShowEditModal,
// }) => {
//   return (
//     <div
//       className={`fixed md:static inset-y-0 left-0 w-64 bg-white shadow-xl flex flex-col transform ${
//         sidebarOpen ? "translate-x-0" : "-translate-x-full"
//       } md:translate-x-0 transition-transform duration-300 ease-in-out z-40`}
//     >
//       {/* Main Sidebar Content */}
//       <div className="flex flex-col items-center p-6 h-full">
//         {/* Profile Photo Section */}
//         <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-md mb-8">
//           {/* Rotating Green Ring */}
//           <div className="absolute inset-0 w-full h-full rounded-full border-4 border-green-950 animate-spin-slow"></div>
//           {/* Profile Photo */}
//           <img
//             src={departmentProfile.profilePhoto}
//             alt="Department Profile"
//             className="w-full h-full object-cover rounded-full"
//           />
//         </div>

//         <h2 className="text-xl font-bold text-green-950 mt-4">
//           {departmentProfile.name}
//         </h2>
//         <button
//           onClick={() => setShowEditModal(true)}
//           className="text-sm text-teal-600 hover:text-teal-800 mt-2 underline"
//           aria-label="Edit Profile"
//         >
//           Edit Profile
//         </button>

//         {/* Notifications */}
//         <div className="mb-6 w-full">
//           <h3 className="text-lg font-semibold text-green-950 mb-2">
//             Notifications
//           </h3>
//           <ul className="space-y-2">
//             {notifications.map((notification, index) => (
//               <li
//                 key={index}
//                 className="flex items-center text-green-950 text-sm"
//               >
//                 <FiBell className="mr-2 text-teal-500" />
//                 {notification}
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Logout Button */}
//         <div className="w-full">
//           <Logout onLogout={onLogout} />
//         </div>
//       </div>

//       {/* Tiny Vertical Green Line */}
//       <div
//         className="absolute right-0 top-0 bottom-0 w-[2px] bg-green-950"
//         style={{ borderRadius: "1px" }}
//       ></div>
//     </div>
//   );
// };

// export default Sidebar;

// import React from "react";
// import { FiBell } from "react-icons/fi";
// import Logout from "../logout/Logout";
// import DepartmentPage from "./DepartmentPage"; // Assuming you have a DepartmentPage component
// const Sidebar = ({ sidebarOpen, setSidebarOpen, departmentProfile, notifications, onLogout, setShowEditModal }) => {
//   return (
//     <div
//       style={{
//         position: "fixed",
//         top: 0,
//         bottom: 0,
//         left: 0,
//         width: "16rem",
//         backgroundColor: "white",
//         boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
//         display: "flex",
//         flexDirection: "column",
//         transform: "translateX(0)", // Sidebar always visible
//         transition: "transform 0.3s ease-in-out",
//         zIndex: 40,
//       }}
//     >
//       {/* Main Sidebar Content */}
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           padding: "1.5rem",
//           height: "100%",
//         }}
//       >
//         {/* Profile Photo Section */}
//         <div
//           style={{
//             position: "relative",
//             width: "8rem",
//             height: "8rem",
//             borderRadius: "50%",
//             overflow: "hidden",
//             boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
//             marginBottom: "2rem",
//           }}
//         >
//           {/* Rotating Green Ring */}
//           <div
//             style={{
//               position: "absolute",
//               top: 0,
//               left: 0,
//               width: "100%",
//               height: "100%",
//               borderRadius: "50%",
//               border: "4px solid #0B3D3D",
//               animation: "spin 5s linear infinite",
//             }}
//           ></div>
//           {/* Profile Photo */}
//           <img
//             src={departmentProfile.profilePhoto}
//             alt="Department Profile"
//             style={{
//               width: "100%",
//               height: "100%",
//               objectFit: "cover",
//               borderRadius: "50%",
//             }}
//           />
//         </div>
//         <h2
//           style={{
//             fontSize: "1.25rem",
//             fontWeight: "bold",
//             color: "#0B3D3D",
//             marginTop: "1rem",
//           }}
//         >
//           {departmentProfile.name}
//         </h2>
//         <button
//           onClick={() => setShowEditModal(true)}
//           style={{
//             fontSize: "0.875rem",
//             color: "#0B8F8F",
//             textDecoration: "underline",
//             marginTop: "0.5rem",
//             cursor: "pointer",
//           }}
//           aria-label="Edit Profile"
//         >
//           Edit Profile
//         </button>

//         {/* Notifications */}
//         <div style={{ marginBottom: "1.5rem", width: "100%" }}>
//           <h3
//             style={{
//               fontSize: "1.125rem",
//               fontWeight: "600",
//               color: "#0B3D3D",
//               marginBottom: "0.5rem",
//             }}
//           >
//             Notifications
//           </h3>
//           <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
//             {notifications.map((notification, index) => (
//               <li
//                 key={index}
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   fontSize: "0.875rem",
//                   color: "#0B3D3D",
//                 }}
//               >
//                 <FiBell style={{ marginRight: "0.5rem", color: "#0B8F8F" }} />
//                 {notification}
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Logout Button */}
//         <div style={{ width: "100%" }}>
//           <Logout onLogout={onLogout} />
//         </div>
//       </div>

//       {/* Tiny Vertical Green Line */}
//       <div
//         style={{
//           position: "absolute",
//           right: 0,
//           top: 0,
//           bottom: 0,
//           width: "2px",
//           backgroundColor: "#0B3D3D",
//           borderRadius: "1px",
//         }}
//       ></div>
//     </div>
//   );
// };

// // Keyframes for Rotation (must be added to <style> in your HTML)
// const styles = document.createElement("style");
// styles.textContent = `
// @keyframes spin {
//   0% { transform: rotate(0deg); }
//   100% { transform: rotate(360deg); }
// }
// `;
// document.head.appendChild(styles);

// export default Sidebar;


import React, { useEffect, useState } from "react";
import { 
  FiBell, 
  FiHome, 
  FiSettings, 
  FiUsers, 
  FiChevronRight,
  FiDatabase,
  FiCheckCircle,
  FiUser,
  FiMenu,
  FiX
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Logout from "../logout/Logout";

const Sidebar = ({ departmentProfile, notifications, onLogout, setShowEditModal }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [expanded, setExpanded] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isProfileLoaded, setIsProfileLoaded] = useState(false);

  // Count unread notifications
  useEffect(() => {
    setUnreadNotifications(notifications.filter(n => !n.read).length);
  }, [notifications]);

  // Simulate profile loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsProfileLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleNavigation = (route) => {
    setActiveTab(route);
    navigate();
    if (window.innerWidth <= 768) {
      setMobileOpen(false);
    }
  };

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const toggleMobileSidebar = () => {
    setMobileOpen(!mobileOpen);
  };

  // Close mobile sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (window.innerWidth <= 768 && mobileOpen) {
        const sidebar = document.querySelector('.sidebar-container');
        if (sidebar && !sidebar.contains(event.target) && 
            !document.querySelector('.mobile-menu-button')?.contains(event.target)) {
          setMobileOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Mobile Menu Button (Hamburger) */}
      <button 
        onClick={toggleMobileSidebar}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-emerald-800 text-white shadow-lg mobile-menu-button"
      >
        {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar Container */}
      <div 
        className={`sidebar-container fixed md:relative h-screen bg-white shadow-lg transition-all duration-300 ease-in-out z-40
          ${expanded ? 'w-64' : 'w-20'} 
          ${mobileOpen ? 'left-0' : '-left-full md:left-0'}`}
      >
        {/* Collapse/Expand Button (Desktop only) */}
        <button 
          onClick={toggleSidebar}
          className="hidden md:flex absolute -right-3 top-6 z-10 h-6 w-6 items-center justify-center rounded-full bg-emerald-800 text-white shadow-md hover:bg-emerald-700"
        >
          <FiChevronRight className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
        </button>

        {/* Profile Section */}
        <div className={`flex flex-col items-center py-6 px-4 border-b border-gray-200 ${!expanded ? 'px-2' : ''}`}>
          <div className="relative h-16 w-16 mb-4">
            {isProfileLoaded ? (
              <>
                <div className="absolute inset-0 rounded-full border-4 border-emerald-800 animate-spin-slow"></div>
                <img
                  src={departmentProfile.profilePhoto || "/default-profile.png"}
                  alt="Department Profile"
                  className="relative z-10 h-full w-full rounded-full object-cover border-2 border-white shadow-md"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/default-profile.png";
                  }}
                />
              </>
            ) : (
              <div className="h-full w-full rounded-full bg-gray-200 animate-pulse flex items-center justify-center">
                <FiUser className="text-gray-400 text-2xl" />
              </div>
            )}
          </div>
          
          {expanded && isProfileLoaded && (
            <>
              <h2 className="text-lg font-bold text-emerald-900 text-center truncate w-full">
                {departmentProfile.name || "Department"}
              </h2>
              <button
                onClick={() => setShowEditModal(true)}
                className="text-sm text-emerald-600 underline mt-1 hover:text-emerald-800 transition-colors"
                aria-label="Edit Profile"
              >
                Edit Profile
              </button>
            </>
          )}
        </div>

        {/* Navigation Menu */}
        <nav className="py-4 px-2 border-b border-gray-200">
          <ul className="space-y-1">
            {/* Request Status - Priority Item */}
            <li>
              <button
                onClick={() => {
                  navigate('/DepartmentPage');
                  setActiveTab("requests");
                }}
                className={`flex items-center w-full p-3 rounded-lg transition-colors ${activeTab === "requests" 
                  ? 'bg-emerald-50 text-emerald-800 font-medium' 
                  : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <span className="text-lg">
                  <FiCheckCircle className="inline-block" />
                </span>
                {expanded && <span className="ml-3">Request Status</span>}
              </button>
            </li>

            {/* Other Navigation Items */}
            {[
              { icon: <FiHome />, label: "Dashboard", route: "department" },
              { icon: <FiUsers />, label: "User Management", route: "users" },
              { icon: <FiDatabase />, label: "Departments", route: "dp" },
              { icon: <FiSettings />, label: "Settings", route: "settings" },
            ].map((item) => (
              <li key={item.route}>
                <button
                  onClick={() => handleNavigation(item.route)}
                  className={`flex items-center w-full p-3 rounded-lg transition-colors ${activeTab === item.route 
                    ? 'bg-emerald-50 text-emerald-800 font-medium' 
                    : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <span className="text-lg">{item.icon}</span>
                  {expanded && <span className="ml-3">{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Notifications Section */}
        <div className={`py-4 px-2 border-b border-gray-200 ${!expanded ? 'px-1' : ''}`}>
          <div className="flex items-center mb-2 px-2 relative">
            <FiBell className="text-emerald-600 text-lg" />
            {expanded && <span className="ml-3">Notifications</span>}
            {unreadNotifications > 0 && (
              <span className={`absolute ${expanded ? '-top-1 right-0' : '-top-1 -right-1'} bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center`}>
                {unreadNotifications}
              </span>
            )}
          </div>
          
          {expanded && (
            <>
              <ul className="space-y-2 max-h-40 overflow-y-auto">
                {notifications.slice(0, 3).map((notification, index) => (
                  <li 
                    key={index} 
                    onClick={() => handleNavigation("notifications")}
                    className={`text-xs p-2 rounded cursor-pointer transition-colors ${!notification.read 
                      ? 'bg-emerald-50 text-emerald-800 font-medium' 
                      : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    {notification.message}
                  </li>
                ))}
              </ul>
              
              {notifications.length > 3 && (
                <button 
                  onClick={() => handleNavigation("notifications")}
                  className="mt-2 text-xs text-emerald-600 hover:text-emerald-800 underline w-full text-left px-2"
                >
                  View All
                </button>
              )}
            </>
          )}
        </div>

        {/* Logout Section */}
        <div className="absolute bottom-0 w-full p-4">
          <Logout onLogout={onLogout} compact={!expanded} />
        </div>

        {/* Vertical Accent Line */}
        <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-emerald-800"></div>
      </div>

      {/* Overlay for mobile */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"></div>
      )}
    </>
  );
};

export default Sidebar;