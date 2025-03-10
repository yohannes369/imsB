import React from 'react';
import { Navigate } from 'react-router-dom';

const ManagerAuthorize = ({ children }) => {
  const role = localStorage.getItem('role'); // Retrieve role from localStorage

  if (role !== 'Manager') {
    return <Navigate to="/" />; // Redirect to homepage or login if not a manager
  }

  return children; // Return the child components if the user is a manager
};

export default ManagerAuthorize;
