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
    <footer className="bg-black text-gray-300 shadow-2xl">
      {/* Upper Info Section */}
      <div className="bg-black py-8 animate-bg-shift">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Location with Google Maps (Scenic effect) */}
            <div className="flex items-start space-x-4 group">
              <div className="flex-shrink-0">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Bonga+University"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    className="h-8 w-8 text-cyan-400 group-hover:text-pink-500 transition-colors duration-300"
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
                </a>
              </div>
              <div>
                <p className="text-lg font-bold text-teal-300 group-hover:text-pink-400 transition-colors duration-300">
                  Bonga University
                </p>
                <p className="text-sm text-cyan-200 group-hover:text-yellow-300">
                  Bonga City
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start space-x-4 group">
              <div className="flex-shrink-0">
                <svg
                  className="h-8 w-8 text-cyan-400 group-hover:text-purple-500 transition-colors duration-300"
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
                  className="text-cyan-400 font-bold text-lg group-hover:text-yellow-500 hover:underline transition-all duration-300"
                >
                  yohannes@gmail.com
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start space-x-4 group">
              <div className="flex-shrink-0">
                <svg
                  className="h-8 w-8 text-cyan-400 group-hover:text-teal-500 transition-colors duration-300"
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
                <p className="font-bold text-lg text-cyan-400 group-hover:text-pink-400 transition-colors duration-300">
                  +251 987 294 51
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black py-4 animate-bg-shift">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-lg font-bold text-cyan-300 hover:text-pink-500 transition-colors duration-300">
            © Copyright {" "}
            <Link to="/" className="text-yellow-400 hover:text-purple-500 underline">
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
