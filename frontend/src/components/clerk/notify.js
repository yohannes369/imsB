// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Clerkdashboard = () => {
//   const [items, setItems] = useState([]); // State to store the list of items
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   // Fetch items from the backend
//   useEffect(() => {
//     const fetchItems = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/items/items"); // Adjust the URL as needed
//         setItems(response.data); // Set the fetched items in state
//       } catch (err) {
//         console.error("Error fetching items:", err);
//         setError("Failed to fetch items.");
//       }
//     };

//     fetchItems();
//   }, []); // Empty dependency array ensures this runs only once

//   // Navigate to the Add Item page
//   const handleAddItem = () => {
//     navigate("/add-item");
//   };

//   // Filter items with quantity less than 5
//   const lowStockItems = items.filter((item) => item.quantity < 5);

//   return (
//     <div className="min-h-screen bg-gray-100 text-black p-4">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-2xl font-bold text-teal-600 mb-4">Clerk Dashboard</h1>

//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
//             {error}
//           </div>
//         )}

//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold">Items List</h2>
//           <button
//             onClick={handleAddItem}
//             className="bg-teal-600 hover:bg-teal-700 text-white rounded-lg py-2 px-4 font-semibold"
//           >
//             Add New Item
//           </button>
//         </div>

//         {/* Low Stock Notification */}
//         {lowStockItems.length > 0 && (
//           <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-2 rounded mb-4">
//             <strong>Low Stock Alert:</strong> The following items have a quantity less than 5:
//             <ul className="list-disc pl-5">
//               {lowStockItems.map((item) => (
//                 <li key={item.item_id}>
//                   {item.item_name} (Quantity: {item.quantity})
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}

//         {/* Items Table */}
//         {items.length > 0 ? (
//           <table className="w-full border-collapse border border-gray-300">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="border border-gray-300 px-4 py-2">Item ID</th>
//                 <th className="border border-gray-300 px-4 py-2">Item Name</th>
//                 <th className="border border-gray-300 px-4 py-2">Quantity</th>
//                 <th className="border border-gray-300 px-4 py-2">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {items.map((item) => (
//                 <tr key={item.item_id} className="hover:bg-gray-100">
//                   <td className="border border-gray-300 px-4 py-2">{item.item_id}</td>
//                   <td className="border border-gray-300 px-4 py-2">{item.item_name}</td>
//                   <td className="border border-gray-300 px-4 py-2">{item.quantity}</td>
//                   <td className="border border-gray-300 px-4 py-2">{item.status}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <p className="text-gray-600">No items found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Clerkdashboard;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import Barcode from "react-barcode";

// const Clerkdashboard = () => {
//   const [items, setItems] = useState([]); // State to store items
//   const [error, setError] = useState(null); // State to store errors
//   const navigate = useNavigate();

//   // Fetch items from the backend
//   useEffect(() => {
//     const fetchItems = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/items/items"); // Adjust the API URL as needed
//         setItems(response.data);
//       } catch (err) {
//         console.error("Error fetching items:", err);
//         setError("Failed to fetch items.");
//       }
//     };

//     fetchItems();
//   }, []);

//   // Navigate to the Add Item page
//   const handleAddItem = () => {
//     navigate("/add-item");
//   };

//   // Function to print the barcode
//   const handlePrintBarcode = (item) => {
//     const printWindow = window.open("", "_blank");

//     // Write the HTML content for the print window
//     printWindow.document.write(`
//       <html>
//         <head>
//           <title>Print Barcode</title>
//           <style>
//             body {
//               display: flex;
//               justify-content: center;
//               align-items: center;
//               height: 100vh;
//               margin: 0;
//             }
//             svg {
//               width: 150px; /* Compact width */
//               height: auto; /* Auto height */
//             }
//           </style>
//         </head>
//         <body>
//           <svg id="barcode"></svg>
//           <script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js"></script>
//           <script>
//             // Wait for the JsBarcode script to load and then generate the barcode
//             document.addEventListener("DOMContentLoaded", function () {
//               JsBarcode("#barcode", "${item.item_id}", {
//                 format: "CODE128", // Barcode format
//                 width: 1, // Compact width
//                 height: 50, // Compact height
//                 displayValue: false // Hide text below the barcode
//               });

//               // Add a small delay to ensure the barcode is rendered before printing
//               setTimeout(() => {
//                 window.print();
//               }, 500); // 500ms delay
//             });
//           </script>
//         </body>
//       </html>
//     `);

//     printWindow.document.close(); // Close the document to ensure rendering
//   };

//   // Filter items with low stock
//   const lowStockItems = items.filter((item) => item.quantity < 5);

//   return (
//     <div className="min-h-screen bg-gray-100 text-black p-4">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-2xl font-bold text-teal-600 mb-4">Clerk Dashboard</h1>

//         {/* Error Notification */}
//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
//             {error}
//           </div>
//         )}

//         {/* Low Stock Notification */}
//         {lowStockItems.length > 0 && (
//           <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-2 rounded mb-4">
//             <strong>Low Stock Alert:</strong> The following items have a quantity less than 5:
//             <ul className="list-disc pl-5">
//               {lowStockItems.map((item) => (
//                 <li key={item.item_id}>
//                   {item.item_name} (Quantity: {item.quantity})
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}

//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold">Items List</h2>
//           <button
//             onClick={handleAddItem}
//             className="bg-teal-600 hover:bg-teal-700 text-white rounded-lg py-2 px-4 font-semibold"
//           >
//             Add New Item
//           </button>
//         </div>

