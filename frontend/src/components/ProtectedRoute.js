import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ role, allowedRoles, children }) => {
  if (!role) {
    // If not logged in
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(role)) {
    // If role not authorized
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
