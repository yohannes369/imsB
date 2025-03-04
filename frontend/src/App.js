import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import ManagerDashboard from './components/ManagerDashboard';
import Logout from './components/Logout';


const App = () => {
  const [role, setRole] = useState(null);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={!role ? <Login setRole={setRole} /> : role === 'admin' ? <AdminDashboard /> : <ManagerDashboard />} />
          <Route path="/logout" element={<Logout setRole={setRole} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;