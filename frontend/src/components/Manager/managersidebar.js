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

const Managersidebar = ({ departmentProfile, notifications = [], onLogout, setShowEditModal }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [expanded, setExpanded] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isProfileLoaded, setIsProfileLoaded] = useState(false);

  // Count unread notifications with safe access
  useEffect(() => {
    if (Array.isArray(notifications)) {
      setUnreadNotifications(notifications.filter(n => !n?.read).length);
    }
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
    navigate(`/admin/${route.toLowerCase().replace('page', '')}`);
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

  // Safe notifications access
  const displayNotifications = Array.isArray(notifications) ? notifications : [];
  const hasNotifications = displayNotifications.length > 0;

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
                  src={departmentProfile?.profilePhoto || "/default-profile.png"}
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
                {departmentProfile?.name || "Department"}
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
              { icon: <FiHome />, label: "manager", route: "manager" },
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

        
          
        

        {/* Logout Section */}
        <div className="absolute bottom-0 w-full ">
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

export default Managersidebar;