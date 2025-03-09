import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateUser = () => {
  const { email } = useParams(); // Get email from URL
  const navigate = useNavigate();

  // State for form fields
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    role: "",
    phone_number: "",
    email: "", // Add email to formData
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch user data by email
  useEffect(() => {
    axios.get(`http://localhost:5000/api/auth/fetchData`)
      .then((res) => {
        // Find the user by email and set form data
        const user = res.data.find((user) => user.email === email);
        if (user) {
          setFormData(user);
        } else {
          setMessage("User not found");
        }
      })
      .catch(() => setMessage("Failed to load user data"));
  }, [email]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.put(`http://localhost:5000/api/users/updateUser/${email}`, formData);
      setMessage(response.data.message);
      setTimeout(() => navigate("/fetch"), 2000); // Redirect after success
    } catch (error) {
      setMessage(error.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Update User</h2>

      {message && <p className="text-red-500 mb-4">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          placeholder="First Name"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          placeholder="Last Name"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="role"
          value={formData.role}
          onChange={handleChange}
          placeholder="Role"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full p-2 border rounded"
        />

        {/* Make the email field editable */}
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 border rounded"
        />

        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