//         {/* Items Table */}
//         {items.length > 0 ? (
//           <table className="w-full border-collapse border border-gray-300">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="border border-gray-300 px-4 py-2">Item ID</th>
//                 <th className="border border-gray-300 px-4 py-2">Item Name</th>
//                 <th className="border border-gray-300 px-4 py-2">Quantity</th>
//                 <th className="border border-gray-300 px-4 py-2">Barcode</th>
//                 <th className="border border-gray-300 px-4 py-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {items.map((item) => (
//                 <tr key={item.item_id} className="hover:bg-gray-100">
//                   <td className="border border-gray-300 px-4 py-2">{item.item_id}</td>
//                   <td className="border border-gray-300 px-4 py-2">{item.item_name}</td>
//                   <td className="border border-gray-300 px-4 py-2">{item.quantity}</td>
//                   <td className="border border-gray-300 px-4 py-2">
//                     <Barcode
//                       value={item.item_id} // Use only the item_id for the barcode
//                       width={1} // Compact width
//                       height={50} // Compact height
//                       fontSize={12}
//                       displayValue={false} // Hide text below the barcode
//                     />
//                   </td>
//                   <td className="border border-gray-300 px-4 py-2">
//                     <button
//                       onClick={() => handlePrintBarcode(item)}
//                       className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-1 px-3 font-semibold"
//                     >
//                       Print Barcode
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <p className="text-gray-600">No items found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Clerkdashboard;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import Barcode from "react-barcode";

// const Clerkdashboard = () => {
//   const [items, setItems] = useState([]);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchItems = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/items/items");
//         setItems(response.data);
//       } catch (err) {
//         console.error("Error fetching items:", err);
//         setError("Failed to fetch items.");
//       }
//     };

//     fetchItems();
//   }, []);

//   const handleAddItem = () => {
//     navigate("/add-item");
//   };

//   const handlePrintBarcode = (item) => {
//     const printWindow = window.open("", "_blank");
//     printWindow.document.write(`
//       <html>
//         <head>
//           <title>Print Barcode</title>
//           <style>
//             body {
//               display: flex;
//               justify-content: center;
//               align-items: center;
//               height: 100vh;
//               margin: 0;
//             }
//             svg {
//               width: 150px;
//               height: auto;
//             }
//           </style>
//         </head>
//         <body>
//           <svg id="barcode"></svg>
//           <script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js"></script>
//           <script>
//             document.addEventListener("DOMContentLoaded", function () {
//               JsBarcode("#barcode", "${item.item_id}", {
//                 format: "CODE128",
//                 width: 1,
//                 height: 50,
//                 displayValue: false
//               });
//               setTimeout(() => {
//                 window.print();
//               }, 500);
//             });
//           </script>
//         </body>
//       </html>
//     `);
//     printWindow.document.close();
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 text-black p-4">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-2xl font-bold text-teal-600 mb-4">Clerk Dashboard</h1>

//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
//             {error}
//           </div>
//         )}

//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold">Items List</h2>
//           <button
//             onClick={handleAddItem}
//             className="bg-teal-600 hover:bg-teal-700 text-white rounded-lg py-2 px-4 font-semibold"
//           >
//             Add New Item
//           </button>
//         </div>

//         {items.length > 0 ? (
//           <table className="w-full border-collapse border border-gray-300">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="border border-gray-300 px-4 py-2">Item ID</th>
//                 <th className="border border-gray-300 px-4 py-2">Item Name</th>
//                 <th className="border border-gray-300 px-4 py-2">Quantity</th>
//                 <th className="border border-gray-300 px-4 py-2">Barcode</th>
//                 <th className="border border-gray-300 px-4 py-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {items.map((item) => (
//                 <tr key={item.item_id} className="hover:bg-gray-100">
//                   <td className="border border-gray-300 px-4 py-2">{item.item_id}</td>
//                   <td className="border border-gray-300 px-4 py-2">{item.item_name}</td>
//                   <td className="border border-gray-300 px-4 py-2">{item.quantity}</td>
//                   <td className="border border-gray-300 px-4 py-2">
//                     <Barcode
//                       value={item.item_id}
//                       width={1}
//                       height={50}
//                       fontSize={12}
//                       displayValue={false}
//                     />
//                   </td>
//                   <td className="border border-gray-300 px-4 py-2">
//                     <button
//                       onClick={() => handlePrintBarcode(item)}
//                       className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-1 px-3 font-semibold"
//                     >
//                       Print Barcode
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <p className="text-gray-600">No items found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Clerkdashboard;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Notification = () => {
  const [items, setItems] = useState([]); // State to store items
  const [error, setError] = useState(null); // State to store errors
  const navigate = useNavigate();

  // Fetch items from the backend
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/items/items"); // Adjust the API URL as needed
        setItems(response.data);
      } catch (err) {
        console.error("Error fetching items:", err);
        setError("Failed to fetch items.");
      }
    };

    fetchItems();
  }, []);

  // Navigate to the Add Item page
  const handleAddItem = () => {
    navigate("/add-item");
  };

  // Filter items with low stock
  const lowStockItems = items.filter((item) => item.quantity < 5);

  return (
    <div className="min-h-screen bg-gray-100 text-black p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-teal-600 mb-4">Clerk Dashboard</h1>

        {/* Error Notification */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}

        {/* Low Stock Notification */}
        {lowStockItems.length > 0 && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-2 rounded mb-4">
            <strong>Low Stock Alert:</strong> The following items have a quantity less than 5:
            <ul className="list-disc pl-5">
              {lowStockItems.map((item) => (
                <li key={item.item_id}>
                  {item.item_name} (Quantity: {item.quantity})
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Add Item Button */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={handleAddItem}
            className="bg-teal-600 hover:bg-teal-700 text-white rounded-lg py-2 px-4 font-semibold"
          >
            Add New Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notification;