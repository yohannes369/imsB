import React from "react";
import axios from "axios";

const DeleteUser = ({ match, history }) => {
  const { email } = match.params; // Get the email from URL params

  const deleteUser = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/auth/deleteUser/${email}`);
      history.push("/fetch"); // Navigate back to FetchDataComponent
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <h2>Are you sure you want to delete this user?</h2>
      <button onClick={deleteUser}>Yes, Delete</button>
      <button onClick={() => history.push("/fetch")}>Cancel</button>
    </div>
  );
};

export default DeleteUser;
