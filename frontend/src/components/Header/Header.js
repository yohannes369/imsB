import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Import useTranslation

const Header = ({ role, handleLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, i18n } = useTranslation(); // Use the translation hook
  const [language, setLanguage] = useState(i18n.language || "en"); // Default language

  const navItems = [
    { name: t("home"), path: "/home" }, // Translated text
    { name: t("aboutUs"), path: "/about" },
    { name: t("services"), path: "/services" },
    { name: t("contactUs"), path: "/contact" },
  ];

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    i18n.changeLanguage(selectedLanguage); // Change language
  };

  const Navigation = ({ isMobile = false }) => (
    <nav className={`${isMobile ? "space-y-4 py-4" : "flex items-center space-x-8"}`}>
      {navItems.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className={`relative text-lg font-semibold text-gray-200 transition-all duration-300 hover:text-teal-400 group ${
            isMobile ? "block px-4 py-2 rounded-lg" : "px-3 py-2"
          }`}
          onClick={() => isMobile && setIsMobileMenuOpen(false)}
        >
          {item.name}
          <span className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-teal-400 transition-all duration-300 scale-0 group-hover:scale-100"></span>
          <span className="absolute inset-0 rounded-full ring-2 ring-transparent group-hover:ring-teal-400 transition-all duration-300 scale-0 group-hover:scale-100 animate-ping"></span>
        </Link>
      ))}
      {role ? (
        <div className={`${isMobile ? "space-y-4" : "flex items-center space-x-6"}`}>
          <span className="text-lg text-gray-200 font-medium">{t("welcome")}, {role}</span>
          <button
            onClick={() => {
              handleLogout();
              if (isMobile) setIsMobileMenuOpen(false);
            }}
            className="px-6 py-2 text-lg font-bold text-white bg-red-600 rounded-full shadow-md hover:bg-red-700 transition-all"
          >
            {t("logout")}
          </button>
        </div>
      ) : (
        <Link
          to="/"
          className="px-6 py-2 text-lg font-bold text-white bg-teal-600 rounded-full shadow-md hover:bg-teal-700 transition-all"
          onClick={() => isMobile && setIsMobileMenuOpen(false)}
        >
          {t("login")}
        </Link>
      )}
    </nav>
  );

  return (
    <header className="bg-gray-900 text-white shadow-lg sticky top-0 z-50 transition-all duration-500 animate-fade-in hover:animate-pulse">
      <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 py-3 text-center text-2xl font-extrabold text-cyan-400 tracking-wide">
        {t("bongaUniversityIMS")}
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link to="/" className="text-3xl font-extrabold text-teal-400">
          IMS
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Navigation />
          {/* Language Dropdown */}
          <select
            value={language}
            onChange={handleLanguageChange}
            className="bg-gray-800 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
          >
            <option value="en">English</option>
            <option value="am">Amharic</option>
          </select>
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-200 p-2 rounded-md"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-800 shadow-lg py-6 animate-slide-down">
          <Navigation isMobile />
          {/* Language Dropdown for Mobile */}
          <div className="px-4 py-2">
            <select
              value={language}
              onChange={handleLanguageChange}
              className="bg-gray-800 text-white px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-teal-400"
            >
              <option value="en">English</option>
              <option value="am">Amharic</option>
            </select>
          </div>
        </div>
      )}
    </header>
  );
};

// Export the component
export default Header; // Added export statement