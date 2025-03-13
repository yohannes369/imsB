// import React from 'react';
// // import Log
// // import Login from '../pages/Log';
// import { Link } from 'react-router-dom';

// function Header() {
//   return (
//     <div>
    
//       <header className="main-header header-style-one">
//         <div className="header-top">
//           <div className="auto-container">
//             <div className="inner-container">
//               <div className="left-column">
//                 <div className="text">BONGA UNIVERTY</div>
//                 <div className="office-hour">INVENTORY MANAGMET SYSTEM</div>
//               </div>
//               <div className="right-column">
//                 <div className="phone-number"> <strong>254 456 7890</strong></div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="header-upper">
//           <div className="auto-container">
//             <div className="inner-container">
//               <div className="logo-box">
//                 <div className="logo"><a href="/"></a></div>
//               </div>
//               <div className="right-column">
//                 <div className="nav-outer">
//                   <div className="mobile-nav-toggler"><img src="assets/images/icons/icon-bar.png" alt="" /></div>
//                   <nav className="main-menu navbar-expand-md navbar-light">
//                     <div className="collapse navbar-collapse show clearfix" id="navbarSupportedContent">
//                       <ul className="navigation">
//                         <li className="dropdown"><a href="/">Home</a></li>
//                         <li className="dropdown"><a href="/about">About Us</a></li>
//                         <li className="dropdown"><a href="/services">Services</a></li>
//                         <li><a href="/contact">Contact Us</a></li>
//                       </ul>
//                     </div>
//                   </nav>
//                 </div>
//                 <div className="search-btn"></div>
//                 <div className="link-btn">
//                   <Link to="/Log" className="theme-btn btn-style-one">Login</Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="sticky-header">
//           <div className="header-upper">
//             <div className="auto-container">
//               <div className="inner-container">
//                 <div className="logo-box">
//                   <div className="logo"><a href="/">KnightOne</a></div>
//                 </div>
//                 <div className="right-column">
//                   <div className="nav-outer">
//                     <div className="mobile-nav-toggler"><img src="assets/images/icons/icon-bar.png" alt="" /></div>
//                     <nav className="main-menu navbar-expand-md navbar-light"></nav>
//                   </div>
//                   <div className="search-btn"></div>
//                   <div className="link-btn"><a href="/login" className="theme-btn btn-style-one">Login</a></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="mobile-menu">
//           <div className="menu-backdrop"></div>
//           <div className="close-btn"><span className="icon flaticon-remove"></span></div>
//           <nav className="menu-box">
//             <div className="nav-logo"><a href="index.html">KnightOne</a></div>
//             <div className="menu-outer"></div>
//           </nav>
//         </div>
//         <div className="nav-overlay">
//           <div className="cursor"></div>
//           <div className="cursor-follower"></div>
//         </div>
//       </header>
//     </div>
//   );
// }

// export default Header;
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = ({ role, handleLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/home" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact Us", path: "/contact" },
  ];

  // Common Navigation Component
  const Navigation = ({ isMobile = false }) => (
    <nav
      className={`${
        isMobile
          ? "space-y-4 py-4"
          : "flex items-center space-x-8"
      }`}
    >
      {navItems.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className={`relative text-lg font-semibold transition-all duration-300 group ${
            isMobile
              ? "block text-gray-200 hover:text-white hover:bg-gradient-to-r hover:from-teal-600 hover:to-cyan-600 px-4 py-2 rounded-lg shadow-md hover:shadow-xl hover:scale-105"
              : "text-gray-200 hover:text-white px-3 py-2 rounded-md shadow-sm hover:shadow-md"
          }`}
          onClick={() => isMobile && setIsMobileMenuOpen(false)}
        >
          {item.name}
          <span
            className={`absolute inset-0 rounded-md bg-gradient-to-r from-teal-500 to-cyan-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${
              isMobile ? "hidden" : ""
            }`}
          ></span>
          <span
            className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center ${
              isMobile ? "hidden" : ""
            }`}
          ></span>
        </Link>
      ))}
      {role ? (
        <div
          className={`${
            isMobile ? "space-y-4" : "flex items-center space-x-6"
          }`}
        >
          <span
            className={`${
              isMobile ? "block px-4 text-lg" : "text-lg"
            } text-gray-200 font-medium animate-text-glow`}
          >
            Welcome, {role}
          </span>
          <button
            onClick={() => {
              handleLogout();
              if (isMobile) setIsMobileMenuOpen(false);
            }}
            className={`relative inline-flex items-center justify-center px-6 py-2 text-lg font-bold text-white rounded-full shadow-lg transition-all duration-300 transform group ${
              isMobile
                ? "w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
                : "bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 hover:scale-110 hover:shadow-2xl"
            }`}
          >
            Logout
            <span className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
          </button>
        </div>
      ) : (
        <Link
          to="/"
          className={`relative inline-flex items-center justify-center px-6 py-2 text-lg font-bold text-white rounded-full shadow-lg transition-all duration-300 transform group ${
            isMobile
              ? "block bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700"
              : "bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 hover:scale-110 hover:shadow-2xl"
          }`}
          onClick={() => isMobile && setIsMobileMenuOpen(false)}
        >
          Login
          <span className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
        </Link>
      )}
    </nav>
  );

  return (
    <header className="bg-gray-900 text-white shadow-2xl sticky top-0 z-50 transition-all duration-500 hover:bg-[linear-gradient(45deg,#1f2937,#0d9488,#1e40af)]">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 py-3 shadow-md transition-all duration-300 hover:bg-gradient-to-r hover:from-teal-700 hover:via-gray-800 hover:to-cyan-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-bold text-cyan-400 tracking-wide animate-text-glow hover:text-cyan-300 transition-colors duration-300">
                BONGA UNIVERSITY
              </span>
              <span className="text-sm text-gray-300 font-medium hover:text-teal-300 transition-colors duration-300">
                INVENTORY MANAGEMENT SYSTEM
              </span>
            </div>
            <div className="mt-2 sm:mt-0">
              <span className="text-sm text-gray-200 hover:text-teal-300 transition-colors duration-300">
                Phone: <strong className="text-teal-400 hover:text-teal-300">+254 456 7890</strong>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-600 transition-all duration-300 group hover:from-teal-500 hover:to-blue-700 animate-text-glow"
            >
              IMS
              <span className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-500 opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300"></span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <Navigation />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-200 hover:text-white focus:outline-none p-2 rounded-full transition-all duration-300 group hover:bg-gradient-to-r hover:from-teal-500 hover:to-cyan-500 hover:scale-110"
            >
              <svg
                className="h-6 w-6 group-hover:animate-spin-slow"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gradient-to-b from-gray-800 to-gray-900 shadow-lg animate-slide-down transition-all duration-300 hover:bg-gradient-to-b hover:from-teal-700 hover:to-cyan-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Navigation isMobile />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;