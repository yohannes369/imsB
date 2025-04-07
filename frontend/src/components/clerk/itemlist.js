// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// //  // Import CSS for styling

// // const ItemList = ({ refresh }) => {
// //   const [items, setItems] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [selectedItemCode, setSelectedItemCode] = useState(null);

// //   useEffect(() => {
// //     getItem();
// //   }, [refresh]);

// //   const getItem = async () => {
// //     setLoading(true);
// //     try {
// //       const response = await axios.get('http://localhost:5000/api/items/getItem');
// //       setItems(response.data);
// //     } catch (err) {
// //       setError(err.response?.data || err.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const deleteItem = async (Item_Code) => {
// //     try {
// //       await axios.delete(`http://localhost:5000/api/items/deleteItem/${Item_Code}`);
// //       setItems(items.filter(item => item.Item_Code !== Item_Code));
// //     } catch (err) {
// //       console.error('Error deleting item:', err);
// //     }
// //   };

// //   const handleItemClick = (Item_Code) => {
// //     setSelectedItemCode(Item_Code);
// //   };

// //   if (loading) {
// //     return <div className="loading">Loading items...</div>;
// //   }

// //   if (error) {
// //     return <div className="error">Error: {error}</div>;
// //   }

// //   return (
// //     <div className="item-list-container">
// //       <h2>Items List</h2>
// //       {items.length === 0 ? (
// //         <p>No items found</p>
// //       ) : (
// //         <table className="item-table">
// //           <thead>
// //             <tr>
// //               <th>ID</th>
// //               <th>Name</th>
// //               <th>Type</th>
// //               <th>Quantity</th>
// //               <th>Model</th>
// //               <th>Serial</th>
// //               <th>Category</th>
// //               <th>Registration Date</th>
// //               <th>Status</th>
// //               <th>Actions</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {items.map((item) => (
// //               <tr key={item.Item_Code} onClick={() => handleItemClick(item.Item_Code)}>
// //                 <td>{item.Item_Code}</td>
// //                 <td>{item.Item_Name}</td>
// //                 <td>{item.Item_Type}</td>
// //                 <td>{item.Quantity}</td>
// //                 <td>{item.Item_Model}</td>
// //                 <td>{item.Item_Serial}</td>
// //                 <td>{item.Item_Category}</td>
// //                 <td>{new Date(item.Reg_Date).toLocaleDateString()}</td>
// //                 <td>{item.Status}</td>
// //                 <td>
// //                   <button className="delete-btn" onClick={(e) => { e.stopPropagation(); deleteItem(item.Item_Code); }}>Delete</button>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       )}
// //     </div>
// //   );
// // };

// // export default ItemList;

// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import { FaTrash, FaEdit, FaPlus } from "react-icons/fa"; // Import the "Add" icon
// // import { useNavigate } from "react-router-dom";
// // import "./itemlist.css";

// // const ItemList = ({ refresh }) => {
// //   const [items, setItems] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const getItem = async () => {
// //       setLoading(true);
// //       setError(null);
// //       try {
// //         const response = await axios.get("http://localhost:5000/api/items/getItem");
// //         setItems(response.data);
// //       } catch (err) {
// //         setError(err.response?.data || "Failed to fetch items.");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     getItem();
// //   }, [refresh]); // Re-fetch data when the 'refresh' prop changes

// //   const deleteItem = async (id) => {
// //     if (!window.confirm("Are you sure you want to delete this item?")) return;

// //     try {
// //       await axios.delete(`http://localhost:5000/api/items/deleteItem/${id}`);
// //       setItems((prevItems) => prevItems.filter((item) => item.id !== id));
// //     } catch (err) {
// //       alert("Failed to delete item.");
// //     }
// //   };

// //   const navigateToAddItem = () => {
// //     navigate("/addItem"); // Navigate to Add Item page
// //   };

// //   if (loading) return <div>Loading items...</div>;
// //   if (error) return <div>Error: {error}</div>;

// //   return (
// //     <div className="item-list-container">
// //       <h2>Items List</h2>
// //       <div className="add-item-container">
// //         <button className="add-item-button" onClick={navigateToAddItem}>
// //           <FaPlus /> Add Item
// //         </button>
// //       </div>
// //       <table className="item-table">
// //         <thead>
// //           <tr>
// //             <th>ID</th>
// //             <th>Name</th>
// //             <th>Type</th>
// //             <th>Quantity</th>
// //             <th>Model</th>
// //             <th>Serial</th>
// //             <th>Category</th>
// //             <th>Registration Date</th>
// //             <th>Status</th>
// //             <th>Actions</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {items.map((item) => (
// //             <tr key={item.Item_Code}>
// //               <td>{item.Item_Code}</td>
// //               <td>{item.Item_Name}</td>
// //               <td>{item.Item_Type}</td>
// //               <td>{item.Quantity}</td>
// //               <td>{item.Item_Model}</td>
// //               <td>{item.Item_Serial}</td>
// //               <td>{item.Item_Category}</td>
// //               <td>{new Date(item.Reg_Date).toLocaleDateString()}</td>
// //               <td>{item.Status}</td>
// //               <td className="action-buttons">
// //                 <FaEdit
// //                   className="edit-icon"
// //                   onClick={() =>
// //                     navigate(`/Editform/}`, { state: { item } })
// //                   }
// //                 />
// //                 <FaTrash
// //                   className="delete-icon"
// //                   onClick={() => deleteItem(item.id)}
// //                 />
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // };

// // export default ItemList;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// const ItemList = ({ refresh }) => {
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [itemToDelete, setItemToDelete] = useState(null);
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
//   }, [refresh]);

//   const deleteItem = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/items/deleteItem/${id}`);
//       setItems((prevItems) => prevItems.filter((item) => item.id !== id));
//       setShowConfirm(false);
//     } catch (err) {
//       alert("Failed to delete item: " + (err.response?.data || err.message));
//     }
//   };

//   const handleDeleteClick = (id) => {
//     setItemToDelete(id);
//     setShowConfirm(true);
//   };

//   const navigateToAddItem = () => {
//     navigate("/addItem");
//   };

//   if (loading) return <div className="text-center text-gray-600 py-12 text-lg font-medium">Loading items...</div>;
//   if (error) return <div className="text-center text-red-600 py-12 text-lg font-medium">Error: {error}</div>;

//   return (
//     <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
//       <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-lg shadow-sm">
//         <h2 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0">Items List</h2>
//         <button
//           onClick={navigateToAddItem}
//           className="flex items-center bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
//         >
//           <FaPlus className="mr-2" /> Add Item
//         </button>
//       </div>

