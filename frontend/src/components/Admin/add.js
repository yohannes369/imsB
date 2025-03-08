import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const AddUserPage = () => {
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    role: "",
    phone_number: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("http://localhost:5000/api/auth/addUser", userData);
      setLoading(false);
      history.push("/admin"); // Redirect to the Admin Panel after user is added
    } catch (error) {
      setLoading(false);
      setError("Error adding user");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "2rem" }}>
      <h2>Add New User</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="first_name"
            value={userData.first_name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="last_name"
            value={userData.last_name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Role:</label>
          <input
            type="text"
            name="role"
            value={userData.role}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            name="phone_number"
            value={userData.phone_number}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add User"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUserPage;