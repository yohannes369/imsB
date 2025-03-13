// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const AdminAuthorize = ({ children }) => {
//   const role = localStorage.getItem('role'); // assuming role is stored in localStorage after login

//   if (role !== 'Admin') {
//     return <Navigate to="/" />;
//   }

//   return children;
// };

// export default AdminAuthorize;
import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminAuthorize = ({ children, role: requiredRole }) => {
  const role = localStorage.getItem('role'); // assuming role is stored in localStorage after login

  if (role !== requiredRole) {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminAuthorize;
