
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FaUserPlus, FaEdit, FaTrash } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import Loader from "./Loader";

// const styles = {
//   container: {
//     maxWidth: "1000px",
//     margin: "2rem auto",
//     padding: "2rem",
//     backgroundColor: "#f9fafb",
//     borderRadius: "8px",
//     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//   },
//   heading: {
//     fontSize: "2rem",
//     fontWeight: "600",
//     color: "#333",
//     marginBottom: "1.5rem",
//     textAlign: "center",
//   },
//   button: {
//     padding: "0.5rem 1rem",
//     color: "#fff",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//     marginRight: "0.5rem",
//   },
//   addButton: {
//     backgroundColor: "#3498db",
//     display: "flex",
//     alignItems: "center",
//     gap: "0.5rem",
//   },
//   editButton: { backgroundColor: "#f39c12" },
//   deleteButton: { backgroundColor: "#e74c3c" },
// };

// const FetchDataComponent = () => {
//   const [data, setData] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get("http://localhost:5000/api/auth/fetchData");
//         setData(response.data);
//         setLoading(false);
//       } catch (error) {
//         setError("Error fetching data");
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   const deleteUser = async (email) => {
//     if (!email) return alert("Email is required");

//     try {
//       setLoading(true);
//       const token = localStorage.getItem("token");
//       if (!token) return alert("Please log in");

//       await axios.delete(`http://localhost:5000/api/auth/deleteUser/${email}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setData(data.filter((user) => user.email !== email));
//       setLoading(false);
//     } catch (error) {
//       console.error("Error deleting user:", error);
//       setError("Error deleting user");
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.heading}>User Data</h1>
//       <Link to="/add">
//         <button style={{ ...styles.button, ...styles.addButton }}>
//           <FaUserPlus /> Add User
//         </button>
//       </Link>
//       {loading ? (
//         <Loader />
//       ) : error ? (
//         <p>{error}</p>
//       ) : (
//         <table>
//           <thead>
//             <tr>
//               <th>First Name</th>
//               <th>Last Name</th>
//               <th>Email</th>
//               <th>Role</th>
//               <th>Phone Number</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.length === 0 ? (
//               <tr>
//                 <td colSpan="6">No data available</td>
//               </tr>
//             ) : (
//               data.map((user) => (
//                 <tr key={user.email}>
//                   <td>{user.first_name}</td>
//                   <td>{user.last_name}</td>
//                   <td>{user.email}</td>
//                   <td>{user.role}</td>
//                   <td>{user.phone_number}</td>
//                   <td>
//                     <Link to={`/edit/${user.email}`}>
//                       <button style={{ ...styles.button, ...styles.editButton }}>
//                         <FaEdit /> Edit
//                       </button>
//                     </Link>
//                     <button
//                       style={{ ...styles.button, ...styles.deleteButton }}
//                       onClick={() => deleteUser(user.email)}
//                       disabled={loading}
//                     >
//                       <FaTrash /> Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default FetchDataComponent;
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/auth/fetchData");
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching data");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const deleteUser = async (email) => {
    if (!email) return alert("Email is required");

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) return alert("Please log in");

      // Make the DELETE request to delete the user
      await axios.delete(`http://localhost:5000/api/auth/deleteUser/${email}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update the data state by filtering out the deleted user
      setData((prevData) => prevData.filter((user) => user.email !== email));

      setLoading(false);
    } catch (error) {
      console.error("Error deleting user:", error);
      setError("Error deleting user");
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
              <tr key={user.email}>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.phone_number}</td>
                <td>
                  <Link
                    to={{
                      pathname: `/edit`,
                      state: { email: user.email }, // Pass email as state to the edit page
                    }}
                  >
                    <button style={{ ...styles.button, ...styles.editButton }}>
                      <FaEdit /> Edit
                    </button>
                  </Link>

                  <button
                    style={{ ...styles.button, ...styles.deleteButton }}
                    onClick={() => deleteUser(user.email)}
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

