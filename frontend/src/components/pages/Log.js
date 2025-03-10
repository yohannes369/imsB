// import React, { useState } from "react";
// import axios from "axios";
// // import Footer from "./Footer/Footer";
// // import Header from "./Header/Header";



// const Login = ({ setRole }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError(""); // Reset error before login attempt

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/auth/login",
//         { email, password },
//         { withCredentials: true } // Ensures HTTP-only cookie works
//       );

//       const { token, role } = response.data;

//       if (token) {
//         localStorage.setItem("token", token); // Store token
//         setRole(role); // Update role in App.js
//       }
//     } catch (error) {
//       setError(error.response?.data?.error || "Login failed. Please try again.");
//       console.error("Login failed:", error.message);
//     }
//   };

//   return (
//     <div>

        
//       <h1>Login</h1>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       <form onSubmit={handleLogin}>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//       {/* <Footer /> */}
//     </div>
//   );
// };

// export default Login;

// import React, { useState } from "react";
// import axios from "axios";
// import Loader from "../loader/Loader"; // Assuming this is the correct path for your Loader component

// const Login = ({ setRole }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false); // State for managing loader

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError(""); // Reset error before login attempt
//     setIsLoading(true); // Show loader

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/auth/login",
//         { email, password },
//         { withCredentials: true } // Ensures HTTP-only cookie works
//       );

//       const { token, role } = response.data;

//       if (token) {
//         localStorage.setItem("token", token); // Store token
//         setRole(role); // Update role in App.js
//       }
//     } catch (error) {
//       setError(error.response?.data?.error || "Login failed. Please try again.");
//       console.error("Login failed:", error.message);
//     } finally {
//       setIsLoading(false); // Hide loader after request is completed
//     }
//   };

//   return (
//     <div>
//       <h1>Login</h1>
//       {error && <p style={{ color: "red" }}>{error}</p>}
      
//       {/* Show loader if isLoading is true */}
//       {isLoading && <Loader />}
      
//       <form onSubmit={handleLogin}>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" disabled={isLoading}>Login</button> {/* Disable button when loading */}
//       </form>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import axios from "axios";
import Loader from "../loader/Loader"; // Import the loader component
import "./Login.css"; // Import CSS for styling

const Login = ({ setRole }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State for loader visibility

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset errors
    setIsLoading(true); // Show loader for 60 seconds

    setTimeout(async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/login",
          { email, password },
          { withCredentials: true }
        );

        const { token, role } = response.data;

        if (token) {
          localStorage.setItem("token", token); // Store token
          setRole(role); // Update role in App.js
        }
      } catch (error) {
        setError(error.response?.data?.error || "Login failed. Please try again.");
        console.error("Login failed:", error.message);
      } finally {
        setIsLoading(false); // Hide loader after login attempt
      }
    }, 60000); // Loader stays for 1 minute (60,000ms)
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {isLoading && <Loader />} {/* Show loader when loading */}

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
        <button type="submit" disabled={isLoading} className={isLoading ? "loading" : ""}>
          {isLoading ? <span className="spinner"></span> : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;

