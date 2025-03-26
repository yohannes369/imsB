import React, { useState, useEffect } from "react";
import axios from "axios";

const ManagerDashboard = () => {
  const [knowledge, setKnowledge] = useState([]);
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchKnowledge();
  }, []);

  const fetchKnowledge = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/manager/knowledge");
      setKnowledge(res.data);
    } catch (error) {
      console.error("Error fetching knowledge:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddKnowledge = async () => {
    try {
      await axios.post("http://localhost:5000/api/manager/knowledge", formData);
      fetchKnowledge();
      setFormData({ question: "", answer: "" });
    } catch (error) {
      console.error("Error adding knowledge:", error);
    }
  };

  const handleEditKnowledge = async () => {
    try {
      await axios.put(`http://localhost:5000/api/manager/knowledge/${editId}`, formData);
      fetchKnowledge();
      setFormData({ question: "", answer: "" });
      setEditId(null);
    } catch (error) {
      console.error("Error editing knowledge:", error);
    }
  };

  const handleDeleteKnowledge = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/manager/knowledge/${id}`);
      fetchKnowledge();
    } catch (error) {
      console.error("Error deleting knowledge:", error);
    }
  };

  const handleEditClick = (item) => {
    setFormData(item);
    setEditId(item.id);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Manager Dashboard</h1>
      <div className="mt-4">
        <input
          type="text"
          name="question"
          placeholder="Question"
          value={formData.question}
          onChange={handleInputChange}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          name="answer"
          placeholder="Answer"
          value={formData.answer}
          onChange={handleInputChange}
          className="border p-2 mr-2"
        />
        {editId ? (
          <button onClick={handleEditKnowledge} className="bg-yellow-500 text-white p-2">Update</button>
        ) : (
          <button onClick={handleAddKnowledge} className="bg-blue-500 text-white p-2">Add</button>
        )}
      </div>
      <h2 className="text-xl font-bold mt-6">Knowledge Base</h2>
      <ul className="mt-4">
        {knowledge.map((item) => (
          <li key={item.id} className="border p-2 mt-2">
            {item.question} - {item.answer}
            <button onClick={() => handleEditClick(item)} className="bg-yellow-500 text-white p-2 ml-2">Edit</button>
            <button onClick={() => handleDeleteKnowledge(item.id)} className="bg-red-500 text-white p-2 ml-2">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManagerDashboard;