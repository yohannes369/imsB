hello
ALTER TABLE items ADD COLUMN id INT;
npm install -D tailwindcss@3
npx tailwindcss init




















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
    <div className="relative min-h-screen grid bg-white text-black">
      {/* Left Side - Background Image Section */}
      <div className="hidden md:flex flex-auto items-center justify-center p-10 overflow-hidden bg-blue-500 bg-no-repeat bg-cover relative sm:w-1/2 xl:w-3/5"
        style={{ backgroundImage: 'url(https://i.postimg.cc/mrgPMqpP/logo.png)' }}>
        <div className="absolute bg-black opacity-25 inset-0 z-0"></div>
        <div className="w-full lg:max-w-2xl md:max-w-md z-10 text-center">
          <h2 className="font-bold text-3xl leading-tight mb-6 text-white">Add New Item</h2>
        </div>
      </div>

      {/* Right Side - Form Section */}
      <div className="flex flex-col items-center justify-center flex-auto min-w-0 md:w-full xl:w-1/2 p-4 md:p-6 lg:p-8">
        <div className="max-w-xl w-full space-y-4">
          {/* Form */}
          <div className="bg-white border border-gray-300 rounded-lg px-6 py-6">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <div>
                <label className="font-bold text-base">ID</label>
                <input
                  type="text"
                  name="id"
                  placeholder="ID"
                  value={item.id}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg py-2 px-3 mt-1 bg-white border-gray-400 placeholder-gray-500 text-black focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="font-bold text-base">Item Code</label>
                <input
                  type="text"
                  name="Item_Code"
                  placeholder="Item Code"
                  value={item.Item_Code}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg py-2 px-3 mt-1 bg-white border-gray-400 placeholder-gray-500 text-black focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="font-bold text-base">Item Name</label>
                <input
                  type="text"
                  name="Item_Name"
                  placeholder="Item Name"
                  value={item.Item_Name}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg py-2 px-3 mt-1 bg-white border-gray-400 placeholder-gray-500 text-black focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="font-bold text-base">Item Type</label>
                <input
                  type="text"
                  name="Item_Type"
                  placeholder="Item Type"
                  value={item.Item_Type}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg py-2 px-3 mt-1 bg-white border-gray-400 placeholder-gray-500 text-black focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="font-bold text-base">Quantity</label>
                <input
                  type="number"
                  name="Quantity"
                  placeholder="Quantity"
                  value={item.Quantity}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg py-2 px-3 mt-1 bg-white border-gray-400 placeholder-gray-500 text-black focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="font-bold text-base">Item Model</label>
                <input
                  type="text"
                  name="Item_Model"
                  placeholder="Item Model"
                  value={item.Item_Model}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg py-2 px-3 mt-1 bg-white border-gray-400 placeholder-gray-500 text-black focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="font-bold text-base">Item Serial</label>
                <input
                  type="text"
                  name="Item_Serial"
                  placeholder="Item Serial"
                  value={item.Item_Serial}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg py-2 px-3 mt-1 bg-white border-gray-400 placeholder-gray-500 text-black focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="font-bold text-base">Item Category</label>
                <input
                  type="text"
                  name="Item_Category"
                  placeholder="Item Category"
                  value={item.Item_Category}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg py-2 px-3 mt-1 bg-white border-gray-400 placeholder-gray-500 text-black focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="font-bold text-base">Registration Date</label>
                <input
                  type="date"
                  name="Reg_Date"
                  value={item.Reg_Date}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg py-2 px-3 mt-1 bg-white border-gray-400 text-black focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="font-bold text-base">Status</label>
                <input
                  type="text"
                  name="Status"
                  placeholder="Status"
                  value={item.Status}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg py-2 px-3 mt-1 bg-white border-gray-400 placeholder-gray-500 text-black focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <button
                type="submit"
                className="bg-teal-600 hover:bg-teal-700 text-white rounded-lg py-2 px-4 font-semibold transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                Add Item
              </button>
            </form>
          </div>

          {/* Added Item Display */}
          {addedItem && (
            <div className="bg-white border border-gray-300 rounded-lg px-6 py-6 mt-4">
              <h3 className="font-bold text-lg mb-3">Added Item Details</h3>
              <div className="space-y-1 text-sm">
                <p><strong>ID:</strong> {addedItem.id}</p>
                <p><strong>Item Code:</strong> {addedItem.Item_Code}</p>
                <p><strong>Item Name:</strong> {addedItem.Item_Name}</p>
                <p><strong>Item Type:</strong> {addedItem.Item_Type}</p>
                <p><strong>Quantity:</strong> {addedItem.Quantity}</p>
                <p><strong>Item Model:</strong> {addedItem.Item_Model}</p>
                <p><strong>Item Serial:</strong> {addedItem.Item_Serial}</p>
                <p><strong>Item Category:</strong> {addedItem.Item_Category}</p>
                <p><strong>Registration Date:</strong> {addedItem.Reg_Date}</p>
                <p><strong>Status:</strong> {addedItem.Status}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddItem;