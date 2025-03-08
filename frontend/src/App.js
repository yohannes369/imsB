
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/pages/Log";
import Admindashboard from "./components/pages/admin";
import Managerdashboard from "./components/pages/manager";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
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
          <Route
            path="/"
            element={
              !role ? (
                <Login setRole={setRole} />
              ) : role === "Admin" ? (
                <Navigate to="/admin" />
              ) : role === "Manager" ? (
                <Navigate to="/manager" />
              ) : (
                <div>Unauthorized</div>
              )
            }
          />
          <Route path="/admin" element={<Admindashboard />} />
          <Route path="/manager" element={<Managerdashboard />} />
          <Route path="/user" element={<div>User Dashboard</div>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

  
 