//       <div className="overflow-x-auto rounded-lg shadow-md">
//         <table className="min-w-full bg-white border border-gray-200">
//           <thead className="bg-teal-50 text-teal-800">
//             <tr>
//               <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wide">ID</th>
//               <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wide">Name</th>
//               <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wide">Type</th>
//               <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wide">Quantity</th>
//               <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wide">Model</th>
//               <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wide">Serial</th>
//               <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wide">Category</th>
//               <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wide">Reg. Date</th>
//               <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wide">Status</th>
//               <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wide">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {items.map((item) => (
//               <tr key={item.Item_Code} className="hover:bg-teal-50 transition-colors duration-200">
//                 <td className="py-4 px-6 text-sm text-gray-900">{item.Item_Code}</td>
//                 <td className="py-4 px-6 text-sm text-gray-900">{item.Item_Name}</td>
//                 <td className="py-4 px-6 text-sm text-gray-900">{item.Item_Type}</td>
//                 <td className="py-4 px-6 text-sm text-gray-900">{item.Quantity}</td>
//                 <td className="py-4 px-6 text-sm text-gray-900">{item.Item_Model}</td>
//                 <td className="py-4 px-6 text-sm text-gray-900">{item.Item_Serial}</td>
//                 <td className="py-4 px-6 text-sm text-gray-900">{item.Item_Category}</td>
//                 <td className="py-4 px-6 text-sm text-gray-900">{new Date(item.Reg_Date).toLocaleDateString()}</td>
//                 <td className="py-4 px-6 text-sm text-gray-900">{item.Status}</td>
//                 <td className="py-4 px-6 text-sm">
//                   <div className="flex space-x-4">
//                     <button
//                       onClick={() => navigate(`/Editform/${item.id}`, { state: { item } })}
//                       className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
//                       aria-label="Edit Item"
//                     >
//                       <FaEdit size={20} />
//                     </button>
//                     <button
//                       onClick={() => handleDeleteClick(item.id)}
//                       className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-md hover:shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105"
//                       aria-label="Delete Item"
//                     >
//                       <FaTrash size={16} />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Custom Confirmation Modal */}
//       {showConfirm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">Confirm Deletion</h3>
//             <p className="text-sm text-gray-600 mb-6">Are you sure you want to delete this item? This action cannot be undone.</p>
//             <div className="flex space-x-4">
//               <button
//                 onClick={() => deleteItem(itemToDelete)}
//                 className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
//               >
//                 Delete
//               </button>
//               <button
//                 onClick={() => setShowConfirm(false)}
//                 className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ItemList;




// corect one 

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// const ItemList = ({ refresh }) => {
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [itemToDelete, setItemToDelete] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchItems = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await axios.get("http://localhost:5000/api/items/items/");
//         setItems(response.data);
//       } catch (err) {
//         setError(err.response?.data?.error || "Failed to fetch items.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchItems();
//   }, [refresh]);

//   const deleteItem = async (item_id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/items/items/${item_id}`);
//       setItems((prevItems) => prevItems.filter((item) => item.item_id !== item_id));
//       setShowConfirm(false);
//     } catch (err) {
//       alert("Failed to delete item: " + (err.response?.data?.error || err.message));
//     }
//   };

//   const handleDeleteClick = (item_id) => {
//     setItemToDelete(item_id);
//     setShowConfirm(true);
//   };

//   const navigateToAddItem = () => {
//     navigate("/addItem");
//   };

//   if (loading) return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-400 to-pink-500">
//       <div className="text-center text-white py-12 text-3xl font-extrabold animate-spin-and-bounce">
//         <span className="inline-block animate-spin">🌟</span> Loading Items...
//       </div>
//     </div>
//   );

//   if (error) return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-400 to-orange-500">
//       <div className="text-center text-white py-12 text-2xl font-bold bg-red-700 bg-opacity-80 rounded-xl px-8 animate-wobble">
//         Error: {error}
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-tr from-purple-100 via-teal-100 to-blue-100 p-6 animate-bg-shift">
//       <div className="max-w-6xl mx-auto">
//         {/* Header Section */}
//         <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-6 rounded-2xl shadow-2xl mb-8 transform hover:scale-[1.03] transition-all duration-500 animate-float">
//           <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-teal-500 to-blue-600 mb-4 sm:mb-0 animate-text-glow">
//             Items List
//           </h2>
//           <button
//             onClick={navigateToAddItem}
//             className="group flex items-center bg-gradient-to-r from-purple-600 via-teal-500 to-blue-600 hover:from-purple-700 hover:via-teal-600 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 animate-pulse-slow"
//           >
//             <FaPlus className="mr-2 group-hover:animate-spin-and-grow transition-all duration-300" />
//             Add Item
//           </button>
//         </div>

