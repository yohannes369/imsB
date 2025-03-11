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
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = ({ role, handleLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/home' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Contact Us', path: '/contact' },
  ];

  // Common Navigation Component
  const Navigation = ({ isMobile = false }) => (
    <nav className={`${isMobile ? 'space-y-4' : 'flex items-center space-x-8'}`}>
      {navItems.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className={`${
            isMobile
              ? 'block text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md'
              : 'text-gray-300 hover:text-white hover:border-b-2 hover:border-cyan-500 transition-all duration-200 py-2'
          }`}
          onClick={() => isMobile && setIsMobileMenuOpen(false)}
        >
          {item.name}
        </Link>
      ))}
      {role ? (
        <div className={`${isMobile ? 'space-y-4' : 'flex items-center space-x-4'}`}>
          <span className={`${isMobile ? 'block px-3' : ''} text-gray-300`}>
            Welcome, {role}
          </span>
          <button
            onClick={() => {
              handleLogout();
              if (isMobile) setIsMobileMenuOpen(false);
            }}
            className={`${
              isMobile
                ? 'w-full text-left bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md'
                : 'bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors duration-200'
            }`}
          >
            Logout
          </button>
        </div>
      ) : (
        <Link
          to="/"
          className={`${
            isMobile
              ? 'block bg-cyan-600 hover:bg-cyan-700 text-white px-3 py-2 rounded-md'
              : 'bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-md transition-colors duration-200'
          }`}
          onClick={() => isMobile && setIsMobileMenuOpen(false)}
        >
          Login
        </Link>
      )}
    </nav>
  );

  return (
    <header className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-gray-800 py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-semibold">BONGA UNIVERSITY</span>
              <span className="text-sm">INVENTORY MANAGEMENT SYSTEM</span>
            </div>
            <div className="mt-2 sm:mt-0">
              <span className="text-sm">
                Phone: <strong>+254 456 7890</strong>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold tracking-tight">
              IMS
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
              className="text-gray-300 hover:text-white focus:outline-none"
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
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Navigation isMobile />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;