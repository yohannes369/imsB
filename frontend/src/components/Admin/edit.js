// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const UpdateUser = () => {
//   const { email } = useParams(); // Get email from URL
//   const navigate = useNavigate();

//   // State for form fields
//   const [formData, setFormData] = useState({
//     first_name: "",
//     last_name: "",
//     role: "",
//     phone_number: "",
//     email: "", // Add email to formData
//   });

//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   // Fetch user data by email
//   useEffect(() => {
//     axios.get(`http://localhost:5000/api/auth/fetchData/${email}`)
//       .then((res) => {
//         // Find the user by email and set form data
//         const user = res.data.find((user) => user.email === email);
//         if (user) {
//           setFormData(user);
//         } else {
//           setMessage("User not found");
//         }
//       })
//       .catch(() => setMessage("Failed to load user data"));
//   }, [email]);

//   // Handle input changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     try {
//       const response = await axios.put(`http://localhost:5000/api/users/updateUser/${email}`, formData);
//       setMessage(response.data.message);
//       setTimeout(() => navigate("/edit"), 2000); // Redirect after success
//     } catch (error) {
//       setMessage(error.response?.data?.error || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow-lg rounded-lg">
//       <h2 className="text-2xl font-bold mb-4">Update User</h2>

//       {message && <p className="text-red-500 mb-4">{message}</p>}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="first_name"
//           value={formData.first_name}
//           onChange={handleChange}
//           placeholder="First Name"
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="text"
//           name="last_name"
//           value={formData.last_name}
//           onChange={handleChange}
//           placeholder="Last Name"
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="text"
//           name="role"
//           value={formData.role}
//           onChange={handleChange}
//           placeholder="Role"
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="text"
//           name="phone_number"
//           value={formData.phone_number}
//           onChange={handleChange}
//           placeholder="Phone Number"
//           className="w-full p-2 border rounded"
//         />

//         {/* Make the email field editable */}
//         <input
//           type="text"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           placeholder="Email"
//           className="w-full p-2 border rounded"
//         />

//         <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
//           {loading ? "Updating..." : "Update"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UpdateUser;
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateUser = () => {
  const { email } = useParams(); // Get email from URL params
  const navigate = useNavigate();

  // State for form fields
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    role: "",
    phone_number: "",
    email: "",
  });

  const [loading, setLoading] = useState(true); // Start as true since we're fetching data
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  // Fetch user data by email when component mounts
  useEffect(() => {
    if (!email) {
      setError("No email provided in the URL. Please select a user to edit.");
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/auth/fetchData/${email}`);
        const user = response.data.find((user) => user.email === email);
        if (user) {
          setFormData(user);
        } else {
          setError("User not found with the provided email.");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.response?.data?.message || "Failed to load user data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [email]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setMessage("Cannot update: No email provided.");
      return;
    }

    setLoading(true);
    setMessage("");
    setError(null);

    try {
      const response = await axios.put(`http://localhost:5000/api/users/updateUser/${email}`, formData);
      setMessage(response.data.message || "User updated successfully!");
      setTimeout(() => navigate("/edit"), 2000); // Redirect after 2 seconds
    } catch (err) {
      console.error("Update error:", err);
      setError(err.response?.data?.error || "Something went wrong during update.");
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (loading && !message) {
    return <div className="text-center text-gray-600 py-12 text-lg font-medium">Loading user data...</div>;
  }

  // Error state (e.g., no email or fetch failure)
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
              placeholder="First Name"
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
              placeholder="Last Name"
              required
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Role</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="Role"
              required
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Phone Number</label>
            <input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              placeholder="Phone Number"
              required
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900"
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 py-2 px-4 rounded-lg shadow-md transition-all duration-200 ${
                loading
                  ? "bg-teal-400 cursor-not-allowed"
                  : "bg-teal-600 hover:bg-teal-700 hover:shadow-lg text-white"
              }`}
            >
              {loading ? "Updating..." : "Update"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/edit/:email")}
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
