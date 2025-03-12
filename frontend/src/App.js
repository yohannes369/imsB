



// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./components/pages/Log";
// import UpdateUser from "./components/Admin/edit";
// import AddUser from "./components/Admin/add";
// import Admindashboard from "./components/pages/admin";
// import Managerdashboard from "./components/pages/manager";
// import Cl from "./components/clerk/cl";
// import './styles/tailwind.css';
// //add item
// import AddItem from "./components/clerk/f";
//  import EditForm from "./components/clerk/Editform";
// import Header from "./components/Header/Header";
// import Footer from "./components/Footer/Footer";
// import AdminAuthorize from "./middleware/auth"; // Import AdminAuthorize
 

// import "./assets/template_assets/css/bootstrap.css";
// import "./assets/template_assets/css/style.css";
// import "./assets/template_assets/css/responsive.css";
// import "./assets/template_assets/css/color.css";
// import "./assets/styles/custom.css";

// const App = () => {
//   const [role, setRole] = useState(null);

//   return (
//     <Router>
//       <div className="App">
//         <Header />
//         <Routes>
//           {/* Route for the home page (Login) */}
//           <Route
//             path="/"
//             element={
//               !role ? (
//                 <Login setRole={setRole} /> // Show login if no role is assigned
//               ) : role === "Admin" ? (
//                 <Navigate to="/admin" /> // Redirect Admin to Admin Dashboard
//               ) : role === "Manager" ? (
//                 <Navigate to="/manager" /> // Redirect Manager to Manager Dashboard
//               ) : role === "Clerk" ? (
//                 <Navigate to="/cl" />
//               ) : (
//                 <div>Unauthorized</div> // Unauthorized if no valid role
//               )
//             }
//           />
          
//           {/* Admin Routes */}
       


//        <Route  
//           path="/edit"
//           element={
//             <AdminAuthorize>
//               <UpdateUser />
//             </AdminAuthorize>
//              }
//              />

//           <Route
//             path="/add"
//             element={
//               <AdminAuthorize>
//                 <AddUser /> {/* Admin can add new user */}
//               </AdminAuthorize>
//             }
//           />


//             <Route
//             path="/additem"
//             element={
//               <AdminAuthorize>
//                 <AddItem /> {/* add item by  */}
//               </AdminAuthorize>
//             }
//           />

//           <Route
//             path="/editform/:id"
//             element={
//               <AdminAuthorize>
//                 <EditForm /> {/* edit item by  */}
//               </AdminAuthorize>
              
//             }
//           />

       


//           <Route path="/admin" element={<Admindashboard />} /> {/* Admin Dashboard */}

//           {/* Manager Route */}
//           <Route path="/manager" element={<Managerdashboard />} /> {/* Manager Dashboard */}

//           {/* Clerk Route */}
//           <Route path="/cl" element={<Cl />} />

//           {/* You can add more routes here for other roles or features */}
//           <Route path="/user" element={<div>User Dashboard</div>} /> {/* User Dashboard */}
//         </Routes>
        
//         <Footer />
//       </div>
//     </Router>
//   );
// };

// export default App;



// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./components/pages/Log";
// import UpdateUser from "./components/Admin/edit";
// import AddUser from "./components/Admin/add";
// import Admindashboard from "./components/pages/admin";
// import Managerdashboard from "./components/pages/manager";
// import Cl from "./components/clerk/cl";
// import './styles/tailwind.css';
// //add item
// import AddItem from "./components/clerk/f";
// import EditForm from "./components/clerk/Editform";
// import Header from "./components/Header/Header";
// import Footer from "./components/Footer/Footer";
// import AdminAuthorize from "./middleware/auth"; // Import AdminAuthorize

// import "./assets/template_assets/css/bootstrap.css";
// import "./assets/template_assets/css/style.css";
// import "./assets/template_assets/css/responsive.css";
// import "./assets/template_assets/css/color.css";
// import "./assets/styles/custom.css";

// const App = () => {
//   const [role, setRole] = useState(null);

//   return (
//     <Router>
//       <div className="App">
//         <Header />
//         <Routes>
//           {/* Route for the home page (Login) */}
//           <Route
//             path="/"
//             element={
//               !role ? (
//                 <Login setRole={setRole} /> // Show login if no role is assigned
//               ) : role === "Admin" ? (
//                 <Navigate to="/admin" /> // Redirect Admin to Admin Dashboard
//               ) : role === "Manager" ? (
//                 <Navigate to="/manager" /> // Redirect Manager to Manager Dashboard
//               ) : role === "Clerk" ? (
//                 <Navigate to="/cl" />
//               ) : (
//                 <div>Unauthorized</div> // Unauthorized if no valid role
//               )
//             }
//           />
          
