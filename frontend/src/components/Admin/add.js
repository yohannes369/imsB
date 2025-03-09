// import React, { useState } from "react";
// import axios from "axios";

// const AddUser = () => {
//   const [formData, setFormData] = useState({
//     first_name: "",  // First Name
//     last_name: "",   // Last Name
//     email: "",       // Email
//     password: "",    // Password
//     role: "",        // Role
//     phone_number: "",// Phone Number
//   });

//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage(""); // Clear the previous message
  
//     try {
//       // Sending the POST request
//       const response = await axios.post("http://localhost:5000/api/auth/register", formData);
      
//       // Handling successful response
//       setMessage(response.data.message);
//     } catch (error) {
//       // Log the full error object for better debugging
//       console.error("Error during registration:", error);
      
//       // Set a more detailed error message for the user
//       const errorMessage = error.response?.data?.error || "Error adding user"; // Get detailed error if available
//       setMessage(errorMessage); // Set the error message
//     } finally {
//       setLoading(false); // Stop loading state
//     }
//   };

//   return (
//     <div>
//       <h2>Add User</h2>
//       {message && <p>{message}</p>}
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="first_name"
//           value={formData.first_name}
//           onChange={handleChange}
//           placeholder="First Name"
//         />
//         <input
//           type="text"
//           name="last_name"
//           value={formData.last_name}
//           onChange={handleChange}
//           placeholder="Last Name"
//         />
//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           placeholder="Email"
//         />
//         <input
//           type="password"  // Password field to be masked
//           name="password"
//           value={formData.password}
//           onChange={handleChange}
//           placeholder="Password"
//         />
//         <input
//           type="text"
//           name="role"
//           value={formData.role}
//           onChange={handleChange}
//           placeholder="Role"
//         />
//         <input
//           type="text"
//           name="phone_number"
//           value={formData.phone_number}
//           onChange={handleChange}
//           placeholder="Phone Number"
//         />
//         <button type="submit" disabled={loading}>
//           {loading ? "Adding..." : "Add User"}
        
//         </button>

//       </form>
//     </div>
//   );
// };

// export default AddUser;
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const AddUser = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    role: "",
    phone_number: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize navigate hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(""); // Clear the previous message
  
    try {
      // Sending the POST request
      const response = await axios.post("http://localhost:5000/api/auth/register", formData);
      
      // Handling successful response
      setMessage(response.data.message);
      
      // After successful user addition, navigate to the fetch page
      setTimeout(() => {
        navigate("/admin"); // Navigate to /fetch after a short delay
      }, 2000); // 2-second delay before navigation (to show success message)
      
    } catch (error) {
      // Log the full error object for better debugging
      console.error("Error during registration:", error);
      
      // Set a more detailed error message for the user
      const errorMessage = error.response?.data?.error || "Error adding user"; // Get detailed error if available
      setMessage(errorMessage); // Set the error message
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  return (
    <div>
      <h2>Add User</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          placeholder="First Name"
        />
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          placeholder="Last Name"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"  // Password field to be masked
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <input
          type="text"
          name="role"
          value={formData.role}
          onChange={handleChange}
          placeholder="Role"
        />
        <input
          type="text"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
          placeholder="Phone Number"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add User"}
        </button>
      </form>
    </div>
  );
};

export default AddUser;