//         {/* No Data Message */}
//         {items.length === 0 ? (
//           <div className="text-center text-gray-700 bg-white p-12 rounded-2xl shadow-xl animate-bounce-in">
//             <p className="text-2xl font-bold animate-text-pulse">No items available 😢</p>
//           </div>
//         ) : (
//           /* Table Section */
//           <div className="overflow-x-auto rounded-2xl shadow-2xl bg-white border border-purple-200 animate-fade-in-up">
//             <table className="min-w-full">
//               <thead className="bg-gradient-to-r from-purple-100 via-teal-100 to-blue-100 text-purple-900">
//                 <tr>
//                   {["ID", "Code", "Name", "Type", "Quantity", "Model", "Serial", "Category", "Reg. Date", "Status", "Actions"].map(
//                     (header) => (
//                       <th
//                         key={header}
//                         className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-widest animate-header-glow"
//                       >
//                         {header}
//                       </th>
//                     )
//                   )}
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-300">
//                 {items.map((item) => (
//                   <tr
//                     key={item.item_id}
//                     className="group hover:bg-gradient-to-r hover:from-purple-50 hover:via-teal-50 hover:to-blue-50 transition-all duration-300 transform hover:scale-[1.02] animate-row-slide"
//                   >
//                     <td className="py-4 px-6 text-sm text-gray-900 animate-cell-pop">{item.item_id}</td>
//                     <td className="py-4 px-6 text-sm text-gray-900 animate-cell-pop">{item.item_code}</td>
//                     <td className="py-4 px-6 text-sm text-gray-900 animate-cell-pop">{item.item_name}</td>
//                     <td className="py-4 px-6 text-sm text-gray-900 animate-cell-pop">{item.item_type}</td>
//                     <td className="py-4 px-6 text-sm text-gray-900 animate-cell-pop">{item.quantity}</td>
//                     <td className="py-4 px-6 text-sm text-gray-900 animate-cell-pop">{item.item_model || '-'}</td>
//                     <td className="py-4 px-6 text-sm text-gray-900 animate-cell-pop">{item.item_serial || '-'}</td>
//                     <td className="py-4 px-6 text-sm text-gray-900 animate-cell-pop">{item.item_category || '-'}</td>
//                     <td className="py-4 px-6 text-sm text-gray-900 animate-cell-pop">
//                       {new Date(item.reg_date).toLocaleDateString()}
//                     </td>
//                     <td className="py-4 px-6 text-sm text-gray-900 animate-cell-pop">{item.status}</td>
//                     <td className="py-4 px-6 text-sm">
//                       <div className="flex space-x-4">
//                         <button
//                           onClick={() => navigate(`/Editform/${item.item_id}`, { state: { item } })}
//                           className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-full shadow-md transition-all duration-300 transform hover:scale-125 hover:rotate-45 animate-wiggle"
//                           aria-label="Edit Item"
//                         >
//                           <FaEdit size={20} />
//                         </button>
//                         <button
//                           onClick={() => handleDeleteClick(item.item_id)}
//                           className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-125 hover:-rotate-45 animate-bounce-slow"
//                           aria-label="Delete Item"
//                         >
//                           <FaTrash size={18} />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* Confirmation Modal */}
//         {showConfirm && (
//           <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-zoom-in">
//             <div className="bg-gradient-to-br from-white to-gray-100 rounded-2xl shadow-3xl p-8 max-w-md w-full transform transition-all duration-500 animate-modal-explode">
//               <h3 className="text-2xl font-bold text-purple-700 mb-4 animate-text-flip">
//                 Confirm Deletion
//               </h3>
//               <p className="text-sm text-gray-700 mb-6 animate-text-pulse">
//                 Are you sure you want to delete this item? This action cannot be undone!
//               </p>
//               <div className="flex space-x-4">
//                 <button
//                   onClick={() => deleteItem(itemToDelete)}
//                   className="flex-1 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 animate-pulse-fast"
//                 >
//                   Delete
//                 </button>
//                 <button
//                   onClick={() => setShowConfirm(false)}
//                   className="flex-1 bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ItemList;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FaTrash, FaEdit, FaPlus, FaChartLine } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// const ItemList = ({ refresh }) => {
//   const [items, setItems] = useState([]);
//   const [lowStockItems, setLowStockItems] = useState([]);
//   const [forecast, setForecast] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [itemToDelete, setItemToDelete] = useState(null);
//   const navigate = useNavigate();

//   // Fetch all items and low-stock items on component mount
//   useEffect(() => {
//     const fetchItems = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await axios.get("http://localhost:5000/api/items/items");
//         setItems(response.data);
//       } catch (err) {
//         setError(err.response?.data?.error || "Failed to fetch items.");
//       } finally {
//         setLoading(false);
//       }
//     };


//     const fetchLowStockItems = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/items/low-stock");
//         setLowStockItems(response.data.items || []);
//       } catch (err) {
//         console.error("Error fetching low stock items:", err);
//       }
//     };

//     fetchItems();
//     fetchLowStockItems();
//   }, [refresh]);

//   // Delete an item
//   const deleteItem = async (item_id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/items/items/${item_id}`);
//       setItems((prevItems) => prevItems.filter((item) => item.item_id !== item_id));
//       setShowConfirm(false);
//     } catch (err) {
//       alert("Failed to delete item: " + (err.response?.data?.error || err.message));
//     }
//   };

//   // Handle delete confirmation
//   const handleDeleteClick = (item_id) => {
//     setItemToDelete(item_id);
//     setShowConfirm(true);
//   };

//   // Navigate to Add Item page
//   const navigateToAddItem = () => {
//     navigate("/addItem");
//   };

//   // Fetch forecast for an item
//   const handleForecast = async (item_id) => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/items/items/forecast/${item_id}`);
//       setForecast(response.data);
//     } catch (err) {
//       console.error("Error fetching forecast:", err);
//       alert("Failed to fetch forecast: " + (err.response?.data?.error || err.message));
//     }
//   };

//   if (loading)
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-400 to-pink-500">
//         <div className="text-center text-white py-12 text-3xl font-extrabold animate-spin-and-bounce">
//           <span className="inline-block animate-spin">🌟</span> Loading Items...
//         </div>
//       </div>
//     );

//   if (error)
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-400 to-orange-500">
//         <div className="text-center text-white py-12 text-2xl font-bold bg-red-700 bg-opacity-80 rounded-xl px-8 animate-wobble">
//           Error: {error}
//         </div>
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-gradient-to-tr from-purple-100 via-teal-100 to-blue-100 p-6 animate-bg-shift">
//       <div className="max-w-6xl mx-auto">
//         {/* Header Section */}
//         <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-6 rounded-2xl shadow-2xl mb-8 transform hover:scale-[1.03] transition-all duration-500 animate-float">
//           <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-teal-500 to-blue-600 mb-4 sm:mb-0 animate-text-glow">
//             Items List
//           </h2>
//           <button
//             onClick={navigateToAddItem}
//             className="group flex items-center bg-gradient-to-r from-purple-600 via-teal-500 to-blue-600 hover:from-purple-700 hover:via-teal-600 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 animate-pulse-slow"
//           >
//             <FaPlus className="mr-2 group-hover:animate-spin-and-grow transition-all duration-300" />
//             Add Item
//           </button>
//         </div>

