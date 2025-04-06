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
  FiX,
  FiEdit
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Logout from "../logout/Logout";

const StaffSidebar = ({ departmentProfile = {}, notifications = [], onLogout, setShowEditModal }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [expanded, setExpanded] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isProfileLoaded, setIsProfileLoaded] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState("");

  useEffect(() => {
    const savedPhoto = localStorage.getItem("staffProfilePhoto");
    setProfilePhoto(savedPhoto || departmentProfile.profilePhoto || "/default-profile.png");
  }, [departmentProfile.profilePhoto]);

  useEffect(() => {
    if (profilePhoto && profilePhoto !== "/default-profile.png") {
      localStorage.setItem("staffProfilePhoto", profilePhoto);
    }
  }, [profilePhoto]);

  useEffect(() => {
    if (Array.isArray(notifications)) {
      setUnreadNotifications(notifications.filter(n => !n?.read).length);
    }
  }, [notifications]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsProfileLoaded(true);
    }, 800);
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

  const displayNotifications = Array.isArray(notifications) ? notifications : [];
  const hasNotifications = displayNotifications.length > 0;

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileSidebar}
        className="md:hidden fixed top-4 left-4 z-50 p-3 rounded-full bg-black text-white shadow-xl hover:bg-gray-800 transition-all duration-300 mobile-menu-button"
      >
        {mobileOpen ? (
          <FiX className="animate-spin-in" size={24} />
        ) : (
          <FiMenu size={24} />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`sidebar-container fixed md:relative h-screen bg-green-200 shadow-xl transition-all duration-500 ease-in-out z-40
          ${expanded ? 'w-64' : 'w-20'} 
          ${mobileOpen ? 'left-0' : '-left-full md:left-0'}`}
      >
        {/* Collapse Button */}
        <button
          onClick={toggleSidebar}
          className="hidden md:flex absolute -right-3 top-6 z-10 h-7 w-7 items-center justify-center rounded-full bg-black text-white shadow-lg hover:bg-gray-800 transition-all duration-300"
        >
          <FiChevronRight className={`transition-transform duration-500 ${expanded ? 'rotate-180' : ''}`} />
        </button>

        {/* Profile */}
        <div className={`flex flex-col items-center py-6 px-4 border-b border-green-300 ${!expanded ? 'px-2' : ''}`}>
          <div className="relative h-20 w-20 mb-4">
            {isProfileLoaded ? (
              <>
                <div className="absolute inset-0 rounded-full border-4 border-emerald-500/30 animate-pulse-slow"></div>
                <img
                  src={profilePhoto}
                  alt="Staff Profile"
                  className="relative z-10 h-full w-full rounded-full object-cover border-2 border-gray-700 shadow-lg"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/default-profile.png";
                    setProfilePhoto("/default-profile.png");
                  }}
                />
              </>
            ) : (
              <div className="h-full w-full rounded-full bg-gray-700 animate-pulse flex items-center justify-center">
                <FiUser className="text-gray-400 text-3xl" />
              </div>
            )}
          </div>

          {expanded && isProfileLoaded && (
            <>
              <h2 className="text-lg font-bold text-gray-800 text-center truncate w-full">
                {departmentProfile.name || "Staff Member"}
              </h2>
              <button
                onClick={() => setShowEditModal(true)}
                className="text-sm text-emerald-700 hover:text-emerald-600 mt-1 flex items-center transition-colors"
              >
                <FiEdit className="mr-1" />
                Edit Profile
              </button>
            </>
          )}
        </div>

        {/* Navigation */}
        <nav className="py-4 px-2 border-b border-green-300">
          <ul className="space-y-1">
            <li>
              <button
                onClick={() => handleNavigation("ge")}
                className={`flex items-center w-full p-3 rounded-lg transition-colors ${activeTab === "requests"
                  ? 'bg-green-300 text-gray-800 font-medium'
                  : 'text-gray-800 hover:bg-green-300'}`}
              >
                <span className="text-lg text-emerald-600">
                  <FiCheckCircle />
                </span>
                {expanded && <span className="ml-3">Request Status</span>}
              </button>
            </li>

            {[
              { icon: <FiHome />, label: "Dashboard", route: "dashboard" },
              { icon: <FiUsers />, label: "User Management", route: "users" },
              { icon: <FiDatabase />, label: "Departments", route: "ge" },
              { icon: <FiSettings />, label: "Settings", route: "settings" },
            ].map((item) => (
              <li key={item.route}>
                <button
                  onClick={() => handleNavigation(item.route)}
                  className={`flex items-center w-full p-3 rounded-lg transition-colors ${activeTab === item.route
                    ? 'bg-green-300 text-gray-800 font-medium'
                    : 'text-gray-800 hover:bg-green-300'}`}
                >
                  <span className="text-lg text-emerald-600">{item.icon}</span>
                  {expanded && <span className="ml-3">{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Notifications */}
        <div className={`py-4 px-2 border-b border-green-300 ${!expanded ? 'px-1' : ''}`}>
          <div className="flex items-center mb-2 px-2 relative">
            <FiBell className="text-emerald-600 text-lg" />
            {expanded && <span className="ml-3 text-gray-800">Notifications</span>}
            {unreadNotifications > 0 && (
              <span className={`absolute ${expanded ? '-top-1 right-0' : '-top-1 -right-1'} bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-bounce`}>
                {unreadNotifications}
              </span>
            )}
          </div>

          {expanded && hasNotifications && (
            <>
              <ul className="space-y-2 max-h-40 overflow-y-auto">
                {displayNotifications.slice(0, 3).map((notification, index) => (
                  <li
                    key={index}
                    onClick={() => handleNavigation("notifications")}
                    className={`text-xs p-2 rounded cursor-pointer transition-colors ${!notification.read
                      ? 'bg-green-300 text-gray-800 font-medium'
                      : 'text-gray-600 hover:bg-green-300'}`}
                  >
                    {notification.message}
                  </li>
                ))}
              </ul>
              {displayNotifications.length > 3 && (
                <button
                  onClick={() => handleNavigation("notifications")}
                  className="mt-2 text-xs text-emerald-700 hover:text-emerald-600 w-full text-left px-2"
                >
                  View All
                </button>
              )}
            </>
          )}
          {expanded && !hasNotifications && (
            <p className="text-xs text-gray-500 px-2">No notifications</p>
          )}
        </div>
        <li>
                      <button onClick={() => navigate('/ge')} className="flex items-center hover:text-green-900 w-full transition-colors duration-200">
                        <FiDatabase className="mr-2" /> ge
                      </button>
                    </li>

        {/* Logout */}
        <div className="absolute bottom-0 w-full border-t border-green-300 bg-green-100 px-4 py-3">
          <div className={`flex items-center ${expanded ? 'justify-between' : 'justify-center'}`}>
            {expanded && (
              <span className="text-sm font-medium text-gray-700">Logout</span>
            )}
            <Logout
              onLogout={onLogout}
              compact={!expanded}
              className="text-red-600 hover:text-red-500 text-lg"
            />
          </div>
        </div>

        {/* Accent Line */}
        <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-emerald-500"></div>
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/70 z-30 md:hidden animate-fade-in"></div>
      )}

      {/* Animations */}
      <style jsx>{`
        @keyframes spin-in {
          from { transform: rotate(90deg); opacity: 0; }
          to { transform: rotate(0deg); opacity: 1; }
        }
        .animate-spin-in {
          animation: spin-in 0.3s ease-out;
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.3; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-bounce {
          animation: bounce 1s infinite;
        }
      `}</style>
    </>
  );
};

export default StaffSidebar;
