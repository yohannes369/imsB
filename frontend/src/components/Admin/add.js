
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







// import React, { useState } from "react";
// import axios from "axios";

// const AddUser = () => {
//   const [formData, setFormData] = useState({
//     employee_id: "",
//     first_name: "",
//     last_name: "",
//     email: "",
//     password: "",
//     role: "",
//     phone_number: "",
//   });

//   const [file, setFile] = useState(null);
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});

//   // Validate form fields
//   const validateForm = () => {
//     let newErrors = {};
//     Object.keys(formData).forEach((key) => {
//       if (!formData[key] && key !== "phone_number") {
//         newErrors[key] = "This field is required";
//       }
//     });
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({ ...prevState, [name]: value }));
//   };

//   // Handle file input change
//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     if (!validateForm()) {
//       return;
//     }

//     setLoading(true);
//     const data = new FormData();
//     Object.keys(formData).forEach((key) => {
//       data.append(key, formData[key]);
//     });
//     if (file) {
//       data.append("profile_photo", file);
//     }

//     try {
//       const response = await axios.post("http://localhost:5000/api/auth/register", data, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       setMessage(response.data.message);
//       setFormData({
//         employee_id: "",
//         first_name: "",
//         last_name: "",
//         email: "",
//         password: "",
//         role: "",
//         phone_number: "",
//       });
//       setFile(null);
//       setErrors({});
//       e.target.reset();
//     } catch (error) {
//       console.error("Error during registration:", error);
//       setMessage(error.response?.data?.error || "Error adding user");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h2>Add New Employee</h2>
//       {message && <p>{message}</p>}
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Employee ID:</label>
//           <input
//             type="text"
//             name="employee_id"
//             value={formData.employee_id}
//             onChange={handleChange}
//             required
//           />
//           {errors.employee_id && <p style={{ color: "red" }}>{errors.employee_id}</p>}
//         </div>
//         <div>
//           <label>First Name:</label>
//           <input
//             type="text"
//             name="first_name"
//             value={formData.first_name}
//             onChange={handleChange}
//             required
//           />
//           {errors.first_name && <p style={{ color: "red" }}>{errors.first_name}</p>}
//         </div>
//         <div>
//           <label>Last Name:</label>
//           <input
//             type="text"
//             name="last_name"
//             value={formData.last_name}
//             onChange={handleChange}
//             required
//           />
//           {errors.last_name && <p style={{ color: "red" }}>{errors.last_name}</p>}
//         </div>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//           {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
//         </div>
//         <div>
//           <label>Password:</label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//           {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
//         </div>
//         <div>
//           <label>Role:</label>
//           <input
//             type="text"
//             name="role"
//             value={formData.role}
//             onChange={handleChange}
//             required
//           />
//           {errors.role && <p style={{ color: "red" }}>{errors.role}</p>}
//         </div>
//         <div>
//           <label>Phone Number (Optional):</label>
//           <input
//             type="text"
//             name="phone_number"
//             value={formData.phone_number}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Profile Photo (Optional):</label>
//           <input type="file" name="profile_photo" onChange={handleFileChange} accept="image/*" />
//         </div>
//         <button type="submit" disabled={loading}>
//           {loading ? "Adding..." : "Add Employee"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddUser;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  FaUserPlus, 
  FaUpload, 
  FaSpinner, 
  FaKey, 
  FaIdCard, 
  FaUser, 
  FaEnvelope, 
  FaPhone,
  FaUserShield,
  FaUserTie,
  FaUserCog
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const AddUser = () => {
  const [formData, setFormData] = useState({
    employee_id: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    role: "Staff", // Default role
    phone_number: "",
    department: ""
  });

  const [file, setFile] = useState(null);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const roles = [
    { value: "Admin", label: "Admin", icon: <FaUserShield className="mr-2" /> },
    { value: "Manager", label: "Manager", icon: <FaUserTie className="mr-2" /> },
    { value: "Staff", label: "Staff", icon: <FaUser className="mr-2" /> },
    { value: "Clerk", label: "Clerk", icon: <FaUserCog className="mr-2" /> }
  ];

  const departments = [
    "HR",
    "Finance",
    "IT",
    "Marketing",
    "Operations",
    "Sales",
    "Customer Support"
  ];

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        window.location.reload();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  const validateForm = () => {
    let newErrors = {};
    if (!formData.employee_id) newErrors.employee_id = "Employee ID is required";
    if (!formData.first_name) newErrors.first_name = "First name is required";
    if (!formData.last_name) newErrors.last_name = "Last name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!formData.role) newErrors.role = "Role is required";
    if (!formData.department) newErrors.department = "Department is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size > 2 * 1024 * 1024) {
      setMessage({ text: "File size should be less than 2MB", type: "error" });
      return;
    }
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    if (!validateForm()) return;

    setLoading(true);
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    if (file) {
      data.append("profile_photo", file);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setMessage({
        text: response.data.message,
        type: "success",
      });
      setShowSuccess(true);
      
      // Reset form
      setFormData({
        employee_id: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        role: "Staff",
        phone_number: "",
        department: ""
      });
      setFile(null);
      setErrors({});
    } catch (error) {
      console.error("Registration error:", error);
      setMessage({
        text: error.response?.data?.error || "Error adding user",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Full-width header with green background only for text */}
      <div className="bg-green-200 w-full py-4 mb-8 rounded-md">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800 text-center">
            User Management
          </h1>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <AnimatePresence>
          {message.text && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`p-4 ${
                message.type === "success"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {message.text}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">
            Add New Employee
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Employee ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <FaIdCard className="mr-2 text-green-600" />
                Employee ID *
              </label>
              <input
                type="text"
                name="employee_id"
                value={formData.employee_id}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                  errors.employee_id ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.employee_id && (
                <p className="mt-1 text-sm text-red-600">{errors.employee_id}</p>
              )}
            </div>

            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <FaUser className="mr-2 text-green-600" />
                First Name *
              </label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                  errors.first_name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.first_name && (
                <p className="mt-1 text-sm text-red-600">{errors.first_name}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <FaUser className="mr-2 text-green-600" />
                Last Name *
              </label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                  errors.last_name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.last_name && (
                <p className="mt-1 text-sm text-red-600">{errors.last_name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <FaEnvelope className="mr-2 text-green-600" />
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <FaKey className="mr-2 text-green-600" />
                Password *
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role *
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                  errors.role ? "border-red-500" : "border-gray-300"
                }`}
              >
                {roles.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
              {errors.role && (
                <p className="mt-1 text-sm text-red-600">{errors.role}</p>
              )}
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department *
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                  errors.department ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
              {errors.department && (
                <p className="mt-1 text-sm text-red-600">{errors.department}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <FaPhone className="mr-2 text-green-600" />
                Phone Number
              </label>
              <input
                type="text"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            {/* Profile Photo */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Profile Photo
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md shadow-sm hover:bg-green-700 transition-colors cursor-pointer">
                  <FaUpload className="mr-2" />
                  Choose File
                  <input
                    type="file"
                    name="profile_photo"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                </label>
                {file && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-sm text-gray-600"
                  >
                    {file.name} ({(file.size / 1024).toFixed(2)} KB)
                  </motion.span>
                )}
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Max file size: 2MB (optional)
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Adding Employee...
                </>
              ) : (
                <>
                  <FaUserPlus className="mr-2" />
                  Add Employee
                </>
              )}
            </motion.button>
          </div>
        </form>

        {/* Success Animation */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.2, 1], opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-8 rounded-lg shadow-xl text-center"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ repeat: 2, duration: 0.5 }}
                >
                  <FaUserPlus className="text-6xl text-green-500 mx-auto mb-4" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Success!</h3>
                <p className="text-lg text-gray-600">Employee added successfully</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default AddUser;