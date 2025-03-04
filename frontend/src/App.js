import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login"; // ✅ Ensure correct case
import Admindashboard from "./components/admindashboard"; // ✅ Ensure correct case
import Managerdashboard from "./components/Managerdashboard"; // ✅ Ensure correct case

const App = () => {
  const [role, setRole] = useState(null);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              !role ? (
                <Login setRole={setRole} />
              ) : role === "admin" ? (
                <Admindashboard />
              ) : (
                <Managerdashboard />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
