// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const UpdateUser = () => {
//   const { id } = useParams(); // Get user ID from URL params
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     first_name: "",
//     last_name: "",
//     role: "",
//     phone_number: "",
//     email: "",
//     profile_photo: null, // File object for the uploaded image
//     status: "",
//   });

//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState(null);
//   const [previewPhoto, setPreviewPhoto] = useState(null); // For image preview

//   // Fetch user data on component mount
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const token = localStorage.getItem("token");
//         if (!token) {
//           setError("Unauthorized. Please log in.");
//           return;
//         }

//         const response = await axios.get(`http://localhost:5000/api/auth/getUserById/${id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         const user = response.data;
//         if (user) {
//           setFormData({
//             first_name: user.first_name || "",
//             last_name: user.last_name || "",
//             role: user.role || "",
//             phone_number: user.phone_number || "",
//             email: user.email || "",
//             profile_photo: null, // Reset file input (not fetched)
//             status: user.status || "",
//           });
//           if (user.profile_photo) {
//             setPreviewPhoto(`http://localhost:5000${user.profile_photo}`); // Assuming photo is served from backend
//           }
//         } else {
//           setError("User not found with the provided ID.");
//         }
//       } catch (error) {
//         console.error("Fetch error:", error);
//         setError(error.response?.data?.message || "Failed to load user data. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [id]);

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value, files } = e.target;

//     if (name === "profile_photo") {
//       const file = files[0];
//       setFormData((prevState) => ({
//         ...prevState,
//         [name]: file || null,
//       }));
//       setPreviewPhoto(file ? URL.createObjectURL(file) : null); // Preview new image
//     } else {
//       setFormData((prevState) => ({
//         ...prevState,
//         [name]: value,
//       }));
//     }
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!id) {
//       setMessage("Cannot update: No user ID provided.");
//       return;
//     }

//     // Basic client-side validation
//     if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       setError("Please enter a valid email address.");
//       return;
//     }

//     setLoading(true);
//     setMessage("");
//     setError(null);

//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         throw new Error("Unauthorized. Please log in.");
//       }

//       const formDataToSend = new FormData();
//       // Only append fields that have values or are explicitly set
//       Object.entries(formData).forEach(([key, value]) => {
//         if (key === "profile_photo" && value) {
//           formDataToSend.append(key, value); // File upload
//         } else if (value !== null && value !== undefined) {
//           formDataToSend.append(key, value);
//         }
//       });

//       const response = await axios.post(
//         `http://localhost:5000/api/auth/updateUser/${id}`,
//         formDataToSend,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setMessage(response.data.message || "User updated successfully!");
//       setTimeout(() => navigate("/admin"), 2000);
//     } catch (err) {
//       console.error("Update error:", err);
//       setError(err.response?.data?.error || "Something went wrong during update.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading && !message) {
//     return <div className="text-center text-gray-600 py-12 text-lg font-medium">Loading user data...</div>;
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
//         <div className="max-w-lg w-full bg-white p-6 rounded-lg shadow-md text-center">
//           <p className="text-red-600 text-lg font-medium mb-4">{error}</p>
//           <button
//             onClick={() => navigate("/admin")}
//             className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
//           >
//             Back to User List
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
//       <div className="max-w-lg w-full bg-white p-6 rounded-lg shadow-md">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Update User</h2>

//         {message && (
//           <p className={`text-center mb-4 ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>
//             {message}
//           </p>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-semibold text-gray-700">First Name</label>
//             <input
//               type="text"
//               name="first_name"
//               value={formData.first_name}
//               onChange={handleChange}
//               className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-semibold text-gray-700">Last Name</label>
//             <input
//               type="text"
//               name="last_name"
//               value={formData.last_name}
//               onChange={handleChange}
//               className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-semibold text-gray-700">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-semibold text-gray-700">Role</label>
//             <input
//               type="text"
//               name="role"
//               value={formData.role}
//               onChange={handleChange}
//               className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-semibold text-gray-700">Phone Number</label>
//             <input
//               type="text"
//               name="phone_number"
//               value={formData.phone_number}
//               onChange={handleChange}
//               className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-semibold text-gray-700">Status</label>
//             <select
//               name="status"
//               value={formData.status}
//               onChange={handleChange}
//               className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900"
//             >
//               <option value="">Select Status</option>
//               <option value="Active">Active</option>
//               <option value="Inactive">Inactive</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-semibold text-gray-700">Profile Photo</label>
//             {previewPhoto && (
//               <div className="mt-2">
//                 <img src={previewPhoto} alt="Profile Preview" className="w-32 h-32 object-cover rounded-md mb-2" />
//               </div>
//             )}
//             <input
//               type="file"
//               name="profile_photo"
//               onChange={handleChange}
//               accept="image/*"
//               className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900"
//             />
//           </div>

//           <div className="flex space-x-4">
//             <button
//               type="submit"
//               disabled={loading}
//               className={`flex-1 py-2 px-4 rounded-lg shadow-md transition-all duration-200 ${
//                 loading ? "bg-teal-400 cursor-not-allowed" : "bg-teal-600 hover:bg-teal-700 hover:shadow-lg text-white"
//               }`}
//             >
//               {loading ? "Updating..." : "Update"}
//             </button>
//             <button
//               type="button"
//               onClick={() => navigate("/admin")}
//               className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UpdateUser;





// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const UpdateUser = () => {
//   const { id } = useParams(); // Get user ID from URL params
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     first_name: "",
//     last_name: "",
//     role: "",
//     phone_number: "",
//     email: "",
//     profile_photo: null, // File object for the uploaded image
//     status: "", // Status field
//   });

//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState(null);

//   // Fetch user data on component mount
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const token = localStorage.getItem("token");
//         if (!token) {
//           setError("Unauthorized. Please log in.");
//           setLoading(false);
//           return;
//         }

//         const response = await axios.get(`http://localhost:5000/api/auth/getUserById/${id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         const user = response.data;
//         if (user) {
//           setFormData(user);
//         } else {
//           setError("User not found with the provided ID.");
//         }
//       } catch (error) {
//         console.error("Fetch error:", error);
//         setError(error.response?.data?.message || "Failed to load user data. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [id]);

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value, files } = e.target;

//     if (name === "profile_photo") {
//       setFormData((prevState) => ({
//         ...prevState,
//         [name]: files ? files[0] : null, // Store the uploaded file
//       }));
//     } else {
//       setFormData((prevState) => ({
//         ...prevState,
//         [name]: value,
//       }));
//     }
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!id) {
//       setMessage("Cannot update: No user ID provided.");
//       return;
//     }

//     setLoading(true);
//     setMessage("");
//     setError(null);

//     try {
//       const formDataToSend = new FormData();
//       // Send all fields, even if empty, to preserve existing values
//       formDataToSend.append("first_name", formData.first_name || "");
//       formDataToSend.append("last_name", formData.last_name || "");
//       formDataToSend.append("role", formData.role || "");
//       formDataToSend.append("phone_number", formData.phone_number || "");
//       formDataToSend.append("email", formData.email || "");
//       formDataToSend.append("status", formData.status || "");
//       if (formData.profile_photo) {
//         formDataToSend.append("profile_photo", formData.profile_photo);
//       }

//       const response = await axios.post(`http://localhost:5000/api/auth/updateEmployee/${id}`, formDataToSend, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       setMessage(response.data.message || "User updated successfully!");
//       setTimeout(() => navigate("/admin"), 2000);
//     } catch (err) {
//       console.error("Update error:", err);
//       setError(err.response?.data?.error || "Something went wrong during update.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading && !message) {
//     return <div>Loading user data...</div>;
//   }

//   if (error) {
//     return (
//       <div>
//         <p>Error: {error}</p>
//         <button onClick={() => navigate("/admin")}>Back to User List</button>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h2>Update User</h2>

//       {message && <p>{message}</p>}

//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>First Name:</label>
//           <input
//             type="text"
//             name="first_name"
//             value={formData.first_name}
//             onChange={handleChange}
//             required
//           />
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
//         </div>

//         <div>
//           <label>Phone Number:</label>
//           <input
//             type="text"
//             name="phone_number"
//             value={formData.phone_number}
//             onChange={handleChange}
//           />
//         </div>

//         <div>
//           <label>Status:</label>
//           <select name="status" value={formData.status} onChange={handleChange}>
//             <option value="Active">Active</option>
//             <option value="Inactive">Inactive</option>
//           </select>
//         </div>

//         <div>
//           <label>Profile Photo:</label>
//           <input
//             type="file"
//             name="profile_photo"
//             onChange={handleChange}
//             accept="image/*"
//           />
//         </div>

//         <div>
//           <button type="submit" disabled={loading}>
//             {loading ? "Updating..." : "Update"}
//           </button>
//           <button type="button" onClick={() => navigate("/admin")}>
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default UpdateUser;


import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    role: "",
    phone_number: "",
    email: "",
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Unauthorized. Please log in.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `http://localhost:5000/api/auth/getUserById/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const user = response.data;
        if (user) {
          setFormData(user);
        } else {
          setError("User not found with the provided ID.");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setError(
          error.response?.data?.message ||
            "Failed to load user data. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id) {
      setMessage("Cannot update: No user ID provided.");
      return;
    }

    setIsSubmitting(true);
    setLoading(true);
    setMessage("");
    setError(null);

    try {
      const response = await axios.post(
        `http://localhost:5000/api/auth/updateUser/${id}`,
        formData
      );
      setMessage(response.data.message || "User updated successfully!");
      setShowSuccess(true);
      setTimeout(() => {
        navigate("/admin");
      }, 2500);
    } catch (err) {
      console.error("Update error:", err);
      setError(
        err.response?.data?.error || "Something went wrong during update."
      );
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };

  if (loading && !message) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
            <div className="w-8 h-8 border-4 border-teal-300 border-t-transparent rounded-full animate-spin absolute animation-delay-200"></div>
          </div>
          <h2 className="text-xl font-semibold text-gray-700">Loading User Data</h2>
          <p className="text-gray-500">Please wait while we fetch the user details</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
        <div className="max-w-lg w-full bg-white p-8 rounded-2xl shadow-xl animate-fade-in">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">Oops! An Error Occurred</h3>
            <p className="text-red-500 px-4">{error}</p>
            <button
              onClick={() => navigate("/edit")}
              className="mt-4 px-8 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:from-teal-600 hover:to-teal-700"
            >
              Back to User List
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white p-8 rounded-2xl shadow-2xl transform transition-all duration-500 animate-bounce-in">
            <div className="text-center space-y-4">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Success!</h3>
              <p className="text-gray-600">User updated successfully</p>
              <div className="w-full bg-green-200 rounded-full h-2.5">
                <div 
                  className="bg-green-500 h-2.5 rounded-full animate-progress" 
                  style={{ animationDuration: '2.5s' }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="max-w-md mx-auto">
        <div className="text-center mb-10 space-y-2">
          <h2 className="text-4xl font-bold text-gray-800">
            Update <span className="text-teal-600">User</span>
          </h2>
          <p className="text-gray-600">
            Edit the user profile information below
          </p>
        </div>

        <div className="bg-white py-8 px-6 shadow-xl rounded-2xl animate-fade-in-up">
          {message && !showSuccess && (
            <div
              className={`mb-6 p-4 rounded-lg border-l-4 ${
                message.includes("success")
                  ? "bg-green-50 border-green-500 text-green-700"
                  : "bg-red-50 border-red-500 text-red-700"
              }`}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-6 w-6 ${
                      message.includes("success") ? "text-green-500" : "text-red-500"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={
                        message.includes("success")
                          ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          : "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      }
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className={`text-sm font-medium ${
                    message.includes("success") ? "text-green-800" : "text-red-800"
                  }`}>
                    {message}
                  </p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 gap-5">
              <div className="space-y-2">
                <label
                  htmlFor="first_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                    className="block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-sm transition duration-300 placeholder-gray-400"
                    placeholder="Enter first name"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="last_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                    className="block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-sm transition duration-300 placeholder-gray-400"
                    placeholder="Enter last name"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-sm transition duration-300 placeholder-gray-400"
                    placeholder="Enter email address"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700"
                >
                  User Role
                </label>
                <div className="relative">
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                    className="block w-full appearance-none border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-sm transition duration-300 bg-white pr-10"
                  >
                    <option value="">Select a role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                    <option value="editor">Editor</option>
                    <option value="manager">Manager</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="phone_number"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    id="phone_number"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    required
                    className="block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-sm transition duration-300 placeholder-gray-400"
                    placeholder="Enter phone number"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`flex-1 flex justify-center items-center py-3 px-6 rounded-xl shadow-lg text-sm font-medium text-white ${
                  loading
                    ? "bg-teal-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-300 transform hover:scale-[1.02]`}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Updating...
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Update User
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate("/admin")}
                className="flex-1 py-3 px-6 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-300 transform hover:scale-[1.02]"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;