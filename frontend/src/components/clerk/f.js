// import React, { useState } from 'react';
// import './AddItem.css'; 

// const AddItem = () => {
//   const [item, setItem] = useState({
//     Item_Code: '',
//     Item_Name: '',
//     Item_Type: '',
//     Quantity: '',
//     Item_Model: '',
//     Item_Serial: '',
//     Item_Category: '',
//     Reg_Date: '',
//     Status: ''
//   });
//   const [addedItem, setAddedItem] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setItem({
//       ...item,
//       [name]: value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('http://localhost:5000/api/items/addItem', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(item),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to add item');
//       }

//       const data = await response.json();
//       console.log('Item added:', data);
//       setAddedItem(data); // Set the added item to be displayed
//       setItem({
//         Item_Code: '',
//         Item_Name: '',
//         Item_Type: '',
//         Quantity: '',
//         Item_Model: '',
//         Item_Serial: '',
//         Item_Category: '',
//         Reg_Date: '',
//         Status: ''
//       });
//     } catch (err) {
//       console.error('Error adding item:', err);
//     }
//   };

//   return (
//     <div>
//       <h2>Add Item</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="text" name="Item_Code" placeholder="Item Code" value={item.Item_Code} onChange={handleChange} required />
//         <input type="text" name="Item_Name" placeholder="Item Name" value={item.Item_Name} onChange={handleChange} required />
//         <input type="text" name="Item_Type" placeholder="Item Type" value={item.Item_Type} onChange={handleChange} required />
//         <input type="number" name="Quantity" placeholder="Quantity" value={item.Quantity} onChange={handleChange} required />
//         <input type="text" name="Item_Model" placeholder="Item Model" value={item.Item_Model} onChange={handleChange} required />
//         <input type="text" name="Item_Serial" placeholder="Item Serial" value={item.Item_Serial} onChange={handleChange} required />
//         <input type="text" name="Item_Category" placeholder="Item Category" value={item.Item_Category} onChange={handleChange} required />
//         <input type="date" name="Reg_Date" placeholder="Registration Date" value={item.Reg_Date} onChange={handleChange} required />
//         <input type="text" name="Status" placeholder="Status" value={item.Status} onChange={handleChange} required />
//         <button type="submit">Add Item</button>
//       </form>
      
//       {addedItem && (
//         <div className="item-display">
//           <h3>Added Item Details</h3>
//           <p><strong>Item Code:</strong> {addedItem.Item_Code}</p>
//           <p><strong>Item Name:</strong> {addedItem.Item_Name}</p>
//           <p><strong>Item Type:</strong> {addedItem.Item_Type}</p>
//           <p><strong>Quantity:</strong> {addedItem.Quantity}</p>
//           <p><strong>Item Model:</strong> {addedItem.Item_Model}</p>
//           <p><strong>Item Serial:</strong> {addedItem.Item_Serial}</p>
//           <p><strong>Item Category:</strong> {addedItem.Item_Category}</p>
//           <p><strong>Registration Date:</strong> {addedItem.Reg_Date}</p>
//           <p><strong>Status:</strong> {addedItem.Status}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AddItem;

// corect one 


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const AddItem = () => {
//   const [item, setItem] = useState({
//     item_code: '',
//     item_name: '',
//     item_type: '',
//     quantity: '',
//     item_model: '',
//     item_serial: '',
//     item_category: '',
//     reg_date: '',
//     status: 'Active'
//   });
//   const [addedItem, setAddedItem] = useState(null);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setItem({
//       ...item,
//       [name]: value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);

//     // Basic validation
//     if (!item.item_code || !item.item_name || !item.item_type || item.quantity === '') {
//       setError('Please fill in all required fields: Item Code, Name, Type, and Quantity');
//       return;
//     }

//     if (item.quantity < 0) {
//       setError('Quantity cannot be negative');
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:5000/api/items/items', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(item),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Failed to add item');
//       }

