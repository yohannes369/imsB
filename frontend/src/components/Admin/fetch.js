import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUserPlus, FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Loader from "./Loader";

const styles = {
  container: {
    maxWidth: "1000px",
    margin: "2rem auto",
    padding: "2rem",
    backgroundColor: "#f9fafb",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    fontSize: "2rem",
    fontWeight: "600",
    color: "#333",
    marginBottom: "1.5rem",
    textAlign: "center",
  },
  button: {
    padding: "0.5rem 1rem",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "0.5rem",
  },
  addButton: {
    backgroundColor: "#3498db",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  editButton: { backgroundColor: "#f39c12" },
  deleteButton: { backgroundColor: "#e74c3c" },
};

const FetchDataComponent = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch Data Function
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

        const response = await axios.get("http://localhost:5000/api/auth/fetchData", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setData(response.data);
      } catch (error) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Delete User Function
  const deleteUser = async (id) => {
    if (!id) return alert("ID is required");

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) return alert("Please log in");

      await axios.delete(`http://localhost:5000/api/auth/deleteUser/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setData((prevData) => prevData.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
      setError("Error deleting user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>User Data</h1>
      <Link to="/add">
        <button style={{ ...styles.button, ...styles.addButton }}>
          <FaUserPlus /> Add User
        </button>
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <p>{error}</p>
      ) : data.length === 0 ? (
        <p>No data available</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Phone Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <tr key={user.id}>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.phone_number}</td>
                <td>
                  <Link to={`/edit/${user.id}`} replace>
                    <button style={{ ...styles.button, ...styles.editButton }}>
                      <FaEdit /> Edit
                    </button>
                  </Link>

                  <button
                    style={{ ...styles.button, ...styles.deleteButton }}
                    onClick={() => deleteUser(user.id)}
                    disabled={loading}
                  >
                    <FaTrash /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FetchDataComponent;