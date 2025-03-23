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
  const { id } = useParams(); // Get user ID from URL params
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

        const response = await axios.get(`http://localhost:5000/api/auth/getUserById/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const user = response.data;
        if (user) {
          setFormData(user);
        } else {
          setError("User not found with the provided ID.");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setError(error.response?.data?.message || "Failed to load user data. Please try again.");
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

    setLoading(true);
    setMessage("");
    setError(null);

    try {
      const response = await axios.post(`http://localhost:5000/api/auth/updateUser/${id}`, formData);
      setMessage(response.data.message || "User updated successfully!");
      setTimeout(() => navigate("/admin"), 2000);
    } catch (err) {
      console.error("Update error:", err);
      setError(err.response?.data?.error || "Something went wrong during update.");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !message) {
    return <div className="text-center text-gray-600 py-12 text-lg font-medium">Loading user data...</div>;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="max-w-lg w-full bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-red-600 text-lg font-medium mb-4">{error}</p>
          <button
            onClick={() => navigate("/edit")}
            className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            Back to User List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Update User</h2>

        {message && (
          <p className={`text-center mb-4 ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700">First Name</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Last Name</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">role</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">phone_number</label>
            <input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              required
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900"
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 py-2 px-4 rounded-lg shadow-md transition-all duration-200 ${
                loading ? "bg-teal-400 cursor-not-allowed" : "bg-teal-600 hover:bg-teal-700 hover:shadow-lg text-white"
              }`}
            >
              {loading ? "Updating..." : "Update"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin")}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;