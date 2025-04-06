import { useState } from "react";
import axios from "axios"; // Replace with "./axios" if it's in the same directory

const UpdateInventory = () => {
  const [formData, setFormData] = useState({
    item_name: "",
    item_id: "",
    employee_id: "",
    quantity: "",
  });

  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResponse(null);

    try {
      const res = await axios.post("http://localhost:5000/api/updateInventory", formData);
      setResponse(res.data);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-2xl">
      <h2 className="text-2xl font-bold mb-4 text-center">Update Inventory</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="item_name"
          placeholder="Item Name"
          value={formData.item_name}
          onChange={handleChange}
          className="w-full border p-2 rounded-md"
          required
        />

        <input
          type="text"
          name="item_id"
          placeholder="Item ID"
          value={formData.item_id}
          onChange={handleChange}
          className="w-full border p-2 rounded-md"
          required
        />

        <input
          type="text"
          name="employee_id"
          placeholder="Employee ID"
          value={formData.employee_id}
          onChange={handleChange}
          className="w-full border p-2 rounded-md"
          required
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity to Deduct"
          value={formData.quantity}
          onChange={handleChange}
          className="w-full border p-2 rounded-md"
          required
          min="1"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Update Inventory
        </button>
      </form>

      {response && (
        <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-md">
          ✅ {response.message}
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-800 rounded-md">
          ❌ {error}
        </div>
      )}
    </div>
  );
};

export default UpdateInventory;
