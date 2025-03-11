// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
//  // Import CSS for styling

// const ItemList = ({ refresh }) => {
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedItemCode, setSelectedItemCode] = useState(null);

//   useEffect(() => {
//     getItem();
//   }, [refresh]);

//   const getItem = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get('http://localhost:5000/api/items/getItem');
//       setItems(response.data);
//     } catch (err) {
//       setError(err.response?.data || err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const deleteItem = async (Item_Code) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/items/deleteItem/${Item_Code}`);
//       setItems(items.filter(item => item.Item_Code !== Item_Code));
//     } catch (err) {
//       console.error('Error deleting item:', err);
//     }
//   };

//   const handleItemClick = (Item_Code) => {
//     setSelectedItemCode(Item_Code);
//   };

//   if (loading) {
//     return <div className="loading">Loading items...</div>;
//   }

//   if (error) {
//     return <div className="error">Error: {error}</div>;
//   }

//   return (
//     <div className="item-list-container">
//       <h2>Items List</h2>
//       {items.length === 0 ? (
//         <p>No items found</p>
//       ) : (
//         <table className="item-table">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Name</th>
//               <th>Type</th>
//               <th>Quantity</th>
//               <th>Model</th>
//               <th>Serial</th>
//               <th>Category</th>
//               <th>Registration Date</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {items.map((item) => (
//               <tr key={item.Item_Code} onClick={() => handleItemClick(item.Item_Code)}>
//                 <td>{item.Item_Code}</td>
//                 <td>{item.Item_Name}</td>
//                 <td>{item.Item_Type}</td>
//                 <td>{item.Quantity}</td>
//                 <td>{item.Item_Model}</td>
//                 <td>{item.Item_Serial}</td>
//                 <td>{item.Item_Category}</td>
//                 <td>{new Date(item.Reg_Date).toLocaleDateString()}</td>
//                 <td>{item.Status}</td>
//                 <td>
//                   <button className="delete-btn" onClick={(e) => { e.stopPropagation(); deleteItem(item.Item_Code); }}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default ItemList;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FaTrash, FaEdit, FaPlus } from "react-icons/fa"; // Import the "Add" icon
// import { useNavigate } from "react-router-dom";
// import "./itemlist.css";

// const ItemList = ({ refresh }) => {
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const getItem = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await axios.get("http://localhost:5000/api/items/getItem");
//         setItems(response.data);
//       } catch (err) {
//         setError(err.response?.data || "Failed to fetch items.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     getItem();
//   }, [refresh]); // Re-fetch data when the 'refresh' prop changes

//   const deleteItem = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this item?")) return;

//     try {
//       await axios.delete(`http://localhost:5000/api/items/deleteItem/${id}`);
//       setItems((prevItems) => prevItems.filter((item) => item.id !== id));
//     } catch (err) {
//       alert("Failed to delete item.");
//     }
//   };

//   const navigateToAddItem = () => {
//     navigate("/addItem"); // Navigate to Add Item page
//   };

//   if (loading) return <div>Loading items...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="item-list-container">
//       <h2>Items List</h2>
//       <div className="add-item-container">
//         <button className="add-item-button" onClick={navigateToAddItem}>
//           <FaPlus /> Add Item
//         </button>
//       </div>
//       <table className="item-table">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Type</th>
//             <th>Quantity</th>
//             <th>Model</th>
//             <th>Serial</th>
//             <th>Category</th>
//             <th>Registration Date</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {items.map((item) => (
//             <tr key={item.Item_Code}>
//               <td>{item.Item_Code}</td>
//               <td>{item.Item_Name}</td>
//               <td>{item.Item_Type}</td>
//               <td>{item.Quantity}</td>
//               <td>{item.Item_Model}</td>
//               <td>{item.Item_Serial}</td>
//               <td>{item.Item_Category}</td>
//               <td>{new Date(item.Reg_Date).toLocaleDateString()}</td>
//               <td>{item.Status}</td>
//               <td className="action-buttons">
//                 <FaEdit
//                   className="edit-icon"
//                   onClick={() =>
//                     navigate(`/Editform/}`, { state: { item } })
//                   }
//                 />
//                 <FaTrash
//                   className="delete-icon"
//                   onClick={() => deleteItem(item.id)}
//                 />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ItemList;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ItemList = ({ refresh }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getItem = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("http://localhost:5000/api/items/getItem");
        setItems(response.data);
      } catch (err) {
        setError(err.response?.data || "Failed to fetch items.");
      } finally {
        setLoading(false);
      }
    };

    getItem();
  }, [refresh]);

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/items/deleteItem/${id}`);
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
      setShowConfirm(false);
    } catch (err) {
      alert("Failed to delete item: " + (err.response?.data || err.message));
    }
  };

  const handleDeleteClick = (id) => {
    setItemToDelete(id);
    setShowConfirm(true);
  };

  const navigateToAddItem = () => {
    navigate("/addItem");
  };

  if (loading) return <div className="text-center text-gray-600 py-12 text-lg font-medium">Loading items...</div>;
  if (error) return <div className="text-center text-red-600 py-12 text-lg font-medium">Error: {error}</div>;

  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-lg shadow-sm">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0">Items List</h2>
        <button
          onClick={navigateToAddItem}
          className="flex items-center bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
        >
          <FaPlus className="mr-2" /> Add Item
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-teal-50 text-teal-800">
            <tr>
              <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wide">ID</th>
              <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wide">Name</th>
              <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wide">Type</th>
              <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wide">Quantity</th>
              <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wide">Model</th>
              <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wide">Serial</th>
              <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wide">Category</th>
              <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wide">Reg. Date</th>
              <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wide">Status</th>
              <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item.Item_Code} className="hover:bg-teal-50 transition-colors duration-200">
                <td className="py-4 px-6 text-sm text-gray-900">{item.Item_Code}</td>
                <td className="py-4 px-6 text-sm text-gray-900">{item.Item_Name}</td>
                <td className="py-4 px-6 text-sm text-gray-900">{item.Item_Type}</td>
                <td className="py-4 px-6 text-sm text-gray-900">{item.Quantity}</td>
                <td className="py-4 px-6 text-sm text-gray-900">{item.Item_Model}</td>
                <td className="py-4 px-6 text-sm text-gray-900">{item.Item_Serial}</td>
                <td className="py-4 px-6 text-sm text-gray-900">{item.Item_Category}</td>
                <td className="py-4 px-6 text-sm text-gray-900">{new Date(item.Reg_Date).toLocaleDateString()}</td>
                <td className="py-4 px-6 text-sm text-gray-900">{item.Status}</td>
                <td className="py-4 px-6 text-sm">
                  <div className="flex space-x-4">
                    <button
                      onClick={() => navigate(`/Editform/${item.id}`, { state: { item } })}
                      className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                      aria-label="Edit Item"
                    >
                      <FaEdit size={20} />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(item.id)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-md hover:shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105"
                      aria-label="Delete Item"
                    >
                      <FaTrash size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Custom Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Confirm Deletion</h3>
            <p className="text-sm text-gray-600 mb-6">Are you sure you want to delete this item? This action cannot be undone.</p>
            <div className="flex space-x-4">
              <button
                onClick={() => deleteItem(itemToDelete)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              >
                Delete
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemList;