


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
//       // Send the item data to the backend
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
import { motion, AnimatePresence } from "framer-motion";

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage("");
    setIsSubmitting(true);

    // Validation
    if (!formData.item_id || !formData.item_code || !formData.item_name || !formData.item_type || formData.quantity === "") {
      setError("Please fill in all required fields");
      setIsSubmitting(false);
      return;
    }

    if (parseInt(formData.quantity) < 0) {
      setError("Quantity cannot be negative");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/items/items", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setMessage(response.data.message || "Item added successfully!");
      setTimeout(() => navigate("/additem"), 2000);
    } catch (err) {
      console.error("Error adding item:", err);
      setError(err.response?.data?.error || "Failed to add item. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl w-full"
      >
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {/* Header with gradient background */}
          <div className="bg-gradient-to-r from-teal-600 to-emerald-500 p-6">
            <motion.h2 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-2xl font-bold text-white text-center"
            >
              Add New Inventory Item
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-teal-100 text-center mt-1"
            >
              Fill in the details below to add a new item to inventory
            </motion.p>
          </div>

          <div className="p-6">
            <AnimatePresence>
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded mb-4 flex items-center"
                >
                  <svg className="w-5 h-5 mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {message}
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded mb-4 flex items-center"
                >
                  <svg className="w-5 h-5 mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-1">Item ID *</label>
                    <input
                      type="text"
                      name="item_id"
                      value={formData.item_id}
                      onChange={handleChange}
                      placeholder="e.g., ITM-1001"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-1">Item Name *</label>
                    <input
                      type="text"
                      name="item_name"
                      value={formData.item_name}
                      onChange={handleChange}
                      placeholder="e.g., Laptop Dell XPS 15"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.45 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-1">Quantity *</label>
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      placeholder="e.g., 50"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.55 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-1">Item Serial</label>
                    <input
                      type="text"
                      name="item_serial"
                      value={formData.item_serial}
                      onChange={handleChange}
                      placeholder="e.g., SN-12345678"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-1">Threshold</label>
                    <input
                      type="number"
                      name="threshold"
                      value={formData.threshold}
                      onChange={handleChange}
                      placeholder="e.g., 10 (minimum stock level)"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200"
                    />
                  </motion.div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-1">Item Code *</label>
                    <input
                      type="text"
                      name="item_code"
                      value={formData.item_code}
                      onChange={handleChange}
                      placeholder="e.g., CODE-XPS15"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-1">Item Type *</label>
                    <input
                      type="text"
                      name="item_type"
                      value={formData.item_type}
                      onChange={handleChange}
                      placeholder="e.g., Electronics"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-1">Item Model</label>
                    <input
                      type="text"
                      name="item_model"
                      value={formData.item_model}
                      onChange={handleChange}
                      placeholder="e.g., XPS 15 9520"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.65 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-1">Item Category</label>
                    <input
                      type="text"
                      name="item_category"
                      value={formData.item_category}
                      onChange={handleChange}
                      placeholder="e.g., Laptops"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.75 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </motion.div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="pt-6"
              >
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-4 rounded-md font-semibold text-white shadow-md transition duration-200 ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-teal-600 to-emerald-500 hover:from-teal-700 hover:to-emerald-600 transform hover:-translate-y-1'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    "Add Item"
                  )}
                </button>
              </motion.div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AddItem;