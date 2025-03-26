// import React, { useState } from 'react';
// import axios from 'axios';

// const RequestForm = ({ employeeId }) => {
//   const [itemId, setItemId] = useState('');
//   const [quantity, setQuantity] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:5000/api/requests', {
//         employee_id: employeeId,
//         item_id: itemId,
//         quantity,
//       });
//       alert('Request created successfully!');
//       setItemId('');
//       setQuantity('');
//     } catch (error) {
//       console.error('Error creating request:', error);
//       alert('Failed to create request');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg shadow-md">
//       <h2 className="text-xl font-bold mb-4">Create Request</h2>
//       <div className="mb-4">
//         <label className="block text-gray-700">Item ID</label>
//         <input
//           type="text"
//           value={itemId}
//           onChange={(e) => setItemId(e.target.value)}
//           className="border p-2 w-full rounded"
//           required
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-gray-700">Quantity</label>
//         <input
//           type="number"
//           value={quantity}
//           onChange={(e) => setQuantity(e.target.value)}
//           className="border p-2 w-full rounded"
//           required
//         />
//       </div>
//       <button type="submit" className="bg-blue-500 text-white p-2 rounded">
//         Submit
//       </button>
//     </form>
//   );
// };

// export default RequestForm;