//         {/* Low Stock Items */}
//         <div className="mb-8">
//           <h3 className="text-2xl font-bold text-gray-800 mb-4">Low Stock Items</h3>
//           {lowStockItems.length === 0 ? (
//             <p className="text-gray-600">No low stock items.</p>
//           ) : (
//             <ul className="list-disc pl-6">
//               {lowStockItems.map((item) => (
//                 <li key={item.item_id} className="text-gray-800">
//                   {item.item_name} (Quantity: {item.quantity})
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         {/* Items Table */}
//         {items.length === 0 ? (
//           <div className="text-center text-gray-700 bg-white p-12 rounded-2xl shadow-xl animate-bounce-in">
//             <p className="text-2xl font-bold animate-text-pulse">No items available 😢</p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto rounded-2xl shadow-2xl bg-white border border-purple-200 animate-fade-in-up">
//             <table className="min-w-full">
//               <thead className="bg-gradient-to-r from-purple-100 via-teal-100 to-blue-100 text-purple-900">
//                 <tr>
//                   {[
//                     "ID",
//                     "Code",
//                     "Name",
//                     "Type",
//                     "Quantity",
//                     "Model",
//                     "Serial",
//                     "Category",
//                     "Reg. Date",
//                     "Status",
//                     "Actions",
//                   ].map((header) => (
//                     <th
//                       key={header}
//                       className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-widest animate-header-glow"
//                     >
//                       {header}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-300">
//                 {items.map((item) => (
//                   <tr
//                     key={item.item_id}
//                     className="group hover:bg-gradient-to-r hover:from-purple-50 hover:via-teal-50 hover:to-blue-50 transition-all duration-300 transform hover:scale-[1.02] animate-row-slide"
//                   >
//                     <td className="py-4 px-6 text-sm text-gray-900 animate-cell-pop">{item.item_id}</td>
//                     <td className="py-4 px-6 text-sm text-gray-900 animate-cell-pop">{item.item_code}</td>
//                     <td className="py-4 px-6 text-sm text-gray-900 animate-cell-pop">{item.item_name}</td>
//                     <td className="py-4 px-6 text-sm text-gray-900 animate-cell-pop">{item.item_type}</td>
//                     <td className="py-4 px-6 text-sm text-gray-900 animate-cell-pop">{item.quantity}</td>
//                     <td className="py-4 px-6 text-sm text-gray-900 animate-cell-pop">{item.item_model || "-"}</td>
//                     <td className="py-4 px-6 text-sm text-gray-900 animate-cell-pop">{item.item_serial || "-"}</td>
//                     <td className="py-4 px-6 text-sm text-gray-900 animate-cell-pop">{item.item_category || "-"}</td>
//                     <td className="py-4 px-6 text-sm text-gray-900 animate-cell-pop">
//                       {new Date(item.reg_date).toLocaleDateString()}
//                     </td>
//                     <td className="py-4 px-6 text-sm text-gray-900 animate-cell-pop">{item.status}</td>
//                     <td className="py-4 px-6 text-sm">
//                       <div className="flex space-x-4">
//                         <button
//                           onClick={() => navigate(`/Editform/${item.item_id}`, { state: { item } })}
//                           className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-full shadow-md transition-all duration-300 transform hover:scale-125 hover:rotate-45 animate-wiggle"
//                           aria-label="Edit Item"
//                         >
//                           <FaEdit size={20} />
//                         </button>
//                         <button
//                           onClick={() => handleDeleteClick(item.item_id)}
//                           className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-125 hover:-rotate-45 animate-bounce-slow"
//                           aria-label="Delete Item"
//                         >
//                           <FaTrash size={18} />
//                         </button>
//                         <button
//                           onClick={() => handleForecast(item.item_id)}
//                           className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-125 animate-pulse-fast"
//                           aria-label="Forecast Demand"
//                         >
//                           <FaChartLine size={18} />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* Forecast Result */}
//         {forecast && (
//           <div className="mt-6 bg-white p-6 rounded-2xl shadow-xl">
//             <h3 className="text-xl font-bold text-gray-800 mb-4">Forecast Result</h3>
//             <p className="text-gray-700">
//               Predicted Demand for Item <strong>{forecast.item_id}</strong>:{" "}
//               <span className="font-bold">{forecast.predictedDemand}</span>
//             </p>
//           </div>
//         )}

