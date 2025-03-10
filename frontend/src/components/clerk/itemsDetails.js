// import React, { useState, useEffect } from 'react';

//   const [item, setItem] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchItemDetails = async () => {
//       try {
//           method: 'GET',
//         if (!response.ok) {
//         }

//         const data = await response.json();
//         console.log('Fetched item details:', data); // Log the fetched data
//         setItem(data);
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching item details:', err);
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchItemDetails();
//   }, [Item_Code]);

//   if (loading) {
//     return <div className="loading">Loading item details...</div>;
//   }

//   if (error) {
//     return <div className="error">Error: {error}</div>;
//   }

//   return (
//     <div className="item-details-container">
//       <h2>Item Details</h2>
//       {item ? (
//         <div>
//           <p><strong>ID:</strong> {item.Item_Code}</p>
//           <p><strong>Name:</strong> {item.Item_Name}</p>
//           <p><strong>Type:</strong> {item.Item_Type}</p>
//           <p><strong>Quantity:</strong> {item.Quantity}</p>
//           <p><strong>Model:</strong> {item.Item_Model}</p>
//           <p><strong>Serial:</strong> {item.Item_Serial}</p>
//           <p><strong>Category:</strong> {item.Item_Category}</p>
//           <p><strong>Registration Date:</strong> {item.Reg_Date}</p>
//           <p><strong>Status:</strong> {item.Status}</p>
//         </div>
//       ) : (
//         <p>No item details found</p>
//       )}
//     </div>
//   );
// };

// export default ItemDetails;