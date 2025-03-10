import React from "react";
import FetchDataComponent from "../manager/Fetch";
const ManagerDashboard = () => {
  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <h1 className="text-3xl font-bold">Welcome to Manager Dashboard</h1>
      <FetchDataComponent />
    </div>
  );
};

export default ManagerDashboard;
