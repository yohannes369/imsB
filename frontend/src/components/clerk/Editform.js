import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditForm = () => {
  const { id } = useParams(); // Get item ID from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Item_Code: "",
    Item_Name: "",
    Item_Type: "",
    Quantity: "",
    Item_Model: "",
    Item_Serial: "",
    Item_Category: "",
    Reg_Date: "",
    Status: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch item data when the component loads
  useEffect(() => {
    if (!id) {
      setError("Error: Item ID is missing.");
      setLoading(false);
      return;
    }

    setLoading(true);

    axios
      .get(`localhost:5000/api/items/${id}`)
      .then((response) => {
        if (response.data && response.data.id) {
          setFormData(response.data);
        } else {
          setError("Error: Item not found.");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Failed to fetch item.");
        setLoading(false);
      });
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!id) {
      console.error("Error: Item ID is missing.");
      return;
    }

    // Send PUT request to update the item
    axios
      .put(`localhost:5000/api/items/${id}`, formData)
      .then((response) => {
        console.log("Item updated successfully", response.data);
        navigate("/items"); // Redirect after update
      })
      .catch((err) => {
        console.error("Update failed:", err);
        setError("Failed to update item.");
      });
  };

  // Show loading or error messages
  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <form onSubmit={handleSubmit}>
      <label>Item Code:</label>
      <input
        type="text"
        name="Item_Code"
        value={formData.Item_Code}
        onChange={handleChange}
        required
      />

      <label>Item Name:</label>
      <input
        type="text"
        name="Item_Name"
        value={formData.Item_Name}
        onChange={handleChange}
        required
      />

      <label>Item Type:</label>
      <input
        type="text"
        name="Item_Type"
        value={formData.Item_Type}
        onChange={handleChange}
        required
      />

      <label>Quantity:</label>
      <input
        type="number"
        name="Quantity"
        value={formData.Quantity}
        onChange={handleChange}
        required
      />

      <label>Item Model:</label>
      <input
        type="text"
        name="Item_Model"
        value={formData.Item_Model}
        onChange={handleChange}
        required
      />

      <label>Item Serial:</label>
      <input
        type="text"
        name="Item_Serial"
        value={formData.Item_Serial}
        onChange={handleChange}
        required
      />

      <label>Item Category:</label>
      <input
        type="text"
        name="Item_Category"
        value={formData.Item_Category}
        onChange={handleChange}
        required
      />

      <label>Registration Date:</label>
      <input
        type="datetime-local"
        name="Reg_Date"
        value={formData.Reg_Date}
        onChange={handleChange}
        required
      />

      <label>Status:</label>
      <select
        name="Status"
        value={formData.Status}
        onChange={handleChange}
        required
      >
        <option value="">Select Status</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>

      <button type="submit">Update Item</button>
    </form>
  );
};

export default EditForm;
