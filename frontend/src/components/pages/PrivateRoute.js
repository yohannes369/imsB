import React from "react";
import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const PrivateRoute = ({ role, children }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/" />;

  try {
    const decoded = jwtDecode(token);
    if (decoded.role !== role) return <Navigate to="/Log" />;
    return children;
  } catch (error) {
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;
