



// // import React, { useState } from "react";
// // import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// // import Login from "./components/pages/Log";
// // import UpdateUser from "./components/Admin/edit";
// // import AddUser from "./components/Admin/add";
// // import Admindashboard from "./components/pages/admin";
// // import Managerdashboard from "./components/pages/manager";
// // import Cl from "./components/clerk/cl";
// // import './styles/tailwind.css';
// // //add item
// // import AddItem from "./components/clerk/f";
// //  import EditForm from "./components/clerk/Editform";
// // import Header from "./components/Header/Header";
// // import Footer from "./components/Footer/Footer";
// // import AdminAuthorize from "./middleware/auth"; // Import AdminAuthorize
 

// // import "./assets/template_assets/css/bootstrap.css";
// // import "./assets/template_assets/css/style.css";
// // import "./assets/template_assets/css/responsive.css";
// // import "./assets/template_assets/css/color.css";
// // import "./assets/styles/custom.css";

// // const App = () => {
// //   const [role, setRole] = useState(null);

// //   return (
// //     <Router>
// //       <div className="App">
// //         <Header />
// //         <Routes>
// //           {/* Route for the home page (Login) */}
// //           <Route
// //             path="/"
// //             element={
// //               !role ? (
// //                 <Login setRole={setRole} /> // Show login if no role is assigned
// //               ) : role === "Admin" ? (
// //                 <Navigate to="/admin" /> // Redirect Admin to Admin Dashboard
// //               ) : role === "Manager" ? (
// //                 <Navigate to="/manager" /> // Redirect Manager to Manager Dashboard
// //               ) : role === "Clerk" ? (
// //                 <Navigate to="/cl" />
// //               ) : (
// //                 <div>Unauthorized</div> // Unauthorized if no valid role
// //               )
// //             }
// //           />
          
// //           {/* Admin Routes */}
       


// //        <Route  
// //           path="/edit"
// //           element={
// //             <AdminAuthorize>
// //               <UpdateUser />
// //             </AdminAuthorize>
// //              }
// //              />

// //           <Route
// //             path="/add"
// //             element={
// //               <AdminAuthorize>
// //                 <AddUser /> {/* Admin can add new user */}
// //               </AdminAuthorize>
// //             }
// //           />


// //             <Route
// //             path="/additem"
// //             element={
// //               <AdminAuthorize>
// //                 <AddItem /> {/* add item by  */}
// //               </AdminAuthorize>
// //             }
// //           />

// //           <Route
// //             path="/editform/:id"
// //             element={
// //               <AdminAuthorize>
// //                 <EditForm /> {/* edit item by  */}
// //               </AdminAuthorize>
              
// //             }
// //           />

       


// //           <Route path="/admin" element={<Admindashboard />} /> {/* Admin Dashboard */}

// //           {/* Manager Route */}
// //           <Route path="/manager" element={<Managerdashboard />} /> {/* Manager Dashboard */}

// //           {/* Clerk Route */}
// //           <Route path="/cl" element={<Cl />} />

// //           {/* You can add more routes here for other roles or features */}
// //           <Route path="/user" element={<div>User Dashboard</div>} /> {/* User Dashboard */}
// //         </Routes>
        
// //         <Footer />
// //       </div>
// //     </Router>
// //   );
// // };

// // export default App;



// // import React, { useState } from "react";
// // import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// // import Login from "./components/pages/Log";
// // import UpdateUser from "./components/Admin/edit";
// // import AddUser from "./components/Admin/add";
// // import Admindashboard from "./components/pages/admin";
// // import Managerdashboard from "./components/pages/manager";
// // import Cl from "./components/clerk/cl";
// // import './styles/tailwind.css';
// // //add item
// // import AddItem from "./components/clerk/f";
// // import EditForm from "./components/clerk/Editform";
// // import Header from "./components/Header/Header";
// // import Footer from "./components/Footer/Footer";
// // import AdminAuthorize from "./middleware/auth"; // Import AdminAuthorize

// // import "./assets/template_assets/css/bootstrap.css";
// // import "./assets/template_assets/css/style.css";
// // import "./assets/template_assets/css/responsive.css";
// // import "./assets/template_assets/css/color.css";
// // import "./assets/styles/custom.css";

// // const App = () => {
// //   const [role, setRole] = useState(null);

// //   return (
// //     <Router>
// //       <div className="App">
// //         <Header />
// //         <Routes>
// //           {/* Route for the home page (Login) */}
// //           <Route
// //             path="/"
// //             element={
// //               !role ? (
// //                 <Login setRole={setRole} /> // Show login if no role is assigned
// //               ) : role === "Admin" ? (
// //                 <Navigate to="/admin" /> // Redirect Admin to Admin Dashboard
// //               ) : role === "Manager" ? (
// //                 <Navigate to="/manager" /> // Redirect Manager to Manager Dashboard
// //               ) : role === "Clerk" ? (
// //                 <Navigate to="/cl" />
// //               ) : (
// //                 <div>Unauthorized</div> // Unauthorized if no valid role
// //               )
// //             }
// //           />
          
// //           {/* Admin Routes */}
// //           <Route  
// //             path="/edit/:id"
// //             element={
// //               <AdminAuthorize>
// //                 <UpdateUser />
// //               </AdminAuthorize>
// //             }
// //           />

// //           <Route
// //             path="/add"
// //             element={
// //               <AdminAuthorize>
// //                 <AddUser /> {/* Admin can add new user */}
// //               </AdminAuthorize>
// //             }
// //           />

// //           <Route
// //             path="/additem"
// //             element={
// //               <AdminAuthorize>
// //                 <AddItem /> {/* add item by  */}
// //               </AdminAuthorize>
// //             }
// //           />

// //           <Route
// //             path="/editform/:id"
// //             element={
// //               <AdminAuthorize>
// //                 <EditForm /> {/* edit item by  */}
// //               </AdminAuthorize>
// //             }
// //           />

// //           <Route path="/admin" element={<Admindashboard />} /> {/* Admin Dashboard */}

// //           {/* Manager Route */}
// //           <Route path="/manager" element={<Managerdashboard />} /> {/* Manager Dashboard */}

// //           {/* Clerk Route */}
// //           <Route path="/cl" element={<Cl />} />

// //           {/* You can add more routes here for other roles or features */}
// //           <Route path="/user" element={<div>User Dashboard</div>} /> {/* User Dashboard */}
// //         </Routes>
        
// //         <Footer />
// //       </div>
// //     </Router>
// //   );
// // };

// // export default App;





// // import React, { useState } from "react";
// // import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
// // import Login from "./components/pages/Log";
// // import UpdateUser from "./components/Admin/edit";
// // import AddUser from "./components/Admin/add";
// // import AdminDashboard from "./components/Admin/admin";
// // import ManagerDashboard from "./components/pages/manager";
// // import Cl from "./components/clerk/cl";
// // import AddItem from "./components/clerk/f";
// // import EditForm from "./components/clerk/Editform";
// // import Header from "./components/Header/Header";
// // import Footer from "./components/Footer/Footer";
// // import "./styles/tailwind.css";
// // import "./assets/template_assets/css/bootstrap.css";
// // import "./assets/template_assets/css/style.css";
// // import "./assets/template_assets/css/responsive.css";
// // import "./assets/template_assets/css/color.css";
// // import "./assets/styles/custom.css";
// // import Contact from "./components/pages/about";


// // import Services from "./components/pages/services";
// // import Home from "./components/pages/home";
// // const Layout = ({ role, handleLogout, children }) => {
// //   const location = useLocation();
// //   return (
// //     <>
// //       {location.pathname === "/" && !role && <Header role={role} handleLogout={handleLogout} />}
// //       {children}
// //       <Footer />
// //     </>
// //   );
// // };

// // const App = () => {
// //   const [role, setRole] = useState(null);

// //   const handleLogout = () => {
// //     setRole(null);
// //     localStorage.removeItem("role"); // If using localStorage
// //     // Add any additional logout logic (e.g., clear tokens)
// //   };

// //   return (
// //     <Router>
// //       <div className="App">
// //         <Routes>
// //           <Route
// //             path="/"
// //             element={
// //               <Layout role={role} handleLogout={handleLogout}>
// //                 {!role ? (
// //                   <Login setRole={setRole} />
// //                 ) : role === "Admin" ? (
// //                   <Navigate to="/admin" />
// //                 ) : role === "Manager" ? (
// //                   <Navigate to="/manager" />
// //                 ) : role === "Clerk" ? (
// //                   <Navigate to="/cl" />
// //                 ) : (
// //                   <div>Unauthorized</div>
// //                 )}
// //               </Layout>
// //             }
// //           />
// //           <Route
// //             path="/edit/:id"
// //             element={
// //               <Layout role={role} handleLogout={handleLogout}>
// //                 <UpdateUser />
// //               </Layout>
// //             }
// //           />
// //           <Route
// //             path="/add"
// //             element={
// //               <Layout role={role} handleLogout={handleLogout}>
// //                 <AddUser />
// //               </Layout>
// //             }
// //           />
// //           <Route
// //             path="/admin"
// //             element={
// //               <Layout role={role} handleLogout={handleLogout}>
// //                 <AdminDashboard onLogout={handleLogout} />
// //               </Layout>
// //             }
// //           />
// //           <Route
// //             path="/additem"
// //             element={
// //               <Layout role={role} handleLogout={handleLogout}>
// //                 <AddItem />
// //               </Layout>
// //             }
// //           />
// //           <Route
// //             path="/editform/:id"
// //             element={
// //               <Layout role={role} handleLogout={handleLogout}>
// //                 <EditForm />
// //               </Layout>
// //             }
// //           />
// //           <Route
// //             path="/cl"
// //             element={
// //               <Layout role={role} handleLogout={handleLogout}>
// //                 <Cl />
// //               </Layout>
// //             }
// //           />
// //           <Route
// //             path="/manager"
// //             element={
// //               <Layout role={role} handleLogout={handleLogout}>
// //                 <ManagerDashboard />
// //               </Layout>
// //             }
// //           />
// //           <Route
// //             path="/user"
// //             element={
// //               <Layout role={role} handleLogout={handleLogout}>
// //                 <div>User Dashboard</div>
// //               </Layout>
// //             }
// //           />
// //              <Route
// //             path="/services"
// //             element={
// //               <Layout role={role} handleLogout={handleLogout}>
// //                 <Services />
// //               </Layout>
// //             }
// //           />
// //              <Route
// //             path="/contact"
// //             element={
// //               <Layout role={role} handleLogout={handleLogout}>
// //                 <Contact />
// //               </Layout>
// //             }
// //           />

// //            <Route
// //             path="/home"
// //             element={
// //               <Layout role={role} handleLogout={handleLogout}>
// //                 <Home />
// //               </Layout>
// //             }
// //           />
// //                     <Route
// //             path="/service"
// //             element={
// //               <Layout role={role} handleLogout={handleLogout}>
// //                 <Services />
// //               </Layout>
// //             }
// //           />
// //         </Routes>
        
// //       </div>
// //     </Router>
// //   );
// // };

// // export default App;











// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
// import Login from "./components/pages/Log";
// import UpdateUser from "./components/Admin/edit";
// import AddUser from "./components/Admin/add";
// import AdminDashboard from "./components/Admin/admin";
// import ManagerDashboard from "./components/pages/manager";
// //IMPORT STAFF

// import Department from "./components/Department/departement";
// import Staff from "./components/Staff/staff";
// import RequestForm from "./components/Staff/RequestForm";
// import Cl from "./components/clerk/cl";
// import AddItem from "./components/clerk/f";
// import EditForm from "./components/clerk/Editform";
// import Header from "./components/Header/Header";
// import Footer from "./components/Footer/Footer";
// import "./styles/tailwind.css";
// import "./assets/template_assets/css/bootstrap.css";
// import "./assets/template_assets/css/style.css";
// import "./assets/template_assets/css/responsive.css";
// import "./assets/template_assets/css/color.css";
// import "./assets/styles/custom.css";
// import Contact from "./components/pages/about";
// import Services from "./components/pages/services";
// import Home from "./components/pages/home";
// import "./i18n"; // Import i18n configuration

// const Layout = ({ role, handleLogout, children }) => {
//   const location = useLocation();
//   return (
//     <>
//       {location.pathname === "/" && !role && <Header role={role} handleLogout={handleLogout} />}
//       {children}
//       <Footer />
//     </>
//   );
// };

// const App = () => {
//   const [role, setRole] = useState(null);

//   const handleLogout = () => {
//     setRole(null);
//     localStorage.removeItem("role"); // If using localStorage
//     // Add any additional logout logic (e.g., clear tokens)
//   };

//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           <Route
//             path="/"
//             element={
//               <Layout role={role} handleLogout={handleLogout}>
//                 {!role ? (
//                   <Login setRole={setRole} />
//                 ) : role === "Admin" ? (
//                   <Navigate to="/admin" />
//                 ) : role === "Manager" ? (
//                   <Navigate to="/manager" />
//                 ) : role === "Clerk" ? (
//                   <Navigate to="/cl" />
//                 ) :role === "Staff" ? (
//                   (
//                   <Navigate to="/staff" />
//                 )
              
