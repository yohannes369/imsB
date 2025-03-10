import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get the item passed from the previous page (via the state)
  const item = location.state?.item;

  // Define the initial form data
  const initialFormData = {
    Item_Code: '',  // Default empty value
    Item_Name: '',
    Item_Type: '',
    Quantity: '',
    Item_Model: '',
    Item_Serial: '',
    Item_Category: '',
    Status: 'Active',
    Reg_Date: '', // Add a default value for Reg_Date
  };

  // Set the form data with item if it exists
  const [formData, setFormData] = useState(item ? {
    Item_Code: item.Item_Code,
    Item_Name: item.Item_Name,
    Item_Type: item.Item_Type,
    Quantity: item.Quantity,
    Item_Model: item.Item_Model || '',
    Item_Serial: item.Item_Serial || '',
    Item_Category: item.Item_Category || '',
    Status: item.Status || 'Active',
    Reg_Date: item.Reg_Date || '',  // Ensure Reg_Date is included
  } : initialFormData);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit the form to update the existing item
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate if essential fields are present
    if (!formData.Item_Code || !formData.Item_Name || !formData.Item_Type || !formData.Quantity || !formData.Reg_Date) {
      alert("Missing required fields.");
      return;
    }
  
    console.log('Submitting item data:', formData);
  
    try {
      // Include Reg_Date in the payload when submitting the form
      await axios.put(`http://localhost:5000/api/items/updateItem/${formData.Item_Code}`, formData);
      navigate('/'); // Navigate back to the item list after successful update
    } catch (error) {
      console.error("Error updating item:", error);
      alert('Failed to update item.');
    }
  };

  return (
    <div className="edit-form">
      <h2>Edit Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="Item_Name"
            value={formData.Item_Name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Type:</label>
          <input
            type="text"
            name="Item_Type"
            value={formData.Item_Type}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Quantity:</label>
          <input
            type="number"
            name="Quantity"
            value={formData.Quantity}
            onChange={handleChange}
            required
            min="1"
          />
        </div>

        <div className="form-group">
          <label>Model:</label>
          <input
            type="text"
            name="Item_Model"
            value={formData.Item_Model}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Serial:</label>
          <input
            type="text"
            name="Item_Serial"
            value={formData.Item_Serial}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Category:</label>
          <input
            type="text"
            name="Item_Category"
            value={formData.Item_Category}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Status:</label>
          <select
            name="Status"
            value={formData.Status}
            onChange={handleChange}
            required
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        <div className="form-group">
          <label>Registration Date:</label>
          <input
            type="date"
            name="Reg_Date"
            value={formData.Reg_Date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => navigate('/')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditForm;
