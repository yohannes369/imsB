// import React from 'react';

// function Footer(props) {
//   return (
//     <footer className="main-footer">
//       <div className="upper-box">
//         <div className="auto-container">
//           <div className="row no-gutters">
//             <div className="footer-info-box col-md-4 col-sm-6 col-xs-12">
//               <div className="info-inner">
//                 <div className="content">
//                   <div className="icon">
//                     <span className="flaticon-pin"></span>
//                   </div>
//                   <div className="text">bu uv <br /> bonga city </div>
//                 </div>
//               </div>
//             </div>
//             <div className="footer-info-box col-md-4 col-sm-6 col-xs-12">
//               <div className="info-inner">
//                 <div className="content">
//                   <div className="icon">
//                     <span className="flaticon-email"></span>
//                   </div>
//                   <div className="text">Email us : <br /> <a
//                     href="mailto:contact.contact@autorex.com">yohannes@gmail.com</a></div>
//                 </div>
//               </div>
//             </div>
//             <div className="footer-info-box col-md-4 col-sm-6 col-xs-12">
//               <div className="info-inner">
//                 <div className="content">
//                   <div className="icon">
//                     <span className="flaticon-phone"></span>
//                   </div>
//                   <div className="text">Call us on : <br /><strong>+25198729451</strong></div>
//                 </div>
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>
//       <div className="widgets-section">
//         <div className="auto-container">
//           <div className="widgets-inner-container">
//             <div className="row clearfix">
//               <div className="footer-column col-lg-4">
//                 <div className="widget widget_about">
//                   <div className="text">Capitalize on low hanging fruit to identify a ballpark value added
//                     activity to beta test. Override the digital divide additional clickthroughs.
//                   </div>
//                 </div>
//               </div>
//               <div className="footer-column col-lg-4">
//                 <div className="row">
//                   <div className="col-md-6">
//                     <div className="widget widget_links">
//                       <h4 className="widget_title">Usefull Links</h4>
//                       <div className="widget-content">
//                         <ul className="list">
//                           <li><a href="index.html">Home</a></li>
//                           <li><a href="about.html">About Us</a></li>
//                           <li><a href="#">Appointment</a></li>
//                           <li><a href="testimonial.html">Testimonials</a></li>
//                           <li><a href="contact.html">Contact Us</a></li>
//                         </ul>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="col-md-6">
//                     <div className="widget widget_links">
//                       <h4 className="widget_title">Our Services</h4>
//                       <div className="widget-content">
//                         <ul className="list">
//                           <li><a href="#">Performance Upgrade</a></li>
//                           <li><a href="#">Transmission Service</a></li>
//                           <li><a href="#">Break Repair & Service</a></li>
//                           <li><a href="#">Engine Service & Repair</a></li>
//                           <li><a href="#">Trye & Wheels</a></li>
//                         </ul>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="footer-column col-lg-4">
//                 <div className="widget widget_newsletter">
//                   <h4 className="widget_title">Newsletter</h4>
//                   <div className="text">Get latest updates and offers.</div>
//                   <div className="newsletter-form">
//                   </div>
//                   <ul className="social-links">
//                     <li><a href="#"><span className="fab fa-facebook-f"></span></a></li>
//                     <li><a href="#"><span className="fab fa-linkedin-in"></span></a></li>
//                     <li><a href="#"><span className="fab fa-twitter"></span></a></li>
//                     <li><a href="#"><span className="fab fa-google-plus-g"></span></a></li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="auto-container">
//         <div className="footer-bottom">
//           <div className="copyright-text">© Copyright <a href="#">Abe Garage</a> 2023 . All right reserved.</div>
//         </div>
//       </div>
//     </footer>
//   );
// }

// export default Footer;


import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-tl from-purple-900 via-teal-900 to-blue-900 text-gray-300 shadow-2xl">
      {/* Upper Info Section */}
      <div className="bg-gradient-to-r from-purple-800 via-teal-800 to-blue-800 py-8 animate-bg-shift">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Location */}
            <div className="flex items-start space-x-4 group">
              <div className="flex-shrink-0">
                <svg
                  className="h-8 w-8 text-cyan-400 animate-spin-and-bounce group-hover:text-pink-500 transition-colors duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-lg font-bold text-teal-300 animate-text-glow group-hover:text-pink-400 transition-colors duration-300">
                  Bonga University
                </p>
                <p className="text-sm text-cyan-200 animate-pulse-fast group-hover:text-yellow-300">
                  Bonga City
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start space-x-4 group">
              <div className="flex-shrink-0">
                <svg
                  className="h-8 w-8 text-cyan-400 animate-wiggle group-hover:text-purple-500 transition-colors duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-teal-300">Email us:</p>
                <a
                  href="mailto:yohannes@gmail.com"
                  className="text-cyan-400 font-bold text-lg animate-text-pulse group-hover:text-yellow-500 hover:underline transition-all duration-300"
                >
                  yohannes@gmail.com
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start space-x-4 group">
              <div className="flex-shrink-0">
                <svg
                  className="h-8 w-8 text-cyan-400 animate-bounce-slow group-hover:text-teal-500 transition-colors duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-teal-300">Call us on:</p>
                <p className="font-bold text-lg text-cyan-400 animate-text-glow group-hover:text-pink-400 transition-colors duration-300">
                  +251 987 294 51
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Widgets Section */}
      <div className="py-12 bg-gradient-to-b from-teal-900 to-purple-900 animate-bg-shift">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* About */}
            <div>
              <h4 className="text-2xl font-extrabold text-white mb-4 animate-text-flip bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500 text-transparent">
                About Us
              </h4>
              <p className="text-sm leading-relaxed text-teal-200 animate-pulse-slow hover:text-yellow-300 transition-colors duration-300">
                Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide with additional clickthroughs.
              </p>
            </div>

            {/* Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <h4 className="text-2xl font-extrabold text-white mb-4 animate-text-flip bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500 text-transparent">
                  Useful Links
                </h4>
                <ul className="space-y-3 text-sm">
                  {["Home", "About Us", "Appointment", "Testimonials", "Contact Us"].map((link) => (
                    <li key={link}>
                      <Link
                        to={link === "Home" ? "/" : `/${link.toLowerCase().replace(" ", "")}`}
                        className="text-cyan-300 hover:text-pink-500 hover:scale-110 transform transition-all duration-300 animate-float"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-2xl font-extrabold text-white mb-4 animate-text-flip bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500 text-transparent">
                  Our Services
                </h4>
                <ul className="space-y-3 text-sm">
                  {[
                    "Performance Upgrade",
                    "Transmission Service",
                    "Brake Repair & Service",
                    "Engine Service & Repair",
                    "Tyre & Wheels",
                  ].map((service) => (
                    <li key={service}>
                      <Link
                        to="#"
                        className="text-cyan-300 hover:text-yellow-500 hover:scale-110 transform transition-all duration-300 animate-float"
                      >
                        {service}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-2xl font-extrabold text-white mb-4 animate-text-flip bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500 text-transparent">
                Newsletter
              </h4>
              <p className="text-sm mb-4 text-teal-200 animate-pulse-slow hover:text-pink-400 transition-colors duration-300">
                Get latest updates and offers.
              </p>
              <form className="mb-6">
                <div className="flex group">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-grow px-4 py-3 rounded-l-full bg-gradient-to-r from-gray-800 to-teal-900 border-none focus:outline-none focus:ring-4 focus:ring-cyan-500 text-white shadow-lg animate-pulse-fast group-hover:shadow-xl transition-all duration-300"
                  />
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 px-6 py-3 rounded-r-full text-white font-bold shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-bounce-in"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
              <ul className="flex space-x-6 justify-center">
                {[
                  { icon: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z", color: "cyan-500" },
                  {
                    icon: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-1.337-.027-3.063-1.866-3.063-1.872 0-2.159 1.462-2.159 2.971v5.696h-3v-11h2.882v1.528h.041c.401-.761 1.386-1.528 2.847-1.528 3.044 0 3.604 2.005 3.604 4.611v6.389z",
                    color: "purple-500",
                  },
                  {
                    icon: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z",
                    color: "teal-500",
                  },
                ].map((social, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className={`text-${social.color} hover:text-pink-400 hover:scale-125 transform transition-all duration-300 animate-spin-and-grow`}
                    >
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d={social.icon} />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gradient-to-r from-purple-800 via-teal-800 to-blue-800 py-4 animate-bg-shift">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-lg font-bold text-cyan-300 animate-text-glow hover:text-pink-500 transition-colors duration-300">
            © Copyright{" "}
            <Link to="/" className="text-yellow-400 hover:text-purple-500 underline animate-pulse-fast">
              Bonga University
            </Link>{" "}
            2025. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;