//         {/* Confirmation Modal */}
//         {showConfirm && (
//           <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-zoom-in">
//             <div className="bg-gradient-to-br from-white to-gray-100 rounded-2xl shadow-3xl p-8 max-w-md w-full transform transition-all duration-500 animate-modal-explode">
//               <h3 className="text-2xl font-bold text-purple-700 mb-4 animate-text-flip">
//                 Confirm Deletion
//               </h3>
//               <p className="text-sm text-gray-700 mb-6 animate-text-pulse">
//                 Are you sure you want to delete this item? This action cannot be undone!
//               </p>
//               <div className="flex space-x-4">
//                 <button
//                   onClick={() => deleteItem(itemToDelete)}
//                   className="flex-1 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 animate-pulse-fast"
//                 >
//                   Delete
//                 </button>
//                 <button
//                   onClick={() => setShowConfirm(false)}
//                   className="flex-1 bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ItemList;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash, FaEdit, FaPlus, FaChartLine } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ItemList = ({ refresh }) => {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const ITEMS_PER_PAGE = 6;

  // Fetch all items on component mount
  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("http://localhost:5000/api/items/items");
        setItems(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch items.");
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [refresh]);

  // Pagination logic
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const handleCheckboxChange = (item_id) => {
    if (selectedItems.includes(item_id)) {
      setSelectedItems(selectedItems.filter((id) => id !== item_id));
    } else {
      setSelectedItems([...selectedItems, item_id]);
    }
  };

  const deleteSelectedItems = async () => {
    try {
      await Promise.all(
        selectedItems.map((item_id) =>
          axios.delete(`http://localhost:5000/api/items/items/${item_id}`)
        )
      );
      setItems((prevItems) =>
        prevItems.filter((item) => !selectedItems.includes(item.item_id))
      );
      setSelectedItems([]);
      setShowConfirm(false);
    } catch (err) {
      alert("Failed to delete items: " + (err.response?.data?.error || err.message));
    }
  };

  const navigateToAddItem = () => {
    navigate("/addItem");
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-400 to-pink-500">
        <div className="text-center text-white py-12 text-3xl font-extrabold animate-spin-and-bounce">
          <span className="inline-block animate-spin">🌟</span> Loading Items...
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-400 to-orange-500">
        <div className="text-center text-white py-12 text-2xl font-bold bg-red-700 bg-opacity-80 rounded-xl px-8 animate-wobble">
          Error: {error}
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-100 via-teal-100 to-blue-100 p-6 animate-bg-shift">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-6 rounded-2xl shadow-2xl mb-8 transform hover:scale-[1.03] transition-all duration-500 animate-float">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-teal-500 to-blue-600 mb-4 sm:mb-0 animate-text-glow">
            Items List
          </h2>
          <div className="flex space-x-4">
            <button
              onClick={navigateToAddItem}
              className="group flex items-center bg-gradient-to-r from-purple-600 via-teal-500 to-blue-600 hover:from-purple-700 hover:via-teal-600 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 animate-pulse-slow"
            >
              <FaPlus className="mr-2 group-hover:animate-spin-and-grow transition-all duration-300" />
              Add Item
            </button>
            <button
              onClick={() => setShowConfirm(true)}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110"
              disabled={selectedItems.length === 0}
            >
              Delete Selected
            </button>
          </div>
        </div>

        {/* Items Table */}
        {items.length === 0 ? (
          <div className="text-center text-gray-700 bg-white p-12 rounded-2xl shadow-xl animate-bounce-in">
            <p className="text-2xl font-bold animate-text-pulse">No items available 😢</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl shadow-2xl bg-white border border-purple-200 animate-fade-in-up">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-purple-100 via-teal-100 to-blue-100 text-purple-900">
                <tr>
                  <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-widest animate-header-glow">
                    <input
                      type="checkbox"
                      checked={selectedItems.length === items.length && items.length > 0}
                      onChange={(e) =>
                        setSelectedItems(
                          e.target.checked ? items.map((item) => item.item_id) : []
                        )
                      }
                    />
                  </th>
                  {[
                    "ID",
                    "Code",
                    "Name",
                    "Type",
                    "Quantity",
                    "Model",
                    "Serial",
                    "Category",
                    "Reg. Date",
                    "Status",
                    "Actions",
                  ].map((header) => (
                    <th
                      key={header}
                      className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-widest animate-header-glow"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {currentItems.map((item) => (
                  <tr
                    key={item.item_id}
                    className="group hover:bg-gradient-to-r hover:from-purple-50 hover:via-teal-50 hover:to-blue-50 transition-all duration-300 transform hover:scale-[1.02] animate-row-slide"
                  >
                    <td className="py-4 px-6 text-sm text-gray-900 animate-cell-pop">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.item_id)}
                        onChange={() => handleCheckboxChange(item.item_id)}
                      />
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-900 animate-cell-pop">{item.item_id}</td>
                    <td className="py-4 px-6 text-sm text-gray-900 animate-cell-pop">{item.item_code}</td>
                    <td className="py-4 px-6 text-sm text-gray-900 animate-cell-pop">{item.item_name}</td>
                    <td className="py-4 px-6 text-sm text-gray-900 animate-cell-pop">{item.item_type}</td>
                    <td className="py-4 px-6 text-sm text-gray-900 animate-cell-pop">{item.quantity}</td>
                    <td className="py-4 px-6 text-sm text-gray-900 animate-cell-pop">{item.item_model || "-"}</td>
                    <td className="py-4 px-6 text-sm text-gray-900 animate-cell-pop">{item.item_serial || "-"}</td>
                    <td className="py-4 px-6 text-sm text-gray-900 animate-cell-pop">{item.item_category || "-"}</td>
                    <td className="py-4 px-6 text-sm text-gray-900 animate-cell-pop">
                      {new Date(item.reg_date).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-900 animate-cell-pop">{item.status}</td>
                    <td className="py-4 px-6 text-sm">
                      <div className="flex space-x-4">
                        <button
                          onClick={() => navigate(`/Editform/${item.item_id}`, { state: { item } })}
                          className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-full shadow-md transition-all duration-300 transform hover:scale-125 hover:rotate-45 animate-wiggle"
                          aria-label="Edit Item"
                        >
                          <FaEdit size={20} />
                        </button>
                        <button
                          onClick={() => handleCheckboxChange(item.item_id)}
                          className={`p-2 ${
                            selectedItems.includes(item.item_id)
                              ? "bg-red-600"
                              : "bg-gray-600"
                          } hover:bg-red-700 text-white rounded-full shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-125`}
                          aria-label="Delete Item"
                        >
                          <FaTrash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-purple-600 text-white rounded-l-lg hover:bg-purple-700 transition-all duration-300"
          >
            Previous
          </button>
          <span className="px-4 py-2 bg-purple-200 text-purple-800">
            Page {currentPage}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(prev + 1, Math.ceil(items.length / ITEMS_PER_PAGE))
              )
            }
            disabled={indexOfLastItem >= items.length}
            className="px-4 py-2 bg-purple-600 text-white rounded-r-lg hover:bg-purple-700 transition-all duration-300"
          >
            Next
          </button>
        </div>

        {/* Confirmation Modal */}
        {showConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-zoom-in">
            <div className="bg-gradient-to-br from-white to-gray-100 rounded-2xl shadow-3xl p-8 max-w-md w-full transform transition-all duration-500 animate-modal-explode">
              <h3 className="text-2xl font-bold text-purple-700 mb-4 animate-text-flip">
                Confirm Deletion
              </h3>
              <p className="text-sm text-gray-700 mb-6 animate-text-pulse">
                Are you sure you want to delete the selected items? This action cannot be undone!
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={deleteSelectedItems}
                  className="flex-1 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 animate-pulse-fast"
                >
                  Delete
                </button>
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemList;