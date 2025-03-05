import React, { useState } from "react";
import axios from "axios";
// import Footer from "./Footer/Footer";
// import Header from "./Header/Header";
const Login = ({ setRole }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error before login attempt

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password },
        { withCredentials: true } // Ensures HTTP-only cookie works
      );

      const { token, role } = response.data;

      if (token) {
        localStorage.setItem("token", token); // Store token
        setRole(role); // Update role in App.js
      }
    } catch (error) {
      setError(error.response?.data?.error || "Login failed. Please try again.");
      console.error("Login failed:", error.message);
    }
  };

  return (
    <div>

        
      <h1>Login</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {/* <Footer /> */}
    </div>
  );
};

export default Login;
