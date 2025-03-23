import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditForm = () => {
  const { id } = useParams(); // Get id from URL
  const navigate = useNavigate();
  const [item, setItem] = useState({
    item_code: '',
    item_name: '',
    item_type: '',
    quantity: '',
    item_model: '',
    item_serial: '',
    item_category: '',
    reg_date: '',
    status: 'Active'
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  // Fetch item data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/items/items/${id}`);
        const itemData = response.data;
        setItem({
          item_code: itemData.item_code || '',
          item_name: itemData.item_name || '',
          item_type: itemData.item_type || '',
          quantity: itemData.quantity !== undefined ? String(itemData.quantity) : '', // Convert to string for input
          item_model: itemData.item_model || '',
          item_serial: itemData.item_serial || '',
          item_category: itemData.item_category || '',
          reg_date: itemData.reg_date ? new Date(itemData.reg_date).toISOString().split('T')[0] : '',
          status: itemData.status || 'Active'
        });
        setLoading(false);
      } catch (error) {
        console.error('Fetch error:', error);
        setError(error.response?.data?.error || 'Failed to load item data. Please try again.');
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    } else {
      setError('No item ID provided');
      setLoading(false);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem({
      ...item,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage('');

    // Validation
    if (!item.item_code || !item.item_name || !item.item_type || item.quantity === '') {
      setError('Please fill in all required fields: Item Code, Name, Type, and Quantity');
      return;
    }

    if (parseInt(item.quantity) < 0) {
      setError('Quantity cannot be negative');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/items/items/${id}`, item, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setMessage(response.data.message || 'Item updated successfully!');
      setTimeout(() => navigate('/'), 2000); // Redirect after 2 seconds
    } catch (err) {
      console.error('Error updating item:', err);
      setError(err.response?.data?.error || 'Failed to update item');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-teal-600 text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  if (error && !item.item_code) { // Only show error if no data was loaded
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-2">
        <div className="bg-white border border-gray-300 rounded-lg px-4 py-4">
          <h2 className="text-xl font-bold mb-4 text-teal-600">Edit Item (ID: {id})</h2>
          {message && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4">
              {message}
            </div>
          )}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
            <div>
              <label className="font-bold text-sm">Item Code *</label>
              <input
                type="text"
                name="item_code"
                placeholder="Item Code"
                value={item.item_code}
                onChange={handleChange}
                required
                className="w-full border rounded-md py-1 px-2 mt-1 bg-white border-gray-400 placeholder-gray-500 text-black text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="font-bold text-sm">Item Name *</label>
              <input
                type="text"
                name="item_name"
                placeholder="Item Name"
                value={item.item_name}
                onChange={handleChange}
                required
                className="w-full border rounded-md py-1 px-2 mt-1 bg-white border-gray-400 placeholder-gray-500 text-black text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="font-bold text-sm">Item Type *</label>
              <input
                type="text"
                name="item_type"
                placeholder="Item Type"
                value={item.item_type}
                onChange={handleChange}
                required
                className="w-full border rounded-md py-1 px-2 mt-1 bg-white border-gray-400 placeholder-gray-500 text-black text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="font-bold text-sm">Quantity *</label>
              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={item.quantity}
                onChange={handleChange}
                min="0"
                required
                className="w-full border rounded-md py-1 px-2 mt-1 bg-white border-gray-400 placeholder-gray-500 text-black text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="font-bold text-sm">Item Model</label>
              <input
                type="text"
                name="item_model"
                placeholder="Item Model"
                value={item.item_model}
                onChange={handleChange}
                className="w-full border rounded-md py-1 px-2 mt-1 bg-white border-gray-400 placeholder-gray-500 text-black text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="font-bold text-sm">Item Serial</label>
              <input
                type="text"
                name="item_serial"
                placeholder="Item Serial"
                value={item.item_serial}
                onChange={handleChange}
                className="w-full border rounded-md py-1 px-2 mt-1 bg-white border-gray-400 placeholder-gray-500 text-black text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="font-bold text-sm">Item Category</label>
              <input
                type="text"
                name="item_category"
                placeholder="Item Category"
                value={item.item_category}
                onChange={handleChange}
                className="w-full border rounded-md py-1 px-2 mt-1 bg-white border-gray-400 placeholder-gray-500 text-black text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="font-bold text-sm">Registration Date</label>
              <input
                type="date"
                name="reg_date"
                value={item.reg_date}
                onChange={handleChange}
                className="w-full border rounded-md py-1 px-2 mt-1 bg-white border-gray-400 text-black text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="font-bold text-sm">Status</label>
              <select
                name="status"
                value={item.status}
                onChange={handleChange}
                className="w-full border rounded-md py-1 px-2 mt-1 bg-white border-gray-400 text-black text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="flex-1 bg-teal-600 hover:bg-teal-700 text-white rounded-lg py-1 px-4 font-semibold transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                Update Item
              </button>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white rounded-lg py-1 px-4 font-semibold transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditForm;