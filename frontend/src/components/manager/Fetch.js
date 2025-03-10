// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
// import { Link } from 'react-router-dom';

// const styles = {
//   container: {
//     maxWidth: '1000px',
//     margin: '2rem auto',
//     padding: '2rem',
//     backgroundColor: '#f9fafb',
//     borderRadius: '8px',
//     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//   },
//   heading: {
//     fontSize: '2rem',
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: '1.5rem',
//     textAlign: 'center',
//   },
//   button: {
//     padding: '0.5rem 1rem',
//     color: '#fff',
//     border: 'none',
//     borderRadius: '5px',
//     cursor: 'pointer',
//     marginRight: '0.5rem',
//   },
//   addButton: {
//     backgroundColor: '#3498db',
//     display: 'flex',
//     alignItems: 'center',
//     gap: '0.5rem',
//   },
//   editButton: { backgroundColor: '#f39c12' },
//   deleteButton: { backgroundColor: '#e74c3c' },
// };

// const ItemManagement = () => {
//   const [items, setItems] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // Fetching items from the API show eroor on cosole.log
//   useEffect(() => {

 

//   // Deleting an item from the database
//   const deleteItem = async (itemCode) => {
//     if (!itemCode) return alert('Item Code is required');

//     try {
//       setLoading(true);
//       const token = localStorage.getItem('token');
//       if (!token) return alert('Please log in');

//       // Call the delete API
//       await axios.delete(`http://localhost:5000/api/items/deleteItem/${itemCode}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       // Remove the deleted item from the state
//       setItems((prevItems) => prevItems.filter((item) => item.item_code !== itemCode));
//       setLoading(false);
//     } catch (error) {
//       console.error('Error deleting item:', error);
//       setError('Error deleting item');
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.heading}>Item Management</h1>
//       <Link to="/add-item">
//         <button style={{ ...styles.button, ...styles.addButton }}>
//           <FaPlus /> Add Item
//         </button>
//       </Link>

//       {loading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p>{error}</p>
//       ) : items.length === 0 ? (
//         <p>No items available</p>
//       ) : (
//         <table>
//           <thead>
//             <tr>
//               <th>Item Name</th>
//               <th>Item Code</th>
//               <th>Item Type</th>
//               <th>Quantity</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {items.map((item) => (
//               <tr key={item.item_code}>
//                 <td>{item.item_name}</td>
//                 <td>{item.item_code}</td>
//                 <td>{item.item_type}</td>
//                 <td>{item.quantity}</td>
//                 <td>{item.status}</td>
//                 <td>
//                   {/* Link to the edit page */}
//                   <Link
//                     to={{
//                       pathname: `/edit-item/${item.item_code}`,
//                     }}
//                   >
//                     <button style={{ ...styles.button, ...styles.editButton }}>
//                       <FaEdit /> Edit
//                     </button>
//                   </Link>

//                   {/* Delete button */}
//                   <button
//                     style={{ ...styles.button, ...styles.deleteButton }}
//                     onClick={() => deleteItem(item.item_code)}
//                     disabled={loading}
//                   >
//                     <FaTrash /> Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default ItemManagement;