//               ) : role === "Department" ? (
//                 <Navigate to="/departement" />



//                 ) : (
//                   <div>Unauthorized</div>
//                 )}
//               </Layout>
//             }
//           />
//           <Route
//             path="/edit/:id"
//             element={
//               <Layout role={role} handleLogout={handleLogout}>
//                 <UpdateUser />
//               </Layout>
//             }
//           />
//           <Route
//             path="/add"
//             element={
//               <Layout role={role} handleLogout={handleLogout}>
//                 <AddUser />
//               </Layout>
//             }
//           />
//           <Route
//             path="/admin"
//             element={
//               <Layout role={role} handleLogout={handleLogout}>
//                 <AdminDashboard onLogout={handleLogout} />
//               </Layout>
//             }
//           />
//           <Route
//             path="/additem"
//             element={
//               <Layout role={role} handleLogout={handleLogout}>
//                 <AddItem />
//               </Layout>
//             }
//           />
//           <Route
//             path="/editform/:id"
//             element={
//               <Layout role={role} handleLogout={handleLogout}>
//                 <EditForm />
//               </Layout>
//             }
//           />
//           <Route
//             path="/cl"
//             element={
//               <Layout role={role} handleLogout={handleLogout}>
//                 <Cl />
//               </Layout>
//             }
//           />
//           <Route
//             path="/manager"
//             element={
//               <Layout role={role} handleLogout={handleLogout}>
//                 <ManagerDashboard />
//               </Layout>
//             }
//           />
//           <Route
//             path="/user"
//             element={
//               <Layout role={role} handleLogout={handleLogout}>
//                 <div>User Dashboard</div>
//               </Layout>
//             }
//           />
//           <Route
//             path="/services"
//             element={
//               <Layout role={role} handleLogout={handleLogout}>
//                 <Services />
//               </Layout>
//             }
//           />
//           <Route
//             path="/contact"
//             element={
//               <Layout role={role} handleLogout={handleLogout}>
//                 <Contact />
//               </Layout>
//             }
//           />
//           <Route
//             path="/home"
//             element={
//               <Layout role={role} handleLogout={handleLogout}>
//                 <Home />
//               </Layout>
//             }
//           />
//           <Route
//             path="/service"
//             element={
//               <Layout role={role} handleLogout={handleLogout}>
//                 <Services />
//               </Layout>
//             }
//           />
//           <Route  
//             path="/staff"
//             element={
//               <Layout role={role} handleLogout={handleLogout}>
//                 <Staff />
//               </Layout>

              
         
//             }
//           />

      
          


//                <Route  
//             path="/departement"
//             element={
//               <Layout role={role} handleLogout={handleLogout}>
//                 <Department />
//               </Layout>

              
         
//             }
//           />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./components/pages/Log";
import UpdateUser from "./components/Admin/edit";
import AddUser from "./components/Admin/add";
import AdminDashboard from "./components/Admin/admin";

import ManagerDashboard from "./components/Manager/manager";
import Cl from "./components/clerk/cl";
import Clerkdashboard from "./components/clerk/Clerk";

import AcceptedRequests from "./components/clerk/accpted";

import Notification from "./components/clerk/notify";
import ReportPage from "./components/clerk/report";
import AddItem from "./components/clerk/f";
import EditForm from "./components/clerk/Editform";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "./styles/tailwind.css";
import "./assets/template_assets/css/bootstrap.css";
import "./assets/template_assets/css/style.css";
import "./assets/template_assets/css/responsive.css";
import "./assets/template_assets/css/color.css";
import "./assets/styles/custom.css";
import Contact from "./components/pages/about";
import Services from "./components/pages/services";
import Home from "./components/pages/home";

import Staff from "./components/Staff/staff";
import RequestList from "./components/Staff/RequestList";
import Notifications from "./components/Staff/Notifications";

import Not from "./components/Staff/ge";
import Chatbot from "./components/Chatbot";
import Department from "./components/Department/department";
import DepartmentPage from "./components/Department/DepartmentPage";
import Sidebar from "./components/Department/side";
import "./i18n"; // Import i18n configuration

const Layout = ({ role, handleLogout, children }) => {
  const location = useLocation();
  return (
    <>
      {location.pathname === "/" && !role && <Header role={role} handleLogout={handleLogout} />}
      {children}
      <Footer />
    </>
  );
};

const App = () => {
  const [role, setRole] = useState(null);

  const handleLogout = () => {
    setRole(null);
    localStorage.removeItem("role"); // If using localStorage
    // Add any additional logout logic (e.g., clear tokens)
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <Layout role={role} handleLogout={handleLogout}>
                {!role ? (
                  <Login setRole={setRole} />
                ) : role === "Admin" ? (
                  <Navigate to="/admin" />
                ) : role === "Manager" ? (
                  <Navigate to="/manager" />
                ) : role === "Clerk" ? (
                  <Navigate to="/cl" />
                ) : role === "Staff" ? (
                  <Navigate to="/staff" />
                ) : role === "Department" ? (
                  <Navigate to="/department" />
                ) : (
                  <div>Unauthorized</div>
                )}
              </Layout>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <Layout role={role} handleLogout={handleLogout}>
                <UpdateUser />
              </Layout>
            }
          />
          <Route
            path="/add"
            element={
              <Layout role={role} handleLogout={handleLogout}>
                <AddUser />
              </Layout>
            }
          />
          <Route
            path="/admin"
            element={
              <Layout role={role} handleLogout={handleLogout}>
                <AdminDashboard onLogout={handleLogout} />
              </Layout>
            }
          />
          <Route
            path="/additem"
            element={
              <Layout role={role} handleLogout={handleLogout}>
                <AddItem />
              </Layout>
            }
          />
          <Route
            path="/editform/:id"
            element={
              <Layout role={role} handleLogout={handleLogout}>
                <EditForm />
              </Layout>
            }
          />
          <Route
            path="/cl"
            element={
              <Layout role={role} handleLogout={handleLogout}>
                <Cl />
              </Layout>
            }
          />
          
          <Route
            path="/clerk"
            element={
              <Layout role={role} handleLogout={handleLogout}>
                <Clerkdashboard />
              </Layout>
            }
          />
            <Route
            path="/report"
            element={
              <Layout role={role} handleLogout={handleLogout}>
                <ReportPage />
              </Layout>
            }
          />
          <Route
            path="/notify"
            element={
              <Layout role={role} handleLogout={handleLogout}>
                <Notification />
              </Layout>
            }
          />
       <Route
            path="/accepted"
            element={
              <Layout role={role} handleLogout={handleLogout}>
                < AcceptedRequests/>
              </Layout>
            }
          />


          <Route
            path="/manager"
            element={
              <Layout role={role} handleLogout={handleLogout}>
                <ManagerDashboard />
              </Layout>
            }
          />
          <Route
            path="/user"
            element={
              <Layout role={role} handleLogout={handleLogout}>
                <div>User Dashboard</div>
              </Layout>
            }
          />
          <Route
            path="/services"
            element={
              <Layout role={role} handleLogout={handleLogout}>
                <Services />
              </Layout>
            }
          />
          <Route
            path="/contact"
            element={
              <Layout role={role} handleLogout={handleLogout}>
                <Contact />
              </Layout>
            }
          />
          <Route
            path="/home"
            element={
              <Layout role={role} handleLogout={handleLogout}>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/service"
            element={
              <Layout role={role} handleLogout={handleLogout}>
                <Services />
              </Layout>
            }
          />
          <Route
            path="/staff"
            element={
              <Layout role={role} handleLogout={handleLogout}>
                <Staff />
              </Layout>
            }
          />
         
          <Route
            path="/notifications"
            element={
              <Layout role={role} handleLogout={handleLogout}>
                <Notifications />
              </Layout>
            }
          />
        
        <Route
            path="/ge"
            element={
              <Layout role={role} handleLogout={handleLogout}>
                <Not />
              </Layout>
            }
          />



          <Route
            path="/department"
            element={
              <Layout role={role} handleLogout={handleLogout}>
                <Department/>
              </Layout>
            }
          />
          <Route
            path="/departmentpage"
            element={
              <Layout role={role} handleLogout={handleLogout}>
                <DepartmentPage/>
              </Layout>
            }
          />
            <Route
            path="/side"
            element={
              <Layout role={role} handleLogout={handleLogout}>
                <Sidebar />
              </Layout>
            }
            
            />
          <Route
            path="/chatbot"
            element={
              <Layout role={role} handleLogout={handleLogout}>
                <Chatbot />
              </Layout>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;