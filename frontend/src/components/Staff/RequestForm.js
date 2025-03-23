import React, { useState } from 'react';
import axios from 'axios';

const RequestForm = ({ employeeId }) => {
  const [formData, setFormData] = useState({
    item_id: '',
    quantity: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/requests', {
        employee_id: employeeId,
        item_id: formData.item_id,
        quantity: formData.quantity
      });
      setMessage(response.data.message);
      setFormData({ item_id: '', quantity: '' });
    } catch (error) {
      setMessage(error.response?.data?.error || 'Error submitting request');
    }
  };

  return (
    <div className="request-form">
      <h2>Submit Item Request</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Item ID:</label>
          <input
            type="number"
            name="item_id"
            value={formData.item_id}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            min="1"
            required
          />
        </div>
        <button type="submit">Submit Request</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RequestForm;