//       const data = await response.json();
//       console.log('Item added:', data);
//       setAddedItem({ ...item, item_id: data.itemId });
//       setItem({
//         item_code: '',
//         item_name: '',
//         item_type: '',
//         quantity: '',
//         item_model: '',
//         item_serial: '',
//         item_category: '',
//         reg_date: '',
//         status: 'Active'
//       });
//       navigate('/'); // Redirect to item list after successful addition
//     } catch (err) {
//       console.error('Error adding item:', err);
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white text-black flex items-center justify-center p-4">
//       <div className="max-w-md w-full space-y-2">
//         {/* Form */}
//         <div className="bg-white border border-gray-300 rounded-lg px-4 py-4">
//           <h2 className="text-xl font-bold mb-4 text-teal-600">Add New Item</h2>
//           {error && (
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
//               {error}
//             </div>
//           )}
//           <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
//             <div>
//               <label className="font-bold text-sm">Item Code *</label>
//               <input
//                 type="text"
//                 name="item_code"
//                 placeholder="Item Code"
//                 value={item.item_code}
//                 onChange={handleChange}
//                 required
//                 className="w-full border rounded-md py-1 px-2 mt-1 bg-white border-gray-400 placeholder-gray-500 text-black text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
//               />
//             </div>

//             <div>
//               <label className="font-bold text-sm">Item Name *</label>
//               <input
//                 type="text"
//                 name="item_name"
//                 placeholder="Item Name"
//                 value={item.item_name}
//                 onChange={handleChange}
//                 required
//                 className="w-full border rounded-md py-1 px-2 mt-1 bg-white border-gray-400 placeholder-gray-500 text-black text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
//               />
//             </div>

//             <div>
//               <label className="font-bold text-sm">Item Type *</label>
//               <input
//                 type="text"
//                 name="item_type"
//                 placeholder="Item Type"
//                 value={item.item_type}
//                 onChange={handleChange}
//                 required
//                 className="w-full border rounded-md py-1 px-2 mt-1 bg-white border-gray-400 placeholder-gray-500 text-black text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
//               />
//             </div>

//             <div>
//               <label className="font-bold text-sm">Quantity *</label>
//               <input
//                 type="number"
//                 name="quantity"
//                 placeholder="Quantity"
//                 value={item.quantity}
//                 onChange={handleChange}
//                 min="0"
//                 required
//                 className="w-full border rounded-md py-1 px-2 mt-1 bg-white border-gray-400 placeholder-gray-500 text-black text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
//               />
//             </div>

//             <div>
//               <label className="font-bold text-sm">Item Model</label>
//               <input
//                 type="text"
//                 name="item_model"
//                 placeholder="Item Model"
//                 value={item.item_model}
//                 onChange={handleChange}
//                 className="w-full border rounded-md py-1 px-2 mt-1 bg-white border-gray-400 placeholder-gray-500 text-black text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
//               />
//             </div>

//             <div>
//               <label className="font-bold text-sm">Item Serial</label>
//               <input
//                 type="text"
//                 name="item_serial"
//                 placeholder="Item Serial"
//                 value={item.item_serial}
//                 onChange={handleChange}
//                 className="w-full border rounded-md py-1 px-2 mt-1 bg-white border-gray-400 placeholder-gray-500 text-black text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
//               />
//             </div>

//             <div>
//               <label className="font-bold text-sm">Item Category</label>
//               <input
//                 type="text"
//                 name="item_category"
//                 placeholder="Item Category"
//                 value={item.item_category}
//                 onChange={handleChange}
//                 className="w-full border rounded-md py-1 px-2 mt-1 bg-white border-gray-400 placeholder-gray-500 text-black text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
//               />
//             </div>

//             <div>
//               <label className="font-bold text-sm">Registration Date</label>
//               <input
//                 type="date"
//                 name="reg_date"
//                 value={item.reg_date}
//                 onChange={handleChange}
//                 className="w-full border rounded-md py-1 px-2 mt-1 bg-white border-gray-400 text-black text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
//               />
//             </div>

//             <div>
//               <label className="font-bold text-sm">Status</label>
//               <select
//                 name="status"
//                 value={item.status}
//                 onChange={handleChange}
//                 className="w-full border rounded-md py-1 px-2 mt-1 bg-white border-gray-400 text-black text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
//               >
//                 <option value="Active">Active</option>
//                 <option value="Inactive">Inactive</option>
//               </select>
//             </div>

//             <button
//               type="submit"
//               className="bg-teal-600 hover:bg-teal-700 text-white rounded-lg py-1 px-4 font-semibold transition-colors duration-200 shadow-md hover:shadow-lg"
//             >
//               Add Item
//             </button>
//           </form>
//         </div>

