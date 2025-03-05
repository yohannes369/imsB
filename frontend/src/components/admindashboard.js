import React, { useState, useEffect } from 'react';
import axios from 'axios';
export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/employees', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });
  
      setData(response.data); // Axios automatically parses JSON
    } catch (error) {
      setError(error.message);
      
      console.error('Error fetching data:', error);
    }
  };
  

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={logout}>Logout</button>
      {data && (
        <ul>  
          {data.map((employee) => (
            <li key={employee.id}>
              {employee.first_name} {employee.last_name} - {employee.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}