// src/components/ItemForm/ItemForm.js
import React, { useState } from 'react';
import './ItemForm.css';
import { addItem } from '../../services/itemService';

const ItemForm = () => {
  const [formData, setFormData] = useState({
    Item_Name: '',
    Item_Type: '',
    Item_Code: '',
    Quantity: '',
    Item_Model: '',
    Item_Serial: '',
    Item_Category: '',
    Reg_Date: '',
    Status: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addItem(formData);
      setSuccess('Item added successfully');
      setFormData({
        Item_Name: '',
        Item_Type: '',
        Item_Code: '',
        Quantity: '',
        Item_Model: '',
        Item_Serial: '',
        Item_Category: '',
        Reg_Date: '',
        Status: '',
      });
    } catch (err) {
      setError('Error adding item');
    }
  };

  return (
    <div className="item-form">
      <h2>Add Item</h2>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="Item_Name"
          value={formData.Item_Name}
          onChange={handleChange}
          placeholder="Item Name"
          required
        />
        <input
          type="text"
          name="Item_Type"
          value={formData.Item_Type}
          onChange={handleChange}
          placeholder="Item Type"
          required
        />
        <input
          type="text"
          name="Item_Code"
          value={formData.Item_Code}
          onChange={handleChange}
          placeholder="Item Code"
          required
        />
        <input
          type="number"
          name="Quantity"
          value={formData.Quantity}
          onChange={handleChange}
          placeholder="Quantity"
          required
        />
        <input
          type="text"
          name="Item_Model"
          value={formData.Item_Model}
          onChange={handleChange}
          placeholder="Item Model"
        />
        <input
          type="text"
          name="Item_Serial"
          value={formData.Item_Serial}
          onChange={handleChange}
          placeholder="Item Serial"
        />
        <input
          type="text"
          name="Item_Category"
          value={formData.Item_Category}
          onChange={handleChange}
          placeholder="Item Category"
        />
        <input
          type="date"
          name="Reg_Date"
          value={formData.Reg_Date}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="Status"
          value={formData.Status}
          onChange={handleChange}
          placeholder="Status"
          required
        />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default ItemForm;
