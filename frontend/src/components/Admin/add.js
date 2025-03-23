
// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const AddUser = () => {
//   const [formData, setFormData] = useState({
//     first_name: "",
//     last_name: "",
//     email: "",
//     password: "",
//     role: "",
//     phone_number: "",
//   });

//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

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
//     setMessage("");

//     try {
//       const response = await axios.post("http://localhost:5000/api/auth/register", formData);
//       setMessage(response.data.message); // e.g., "Registration successful"
//       setTimeout(() => {
//         navigate("/admin");
//       }, 2000);
//     } catch (error) {
//       console.error("Error during registration:", error);
//       const errorMessage = error.response?.data?.error || "Error adding user";
//       setMessage(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-tr from-purple-100 via-teal-100 to-blue-100 p-6 animate-bg-shift">
//       <div className="max-w-lg w-full mx-auto relative">
//         {/* Form Container */}
//         <div className="bg-white shadow-2xl rounded-3xl p-8 sm:p-12 transition-all duration-500 hover:shadow-[0_0_25px_rgba(45,212,191,0.7)]">
//           <h2 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-teal-500 to-blue-600 animate-text-glow">
//             Add New User
//           </h2>

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="mt-8 space-y-6">
//             {[
//               { name: "first_name", placeholder: "First Name" },
//               { name: "last_name", placeholder: "Last Name" },
//               { name: "email", placeholder: "Email", type: "email" },
//               { name: "password", placeholder: "Password", type: "password" },
//               { name: "role", placeholder: "Role" },
//               { name: "phone_number", placeholder: "Phone Number" },
//             ].map((field) => (
//               <div key={field.name} className="relative group">
//                 <input
//                   type={field.type || "text"}
//                   name={field.name}
//                   value={formData[field.name]}
//                   onChange={handleChange}
//                   placeholder={field.placeholder}
//                   disabled={loading}
//                   className="w-full h-12 px-4 text-lg text-gray-900 bg-white rounded-lg border-2 border-teal-400 focus:border-blue-600 focus:outline-none transition-all duration-300 shadow-md hover:shadow-lg hover:border-purple-600 focus:shadow-[0_0_15px_rgba(45,212,191,0.5)] peer placeholder-transparent disabled:bg-gray-200 disabled:border-gray-300"
//                   required
//                 />
//                 <label
//                   htmlFor={field.name}
//                   className="absolute left-4 -top-6 text-sm text-gray-600 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-6 peer-focus:text-blue-600 peer-focus:text-sm transition-all duration-300 group-hover:text-purple-600"
//                 >
//                   {field.placeholder}
//                 </label>
//               </div>
//             ))}

//             <div className="text-center">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className={`relative inline-block px-8 py-3 text-lg font-bold text-white rounded-full transition-all duration-300 transform ${
//                   loading
//                     ? "bg-gray-400 cursor-not-allowed"
//                     : "bg-gradient-to-r from-purple-600 via-teal-500 to-blue-600 hover:from-purple-700 hover:via-teal-600 hover:to-blue-700 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl animate-pulse-slow"
//                 }`}
//               >
//                 {loading ? (
//                   <span className="flex items-center justify-center">
//                     <svg
//                       className="animate-spin h-5 w-5 mr-2 text-white"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                     >
//                       <circle
//                         className="opacity-25"
//                         cx="12"
//                         cy="12"
//                         r="10"
//                         stroke="currentColor"
//                         strokeWidth="4"
//                       ></circle>
//                       <path
//                         className="opacity-75"
//                         fill="currentColor"
//                         d="M4 12a8 8 0 018-8v8h8a8 8 0 11-16 0z"
//                       ></path>
//                     </svg>
//                     Adding...
//                   </span>
//                 ) : (
//                   "Add User"
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>

//         {/* Message Display - Prominent with Ease-In-Out Animation */}
//         {message && (
//           <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-16 z-50 bg-gradient-to-r from-green-500 to-teal-500 text-white py-4 px-8 rounded-full shadow-2xl animate-message-ease-in-out">
//             <p className="text-lg font-semibold">{message}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AddUser;







import React, { useState } from "react";
import axios from "axios";

const AddUser = () => {
  const [formData, setFormData] = useState({
    employee_id: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    role: "",
    phone_number: "",
  });

  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Validate form fields
  const validateForm = () => {
    let newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key] && key !== "phone_number") {
        newErrors[key] = "This field is required";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    if (file) {
      data.append("profile_photo", file);
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(response.data.message);
      setFormData({
        employee_id: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        role: "",
        phone_number: "",
      });
      setFile(null);
      setErrors({});
      e.target.reset();
    } catch (error) {
      console.error("Error during registration:", error);
      setMessage(error.response?.data?.error || "Error adding user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Add New Employee</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Employee ID:</label>
          <input
            type="text"
            name="employee_id"
            value={formData.employee_id}
            onChange={handleChange}
            required
          />
          {errors.employee_id && <p style={{ color: "red" }}>{errors.employee_id}</p>}
        </div>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
          {errors.first_name && <p style={{ color: "red" }}>{errors.first_name}</p>}
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
          {errors.last_name && <p style={{ color: "red" }}>{errors.last_name}</p>}
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
        </div>
        <div>
          <label>Role:</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          />
          {errors.role && <p style={{ color: "red" }}>{errors.role}</p>}
        </div>
        <div>
          <label>Phone Number (Optional):</label>
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Profile Photo (Optional):</label>
          <input type="file" name="profile_photo" onChange={handleFileChange} accept="image/*" />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Employee"}
        </button>
      </form>
    </div>
  );
};

export default AddUser;