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


import React from 'react';
import { Link } from 'react-router-dom'; // Added for navigation links

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Upper Info Section */}
      <div className="bg-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Location */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm">Bonga University</p>
                <p className="text-sm">Bonga City</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm">Email us:</p>
                <a href="mailto:yohannes@gmail.com" className="text-cyan-500 hover:text-cyan-400">
                  yohannes@gmail.com
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className="text-sm">Call us on:</p>
                <p className="font-semibold">+251 987 294 51</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Widgets Section */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* About */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">About Us</h4>
              <p className="text-sm leading-relaxed">
                Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide with additional clickthroughs.
              </p>
            </div>

            {/* Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Useful Links</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/" className="hover:text-cyan-500 transition-colors">Home</Link></li>
                  <li><Link to="/about" className="hover:text-cyan-500 transition-colors">About Us</Link></li>
                  <li><Link to="/appointment" className="hover:text-cyan-500 transition-colors">Appointment</Link></li>
                  <li><Link to="/testimonials" className="hover:text-cyan-500 transition-colors">Testimonials</Link></li>
                  <li><Link to="/contact" className="hover:text-cyan-500 transition-colors">Contact Us</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Our Services</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link to="#" className="hover:text-cyan-500 transition-colors">Performance Upgrade</Link></li>
                  <li><Link to="#" className="hover:text-cyan-500 transition-colors">Transmission Service</Link></li>
                  <li><Link to="#" className="hover:text-cyan-500 transition-colors">Brake Repair & Service</Link></li>
                  <li><Link to="#" className="hover:text-cyan-500 transition-colors">Engine Service & Repair</Link></li>
                  <li><Link to="#" className="hover:text-cyan-500 transition-colors">Tyre & Wheels</Link></li>
                </ul>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Newsletter</h4>
              <p className="text-sm mb-4">Get latest updates and offers.</p>
              <form className="mb-6">
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-grow px-4 py-2 rounded-l-md bg-gray-700 border-none focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
                  />
                  <button
                    type="submit"
                    className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-r-md text-white transition-colors"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
              <ul className="flex space-x-4">
                <li>
                  <a href="#" className="text-gray-300 hover:text-cyan-500 transition-colors">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-cyan-500 transition-colors">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-1.337-.027-3.063-1.866-3.063-1.872 0-2.159 1.462-2.159 2.971v5.696h-3v-11h2.882v1.528h.041c.401-.761 1.386-1.528 2.847-1.528 3.044 0 3.604 2.005 3.604 4.611v6.389z" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-cyan-500 transition-colors">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm">
            © Copyright <Link to="/" className="text-cyan-500 hover:text-cyan-400">Bonga University</Link> 2025. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;