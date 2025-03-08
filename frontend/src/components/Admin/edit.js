import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

const EditUserPage = () => {
  const { email } = useParams();
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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/auth/getUser/${email}`);
        setUserData(response.data);
      } catch (error) {
        setError("Error fetching user data");
      }
    };
    fetchUserData();
  }, [email]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.put(`http://localhost:5000/api/auth/editUser/${email}`, userData);
      setLoading(false);
      history.push("/admin"); // Redirect to the Admin Panel after user is updated
    } catch (error) {
      setLoading(false);
      setError("Error updating user");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "2rem" }}>
      <h2>Edit User</h2>
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
            disabled
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
            {loading ? "Updating..." : "Update User"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUserPage;