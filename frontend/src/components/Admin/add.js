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
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

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
    setMessage("");

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", formData);
      setMessage(response.data.message); // e.g., "Registration successful"
      setTimeout(() => {
        navigate("/admin");
      }, 2000);
    } catch (error) {
      console.error("Error during registration:", error);
      const errorMessage = error.response?.data?.error || "Error adding user";
      setMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-100 via-teal-100 to-blue-100 p-6 animate-bg-shift">
      <div className="max-w-lg w-full mx-auto relative">
        {/* Form Container */}
        <div className="bg-white shadow-2xl rounded-3xl p-8 sm:p-12 transition-all duration-500 hover:shadow-[0_0_25px_rgba(45,212,191,0.7)]">
          <h2 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-teal-500 to-blue-600 animate-text-glow">
            Add New User
          </h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {[
              { name: "first_name", placeholder: "First Name" },
              { name: "last_name", placeholder: "Last Name" },
              { name: "email", placeholder: "Email", type: "email" },
              { name: "password", placeholder: "Password", type: "password" },
              { name: "role", placeholder: "Role" },
              { name: "phone_number", placeholder: "Phone Number" },
            ].map((field) => (
              <div key={field.name} className="relative group">
                <input
                  type={field.type || "text"}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  disabled={loading}
                  className="w-full h-12 px-4 text-lg text-gray-900 bg-white rounded-lg border-2 border-teal-400 focus:border-blue-600 focus:outline-none transition-all duration-300 shadow-md hover:shadow-lg hover:border-purple-600 focus:shadow-[0_0_15px_rgba(45,212,191,0.5)] peer placeholder-transparent disabled:bg-gray-200 disabled:border-gray-300"
                  required
                />
                <label
                  htmlFor={field.name}
                  className="absolute left-4 -top-6 text-sm text-gray-600 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-6 peer-focus:text-blue-600 peer-focus:text-sm transition-all duration-300 group-hover:text-purple-600"
                >
                  {field.placeholder}
                </label>
              </div>
            ))}

            <div className="text-center">
              <button
                type="submit"
                disabled={loading}
                className={`relative inline-block px-8 py-3 text-lg font-bold text-white rounded-full transition-all duration-300 transform ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-600 via-teal-500 to-blue-600 hover:from-purple-700 hover:via-teal-600 hover:to-blue-700 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl animate-pulse-slow"
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8h8a8 8 0 11-16 0z"
                      ></path>
                    </svg>
                    Adding...
                  </span>
                ) : (
                  "Add User"
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Message Display - Prominent with Ease-In-Out Animation */}
        {message && (
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-16 z-50 bg-gradient-to-r from-green-500 to-teal-500 text-white py-4 px-8 rounded-full shadow-2xl animate-message-ease-in-out">
            <p className="text-lg font-semibold">{message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddUser;