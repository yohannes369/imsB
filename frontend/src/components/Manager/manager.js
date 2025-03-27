import React, { useState, useEffect } from "react";
import axios from "axios";

const ManagerDashboard = () => {
  const [knowledge, setKnowledge] = useState([]);
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
  });
  const [editId, setEditId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const itemsPerPage = 2; // Maximum items per page

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

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = knowledge.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(knowledge.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-8 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 min-h-screen">
      {/* Header Section */}
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8 animate-fade-in">
        Manager Dashboard
      </h1>

      {/* Form Section */}
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-2xl animate-fade-in">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          {editId ? "Edit Knowledge" : "Add Knowledge"}
        </h2>
        <div className="space-y-4">
          <input
            type="text"
            name="question"
            placeholder="Enter Question"
            value={formData.question}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
          />
          <textarea
            name="answer"
            placeholder="Enter Answer"
            value={formData.answer}
            onChange={handleInputChange}
            rows="3"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
          />
          <div className="flex justify-end space-x-3">
            {editId ? (
              <button
                onClick={handleEditKnowledge}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-3 px-6 rounded-lg transition-transform duration-300 hover:scale-105"
              >
                Update
              </button>
            ) : (
              <button
                onClick={handleAddKnowledge}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-transform duration-300 hover:scale-105"
              >
                Add
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Knowledge Base Section */}
      <div className="mt-12 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8 animate-fade-in">
          Knowledge Base
        </h2>
        <ul className="space-y-6">
          {currentItems.map((item, index) => (
            <li
              key={item.id}
              className="bg-white p-6 rounded-2xl shadow-xl animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-semibold text-gray-800">{item.question}</p>
                  <p className="text-gray-600 mt-1">{item.answer}</p>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleEditClick(item)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg transition-transform duration-300 hover:scale-105"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteKnowledge(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-transform duration-300 hover:scale-105"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Pagination Section */}
        <div className="flex justify-center mt-8 space-x-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-200"
            } p-2 rounded-full transition-colors`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <span className="text-lg font-medium text-gray-700">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`${
              currentPage === totalPages
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-200"
            } p-2 rounded-full transition-colors`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;