//         {/* Added Item Display */}
//         {addedItem && (
//           <div className="bg-white border border-gray-300 rounded-lg px-4 py-4 mt-2">
//             <h3 className="font-bold text-base mb-2">Added Item Details</h3>
//             <div className="space-y-1 text-xs">
//               <p><strong>Item ID:</strong> {addedItem.item_id}</p>
//               <p><strong>Item Code:</strong> {addedItem.item_code}</p>
//               <p><strong>Item Name:</strong> {addedItem.item_name}</p>
//               <p><strong>Item Type:</strong> {addedItem.item_type}</p>
//               <p><strong>Quantity:</strong> {addedItem.quantity}</p>
//               <p><strong>Item Model:</strong> {addedItem.item_model || '-'}</p>
//               <p><strong>Item Serial:</strong> {addedItem.item_serial || '-'}</p>
//               <p><strong>Item Category:</strong> {addedItem.item_category || '-'}</p>
//               <p><strong>Reg Date:</strong> {addedItem.reg_date ? new Date(addedItem.reg_date).toLocaleDateString() : '-'}</p>
//               <p><strong>Status:</strong> {addedItem.status}</p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AddItem;


// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const AddItem = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     item_id: "",
//     item_code: "",
//     item_name: "",
//     item_type: "",
//     quantity: "",
//     item_model: "",
//     item_serial: "",
//     item_category: "",
//     threshold: "",
//     last_used_date: "",
//     average_usage: "",
//     predicted_demand: "",
//     status: "Active",
//   });
//   const [error, setError] = useState(null);
//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setMessage("");

//     // Validation
//     if (!formData.item_id || !formData.item_code || !formData.item_name || !formData.item_type || formData.quantity === "") {
//       setError("Please fill in all required fields: Item ID, Code, Name, Type, and Quantity.");
//       return;
//     }

//     if (parseInt(formData.quantity) < 0) {
//       setError("Quantity cannot be negative.");
//       return;
//     }

//     try {
//       const response = await axios.post("http://localhost:5000/api/items/items", formData, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       setMessage(response.data.message || "Item added successfully!");
//       setTimeout(() => navigate("/"), 2000); // Redirect after 2 seconds
//     } catch (err) {
//       console.error("Error adding item:", err);
//       setError(err.response?.data?.error || "Failed to add item.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white text-black flex items-center justify-center p-4">
//       <div className="max-w-md w-full space-y-2">
//         <div className="bg-white border border-gray-300 rounded-lg px-4 py-4">
//           <h2 className="text-xl font-bold mb-4 text-teal-600">Add New Item</h2>
//           {message && (
//             <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4">
//               {message}
//             </div>
//           )}
//           {error && (
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
//               {error}
//             </div>
//           )}
//           <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
//             <input
//               type="text"
//               name="item_id"
//               placeholder="Item ID *"
//               value={formData.item_id}
//               onChange={handleChange}
//               required
//               className="w-full border rounded-md py-1 px-2"
//             />
//             <input
//               type="text"
//               name="item_code"
//               placeholder="Item Code *"
//               value={formData.item_code}
//               onChange={handleChange}
//               required
//               className="w-full border rounded-md py-1 px-2"
//             />
//             <input
//               type="text"
//               name="item_name"
//               placeholder="Item Name *"
//               value={formData.item_name}
//               onChange={handleChange}
//               required
//               className="w-full border rounded-md py-1 px-2"
//             />
//             <input
//               type="text"
//               name="item_type"
//               placeholder="Item Type *"
//               value={formData.item_type}
//               onChange={handleChange}
//               required
//               className="w-full border rounded-md py-1 px-2"
//             />
//             <input
//               type="number"
//               name="quantity"
//               placeholder="Quantity *"
//               value={formData.quantity}
//               onChange={handleChange}
//               required
//               className="w-full border rounded-md py-1 px-2"
//             />
//             <input
//               type="text"
//               name="item_model"
//               placeholder="Item Model"
//               value={formData.item_model}
//               onChange={handleChange}
//               className="w-full border rounded-md py-1 px-2"
//             />
//             <input
//               type="text"
//               name="item_serial"
//               placeholder="Item Serial"
//               value={formData.item_serial}
//               onChange={handleChange}
//               className="w-full border rounded-md py-1 px-2"
//             />
//             <input
//               type="text"
//               name="item_category"
//               placeholder="Item Category"
//               value={formData.item_category}
//               onChange={handleChange}
//               className="w-full border rounded-md py-1 px-2"
//             />
//             <input
//               type="number"
//               name="threshold"
//               placeholder="Threshold"
//               value={formData.threshold}
//               onChange={handleChange}
//               className="w-full border rounded-md py-1 px-2"
//             />
//             <input
//               type="date"
//               name="last_used_date"
//               value={formData.last_used_date}
//               onChange={handleChange}
//               className="w-full border rounded-md py-1 px-2"
//             />
//             <input
//               type="number"
//               name="average_usage"
//               placeholder="Average Usage"
//               value={formData.average_usage}
//               onChange={handleChange}
//               className="w-full border rounded-md py-1 px-2"
//             />
//             <input
//               type="number"
//               name="predicted_demand"
//               placeholder="Predicted Demand"
//               value={formData.predicted_demand}
//               onChange={handleChange}
//               className="w-full border rounded-md py-1 px-2"
//             />
//             <select
//               name="status"
//               value={formData.status}
//               onChange={handleChange}
//               className="w-full border rounded-md py-1 px-2"
//             >
//               <option value="Active">Active</option>
//               <option value="Inactive">Inactive</option>
//             </select>
//             <button
//               type="submit"
//               className="bg-teal-600 hover:bg-teal-700 text-white rounded-lg py-2 px-4 font-semibold"
//             >
//               Add Item
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddItem;


import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddItem = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    item_id: "",
    item_code: "",
    item_name: "",
    item_type: "",
    quantity: "",
    item_model: "",
    item_serial: "",
    item_category: "",
    threshold: "",
    status: "Active",
  });
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage("");

    // Validation
    if (!formData.item_id || !formData.item_code || !formData.item_name || !formData.item_type || formData.quantity === "") {
      setError("Please fill in all required fields: Item ID, Code, Name, Type, and Quantity.");
      return;
    }

    if (parseInt(formData.quantity) < 0) {
      setError("Quantity cannot be negative.");
      return;
    }

    try {
      // Send the item data to the backend
      const response = await axios.post("http://localhost:5000/api/items/items", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setMessage(response.data.message || "Item added successfully!");
      setTimeout(() => navigate("/"), 2000); // Redirect after 2 seconds
    } catch (err) {
      console.error("Error adding item:", err);
      setError(err.response?.data?.error || "Failed to add item.");
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-2">
        <div className="bg-white border border-gray-300 rounded-lg px-4 py-4">
          <h2 className="text-xl font-bold mb-4 text-teal-600">Add New Item</h2>
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
            <input
              type="text"
              name="item_id"
              placeholder="Item ID *"
              value={formData.item_id}
              onChange={handleChange}
              required
              className="w-full border rounded-md py-1 px-2"
            />
            <input
              type="text"
              name="item_code"
              placeholder="Item Code *"
              value={formData.item_code}
              onChange={handleChange}
              required
              className="w-full border rounded-md py-1 px-2"
            />
            <input
              type="text"
              name="item_name"
              placeholder="Item Name *"
              value={formData.item_name}
              onChange={handleChange}
              required
              className="w-full border rounded-md py-1 px-2"
            />
            <input
              type="text"
              name="item_type"
              placeholder="Item Type *"
              value={formData.item_type}
              onChange={handleChange}
              required
              className="w-full border rounded-md py-1 px-2"
            />
            <input
              type="number"
              name="quantity"
              placeholder="Quantity *"
              value={formData.quantity}
              onChange={handleChange}
              required
              className="w-full border rounded-md py-1 px-2"
            />
            <input
              type="text"
              name="item_model"
              placeholder="Item Model"
              value={formData.item_model}
              onChange={handleChange}
              className="w-full border rounded-md py-1 px-2"
            />
            <input
              type="text"
              name="item_serial"
              placeholder="Item Serial"
              value={formData.item_serial}
              onChange={handleChange}
              className="w-full border rounded-md py-1 px-2"
            />
            <input
              type="text"
              name="item_category"
              placeholder="Item Category"
              value={formData.item_category}
              onChange={handleChange}
              className="w-full border rounded-md py-1 px-2"
            />
            <input
              type="number"
              name="threshold"
              placeholder="Threshold"
              value={formData.threshold}
              onChange={handleChange}
              className="w-full border rounded-md py-1 px-2"
            />
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border rounded-md py-1 px-2"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <button
              type="submit"
              className="bg-teal-600 hover:bg-teal-700 text-white rounded-lg py-2 px-4 font-semibold"
            >
              Add Item
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddItem;