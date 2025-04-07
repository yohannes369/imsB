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
  FiEdit,
  FiClipboard,
  FiAlertCircle,
  FiClock
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
  const [isHovered, setIsHovered] = useState(false);

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
    navigate(route);
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
        className="md:hidden fixed top-4 left-4 z-50 p-3 rounded-full bg-gradient-to-br from-emerald-600 to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 mobile-menu-button transform hover:scale-105"
      >
        {mobileOpen ? (
          <FiX className="animate-spin-in" size={24} />
        ) : (
          <FiMenu size={24} />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`sidebar-container fixed md:relative h-screen bg-gradient-to-b from-green-50 to-green-100 shadow-xl transition-all duration-500 ease-in-out z-40
          ${expanded ? 'w-64' : 'w-20'} 
          ${mobileOpen ? 'left-0' : '-left-full md:left-0'}`}
      >
        {/* Collapse Button */}
        <button
          onClick={toggleSidebar}
          className="hidden md:flex absolute -right-3 top-6 z-10 h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-emerald-600 to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <FiChevronRight 
            className={`transition-all duration-500 ${expanded ? 'rotate-180' : ''} ${isHovered ? 'scale-125' : ''}`} 
          />
        </button>

        {/* Profile */}
        <div className={`flex flex-col items-center py-6 px-4 border-b border-green-200 ${!expanded ? 'px-2' : ''}`}>
          <div className="relative h-20 w-20 mb-4 group">
            {isProfileLoaded ? (
              <>
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 opacity-20 animate-pulse-slow group-hover:opacity-30 transition-opacity duration-300"></div>
                <img
                  src={profilePhoto}
                  alt="Staff Profile"
                  className="relative z-10 h-full w-full rounded-full object-cover border-2 border-white shadow-lg group-hover:border-emerald-300 transition-all duration-300 transform group-hover:scale-105"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/default-profile.png";
                    setProfilePhoto("/default-profile.png");
                  }}
                />
              </>
            ) : (
              <div className="h-full w-full rounded-full bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse flex items-center justify-center">
                <FiUser className="text-gray-500 text-3xl" />
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
                className="text-sm text-emerald-600 hover:text-emerald-700 mt-1 flex items-center transition-colors hover:underline"
              >
                <FiEdit className="mr-1" />
                Edit Profile
              </button>
            </>
          )}
        </div>

        {/* Navigation */}
        <nav className="py-4 px-2 border-b border-green-200">
          <ul className="space-y-1">
            <li>
              <button 
                onClick={() => navigate('/ge')} 
                className="flex items-center w-full p-3 rounded-lg transition-all duration-200 bg-gradient-to-r from-transparent hover:from-green-50 hover:to-emerald-50 text-gray-700 hover:text-emerald-700"
              >
                <FiDatabase className="text-emerald-600" /> 
                <span className="ml-3">Request Status</span>
              </button>
            </li>
            
            {[
              { icon: <FiHome className="text-emerald-600" />, label: "Dashboard", route: "dashboard" },
              { icon: <FiClipboard className="text-emerald-600" />, label: "Check Status", route: "status" },
              { icon: <FiSettings className="text-emerald-600" />, label: "Settings", route: "settings" },
            ].map((item) => (
              <li key={item.route}>
                <button
                  onClick={() => handleNavigation(item.route)}
                  className={`flex items-center w-full p-3 rounded-lg transition-all duration-200 ${activeTab === item.route
                    ? 'bg-gradient-to-r from-emerald-50 to-green-100 text-emerald-700 font-medium border-l-4 border-emerald-500'
                    : 'text-gray-700 hover:text-emerald-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50'}`}
                >
                  <span className="text-lg">{item.icon}</span>
                  {expanded && <span className="ml-3">{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Notifications */}
        <div className={`py-4 px-2 border-b border-green-200 ${!expanded ? 'px-1' : ''}`}>
          <div className="flex items-center mb-2 px-2 relative group">
            <div className="relative">
              <FiBell className="text-emerald-600 text-lg group-hover:text-emerald-700 transition-colors" />
              {unreadNotifications > 0 && (
                <span className={`absolute ${expanded ? '-top-1 -right-1' : '-top-1 -right-1'} bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-bounce`}>
                  {unreadNotifications}
                </span>
              )}
            </div>
            {expanded && <span className="ml-3 text-gray-700 group-hover:text-emerald-700 transition-colors">Notifications</span>}
          </div>

          {expanded && hasNotifications && (
            <>
              <ul className="space-y-2 max-h-40 overflow-y-auto">
                {displayNotifications.slice(0, 3).map((notification, index) => (
                  <li
                    key={index}
                    onClick={() => handleNavigation("notifications")}
                    className={`text-xs p-2 rounded cursor-pointer transition-all duration-200 ${!notification.read
                      ? 'bg-gradient-to-r from-emerald-50 to-green-100 text-emerald-700 font-medium border-l-2 border-emerald-400'
                      : 'text-gray-600 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 hover:text-emerald-700'}`}
                  >
                    <div className="flex items-start">
                      {notification.type === 'success' ? (
                        <FiCheckCircle className="text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
                      ) : notification.type === 'error' ? (
                        <FiAlertCircle className="text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                      ) : (
                        <FiClock className="text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                      )}
                      <span>{notification.message}</span>
                    </div>
                  </li>
                ))}
              </ul>
              {displayNotifications.length > 3 && (
                <button
                  onClick={() => handleNavigation("notifications")}
                  className="mt-2 text-xs text-emerald-600 hover:text-emerald-700 w-full text-left px-2 flex items-center transition-colors"
                >
                  <FiChevronRight className="mr-1" />
                  View All
                </button>
              )}
            </>
          )}
          {expanded && !hasNotifications && (
            <p className="text-xs text-gray-500 px-2 flex items-center">
              <FiCheckCircle className="mr-1 text-emerald-500" />
              No notifications
            </p>
          )}
        </div>

        {/* Logout */}
        <div className="absolute bottom- w-full border ">
          <div className={`flex items-center ${expanded ? 'justify-between' : 'justify-center'}`}>
            {expanded && (
              <span className="text-sm font-medium text-gray-700">Logout</span>
            )}
            <Logout
              onLogout={onLogout}
              compact={!expanded}
              className="text-red-600 hover:text-red-700 text-lg transform hover:scale-110 transition-all duration-200"
            />
          </div>
        </div>

        {/* Accent Line */}
        <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-400 to-green-500 opacity-80"></div>
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
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .gradient-animate {
          background-size: 200% 200%;
          animation: gradient-shift 8s ease infinite;
        }
      `}</style>
    </>
  );
};

export default StaffSidebar;