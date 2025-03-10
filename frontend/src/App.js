
// import React, { useState } from "react";
// import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
// import Login from "./components/pages/Log";
// import Admindashboard from "./components/pages/admin";
// import Managerdashboard from "./components/pages/manager";
// import Header from "./components/Header/Header";
// import Footer from "./components/Footer/Footer";
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
//           <Route
//             path="/"
//             element={
//               !role ? (
//                 <Login setRole={setRole} />
//               ) : role === "Admin" ? (
//                 <Navigate to="/admin" />
//               ) : role === "Manager" ? (
//                 <Navigate to="/manager" />
//               ) : (
//                 <div>Unauthorized</div>
//               )
//             }
//           />
//           <Route path="/admin" element={<Admindashboard />} />
//           <Route path="/manager" element={<Managerdashboard />} />
//           <Route path="/user" element={<div>User Dashboard</div>} />
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
import UpdateUser from "./components/Admin/edit";
import AddUser from "./components/Admin/add";
import Admindashboard from "./components/pages/admin";
import Managerdashboard from "./components/pages/manager";
import Cl from "./components/clerk/cl";

//add item
import AddItem from "./components/clerk/additem";
 import EditForm from "./components/clerk/Editform";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AdminAuthorize from "./middleware/auth"; // Import AdminAuthorize
 

import "./assets/template_assets/css/bootstrap.css";
import "./assets/template_assets/css/style.css";
import "./assets/template_assets/css/responsive.css";
import "./assets/template_assets/css/color.css";
import "./assets/styles/custom.css";

const App = () => {
  const [role, setRole] = useState(null);

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          {/* Route for the home page (Login) */}
          <Route
            path="/"
            element={
              !role ? (
                <Login setRole={setRole} /> // Show login if no role is assigned
              ) : role === "Admin" ? (
                <Navigate to="/admin" /> // Redirect Admin to Admin Dashboard
              ) : role === "Manager" ? (
                <Navigate to="/manager" /> // Redirect Manager to Manager Dashboard
              ) : role === "Clerk" ? (
                <Navigate to="/cl" />
              ) : (
                <div>Unauthorized</div> // Unauthorized if no valid role
              )
            }
          />
          
          {/* Admin Routes */}
          <Route
            path="/edit/:email"
            element={
              <AdminAuthorize> 
                <UpdateUser /> {/* Admin can edit user */}
              </AdminAuthorize>
            }
          />
          <Route
            path="/add"
            element={
              <AdminAuthorize>
                <AddUser /> {/* Admin can add new user */}
              </AdminAuthorize>
            }
          />


            <Route
            path="/additem"
            element={
              <AdminAuthorize>
                <AddItem /> {/* add item by  */}
              </AdminAuthorize>
            }
          />

          <Route
            path="/editform/:Item_Code"
            element={
              <AdminAuthorize>
                <EditForm /> {/* edit item by  */}
              </AdminAuthorize>
            }
          />

       


          <Route path="/admin" element={<Admindashboard />} /> {/* Admin Dashboard */}

          {/* Manager Route */}
          <Route path="/manager" element={<Managerdashboard />} /> {/* Manager Dashboard */}

          {/* Clerk Route */}
          <Route path="/cl" element={<Cl />} />

          {/* You can add more routes here for other roles or features */}
          <Route path="/user" element={<div>User Dashboard</div>} /> {/* User Dashboard */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;




