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

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa"; // Import the "Add" icon
import { useNavigate } from "react-router-dom";
import "./itemlist.css";

const ItemList = ({ refresh }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
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

    fetchItems();
  }, [refresh]); // Re-fetch data when the 'refresh' prop changes

  const deleteItem = async (Item_Code) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/items/deleteItem/${Item_Code}`);
      setItems((prevItems) => prevItems.filter((item) => item.Item_Code !== Item_Code));
    } catch (err) {
      alert("Failed to delete item.");
    }
  };

  const navigateToAddItem = () => {
    navigate("/addItem"); // Navigate to Add Item page
  };

  if (loading) return <div>Loading items...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="item-list-container">
      <h2>Items List</h2>
      <div className="add-item-container">
        <button className="add-item-button" onClick={navigateToAddItem}>
          <FaPlus /> Add Item
        </button>
      </div>
      <table className="item-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Quantity</th>
            <th>Model</th>
            <th>Serial</th>
            <th>Category</th>
            <th>Registration Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.Item_Code}>
              <td>{item.Item_Code}</td>
              <td>{item.Item_Name}</td>
              <td>{item.Item_Type}</td>
              <td>{item.Quantity}</td>
              <td>{item.Item_Model}</td>
              <td>{item.Item_Serial}</td>
              <td>{item.Item_Category}</td>
              <td>{new Date(item.Reg_Date).toLocaleDateString()}</td>
              <td>{item.Status}</td>
              <td className="action-buttons">
                <FaEdit
                  className="edit-icon"
                  onClick={() =>
                    navigate(`/Editform/${item.Item_Code}`, { state: { item } })
                  }
                />
                <FaTrash
                  className="delete-icon"
                  onClick={() => deleteItem(item.Item_Code)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemList;