//           {/* Admin Routes */}
//           <Route  
//             path="/edit/:id"
//             element={
//               <AdminAuthorize>
//                 <UpdateUser />
//               </AdminAuthorize>
//             }
//           />

//           <Route
//             path="/add"
//             element={
//               <AdminAuthorize>
//                 <AddUser /> {/* Admin can add new user */}
//               </AdminAuthorize>
//             }
//           />

//           <Route
//             path="/additem"
//             element={
//               <AdminAuthorize>
//                 <AddItem /> {/* add item by  */}
//               </AdminAuthorize>
//             }
//           />

//           <Route
//             path="/editform/:id"
//             element={
//               <AdminAuthorize>
//                 <EditForm /> {/* edit item by  */}
//               </AdminAuthorize>
//             }
//           />

//           <Route path="/admin" element={<Admindashboard />} /> {/* Admin Dashboard */}

//           {/* Manager Route */}
//           <Route path="/manager" element={<Managerdashboard />} /> {/* Manager Dashboard */}

//           {/* Clerk Route */}
//           <Route path="/cl" element={<Cl />} />

//           {/* You can add more routes here for other roles or features */}
//           <Route path="/user" element={<div>User Dashboard</div>} /> {/* User Dashboard */}
//         </Routes>
        
//         <Footer />
//       </div>
//     </Router>
//   );
// };

// export default App;

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/pages/Log";
import UpdateUser from "./components/Admin/edit"; // Assuming this is your EditUser component
import AddUser from "./components/Admin/add";
import FetchDataComponent from "./components/Admin/fetch"; // Added for /admin route
import ManagerDashboard from "./components/pages/manager"; // Renamed for clarity
import ClerkDashboard from "./components/clerk/cl"; // Renamed for clarity
import AddItem from "./components/clerk/f";
import EditForm from "./components/clerk/Editform";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AdminAuthorize from "./middleware/auth"; // Middleware for admin routes
import "./styles/tailwind.css";
import "./assets/template_assets/css/bootstrap.css";
import "./assets/template_assets/css/style.css";
import "./assets/template_assets/css/responsive.css";
import "./assets/template_assets/css/color.css";
import "./assets/styles/custom.css";

const App = () => {
  const [role, setRole] = useState(localStorage.getItem("role") || null); // Persist role in localStorage

  // Update role in localStorage when it changes
  const handleSetRole = (newRole) => {
    setRole(newRole);
    if (newRole) {
      localStorage.setItem("role", newRole);
    } else {
      localStorage.removeItem("role");
    }
  };

  return (
    <Router>
      <div className="App min-h-screen bg-gradient-to-tr from-purple-100 via-teal-100 to-blue-100 animate-bg-shift">
        <Header />
        <main className="flex-grow p-6">
          <Routes>
            {/* Root Route (Login) */}
            <Route
              path="/"
              element={
                !role ? (
                  <Login setRole={handleSetRole} /> // Pass custom setRole handler
                ) : role === "Admin" ? (
                  <Navigate to="/admin" replace />
                ) : role === "Manager" ? (
                  <Navigate to="/manager" replace />
                ) : role === "Clerk" ? (
                  <Navigate to="/cl" replace />
                ) : (
                  <div className="text-center text-red-600 py-12 text-2xl font-bold animate-wobble">
                    Unauthorized Role
                  </div>
                )
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <AdminAuthorize role={role}>
                  <FetchDataComponent />
                </AdminAuthorize>
              }
            />
            <Route
              path="/add"
              element={
                <AdminAuthorize role={role}>
                  <AddUser />
                </AdminAuthorize>
              }
            />
            <Route
              path="/edit/:id"
              element={
                <AdminAuthorize role={role}>
                  <UpdateUser />
                </AdminAuthorize>
              }
            />

            {/* Clerk Routes */}
            <Route
              path="/additem"
              element={
                <AdminAuthorize role={role}>
                  <AddItem />
                </AdminAuthorize>
              }
            />
            <Route
              path="/editform/:id"
              element={
                <AdminAuthorize role={role}>
                  <EditForm />
                </AdminAuthorize>
              }
            />

            {/* Manager Route */}
            <Route path="/manager" element={<ManagerDashboard />} />

            {/* Clerk Route */}
            <Route path="/cl" element={<ClerkDashboard />} />

            {/* Fallback Route */}
            {/* <Route
              path="*"
              element={
                <div className="text-center text-gray-700 py-12 text-2xl font-bold animate-bounce-in">
                  404 - Page Not Found
                </div>
              }
            /> */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;