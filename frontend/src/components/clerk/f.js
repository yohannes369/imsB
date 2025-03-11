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
import React, { useState } from 'react';

const AddItem = () => {
  const [item, setItem] = useState({
    id: '',
    Item_Code: '',
    Item_Name: '',
    Item_Type: '',
    Quantity: '',
    Item_Model: '',
    Item_Serial: '',
    Item_Category: '',
    Reg_Date: '',
    Status: ''
  });
  const [addedItem, setAddedItem] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem({
      ...item,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/items/addItem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });

      if (!response.ok) {
        throw new Error('Failed to add item');
      }

      const data = await response.json();
      console.log('Item added:', data);
      setAddedItem(data);
      setItem({
        id: '',
        Item_Code: '',
        Item_Name: '',
        Item_Type: '',
        Quantity: '',
        Item_Model: '',
        Item_Serial: '',
        Item_Category: '',
        Reg_Date: '',
        Status: ''
      });
    } catch (err) {
      console.error('Error adding item:', err);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-2">
        {/* Form */}
        <div className="bg-white border border-gray-300 rounded-lg px-4 py-4">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
            <div>
              <label className="font-bold text-sm">ID</label>
              <input
                type="text"
                name="id"
                placeholder="ID"
                value={item.id}
                onChange={handleChange}
                required
                className="w-full border rounded-md py-1 px-2 mt-1 bg-white border-gray-400 placeholder-gray-500 text-black text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="font-bold text-sm">Item Code</label>
              <input
                type="text"
                name="Item_Code"
                placeholder="Item Code"
                value={item.Item_Code}
                onChange={handleChange}
                required
                className="w-full border rounded-md py-1 px-2 mt-1 bg-white border-gray-400 placeholder-gray-500 text-black text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="font-bold text-sm">Item Name</label>
              <input
                type="text"
                name="Item_Name"
                placeholder="Item Name"
                value={item.Item_Name}
                onChange={handleChange}
                required
                className="w-full border rounded-md py-1 px-2 mt-1 bg-white border-gray-400 placeholder-gray-500 text-black text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="font-bold text-sm">Item Type</label>
              <input
                type="text"
                name="Item_Type"
                placeholder="Item Type"
                value={item.Item_Type}
                onChange={handleChange}
                required
                className="w-full border rounded-md py-1 px-2 mt-1 bg-white border-gray-400 placeholder-gray-500 text-black text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="font-bold text-sm">Quantity</label>
              <input
                type="number"
                name="Quantity"
                placeholder="Quantity"
                value={item.Quantity}
                onChange={handleChange}
                required
                className="w-full border rounded-md py-1 px-2 mt-1 bg-white border-gray-400 placeholder-gray-500 text-black text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="font-bold text-sm">Item Model</label>
              <input
                type="text"
                name="Item_Model"
                placeholder="Item Model"
                value={item.Item_Model}
                onChange={handleChange}
                required
                className="w-full border rounded-md py-1 px-2 mt-1 bg-white border-gray-400 placeholder-gray-500 text-black text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="font-bold text-sm">Item Serial</label>
              <input
                type="text"
                name="Item_Serial"
                placeholder="Item Serial"
                value={item.Item_Serial}
                onChange={handleChange}
                required
                className="w-full border rounded-md py-1 px-2 mt-1 bg-white border-gray-400 placeholder-gray-500 text-black text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="font-bold text-sm">Item Category</label>
              <input
                type="text"
                name="Item_Category"
                placeholder="Item Category"
                value={item.Item_Category}
                onChange={handleChange}
                required
                className="w-full border rounded-md py-1 px-2 mt-1 bg-white border-gray-400 placeholder-gray-500 text-black text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="font-bold text-sm">Reg Date</label>
              <input
                type="date"
                name="Reg_Date"
                value={item.Reg_Date}
                onChange={handleChange}
                required
                className="w-full border rounded-md py-1 px-2 mt-1 bg-white border-gray-400 text-black text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="font-bold text-sm">Status</label>
              <input
                type="text"
                name="Status"
                placeholder="Status"
                value={item.Status}
                onChange={handleChange}
                required
                className="w-full border rounded-md py-1 px-2 mt-1 bg-white border-gray-400 placeholder-gray-500 text-black text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <button
              type="submit"
              className="bg-teal-600 hover:bg-teal-700 text-white rounded-lg py-1 px-4 font-semibold transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              Add Item
            </button>
          </form>
        </div>

        {/* Added Item Display */}
        {addedItem && (
          <div className="bg-white border border-gray-300 rounded-lg px-4 py-4 mt-2">
            <h3 className="font-bold text-base mb-2">Added Item Details</h3>
            <div className="space-y-1 text-xs">
              <p><strong>ID:</strong> {addedItem.id}</p>
              <p><strong>Item Code:</strong> {addedItem.Item_Code}</p>
              <p><strong>Item Name:</strong> {addedItem.Item_Name}</p>
              <p><strong>Item Type:</strong> {addedItem.Item_Type}</p>
              <p><strong>Quantity:</strong> {addedItem.Quantity}</p>
              <p><strong>Item Model:</strong> {addedItem.Item_Model}</p>
              <p><strong>Item Serial:</strong> {addedItem.Item_Serial}</p>
              <p><strong>Item Category:</strong> {addedItem.Item_Category}</p>
              <p><strong>Reg Date:</strong> {addedItem.Reg_Date}</p>
              <p><strong>Status:</strong> {addedItem.Status}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddItem;