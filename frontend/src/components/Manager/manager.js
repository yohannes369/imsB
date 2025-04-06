import React, { useState, useEffect } from "react";
import axios from "axios";
import Managersidebar from "./managersidebar";

const ManagerDashboard = () => {
  const [knowledge, setKnowledge] = useState([]);
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
  });
  const [editId, setEditId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Increased items per page for better UX

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
    if (!formData.question || !formData.answer) return;
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
      if (currentItems.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (error) {
      console.error("Error deleting knowledge:", error);
    }
  };

  const handleEditClick = (item) => {
    setFormData(item);
    setEditId(item.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = knowledge.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(knowledge.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex min-h-screen ">
      {/* Sidebar - Fixed Position */}
      <div className="fixed h-full z-50">
        <Managersidebar />
      </div>

      {/* Main Content - Adjusted for Sidebar */}
      <div className="flex-1 ml-20 md:ml-64 p-8 transition-all duration-300">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl bg color-gray font-bold text-green-950 mb-2 animate-fade-in">
            Manager Dashboard
          </h1>
          <p className="text-lg text-emerald-200 animate-fade-in delay-100">
            Knowledge Base Management System
          </p>
        </div>

        {/* Form Section */}
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-emerald-400/20 animate-fade-in-up">
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <span className="bg-emerald-600 p-2 rounded-full mr-3">
              {editId ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              )}
            </span>
            {editId ? "Edit Knowledge Entry" : "Create New Knowledge"}
          </h2>
          <div className="space-y-6">
            <div className="relative">
              <input
                type="text"
                name="question"
                placeholder="Enter Question"
                value={formData.question}
                onChange={handleInputChange}
                className="w-full bg-white/10 border border-emerald-400/30 text-white placeholder-emerald-200/50 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
              />
              <span className="absolute left-4 -top-3 bg-green-950 px-2 text-xs text-emerald-400">Question</span>
            </div>
            <div className="relative">
              <textarea
                name="answer"
                placeholder="Enter Detailed Answer"
                value={formData.answer}
                onChange={handleInputChange}
                rows="4"
                className="w-full bg-white/10 border border-emerald-400/30 text-white placeholder-emerald-200/50 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
              />
              <span className="absolute left-4 -top-3 bg-green-950 px-2 text-xs text-emerald-400">Answer</span>
            </div>
            <div className="flex justify-end space-x-4">
              {editId && (
                <button
                  onClick={() => {
                    setFormData({ question: "", answer: "" });
                    setEditId(null);
                  }}
                  className="bg-transparent border border-red-500 text-red-500 hover:bg-red-500/10 font-medium py-3 px-6 rounded-xl transition-all duration-300 hover:scale-[1.02]"
                >
                  Cancel
                </button>
              )}
              <button
                onClick={editId ? handleEditKnowledge : handleAddKnowledge}
                disabled={!formData.question || !formData.answer}
                className={`${
                  editId ? "bg-amber-600 hover:bg-amber-700" : "bg-emerald-600 hover:bg-emerald-700"
                } text-white font-medium py-3 px-6 rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center`}
              >
                {editId ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Update
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                    </svg>
                    Add
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Knowledge Base Section */}
        <div className="mt-16 max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-white flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Knowledge Base
            </h2>
            <div className="text-emerald-200">
              Total Entries: <span className="font-bold text-white">{knowledge.length}</span>
            </div>
          </div>

          {knowledge.length === 0 ? (
            <div className="bg-white/5 border border-dashed border-emerald-400/30 rounded-2xl p-12 text-center animate-pulse">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-emerald-400/50 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl text-white/70 mb-2">No Knowledge Entries Found</h3>
              <p className="text-emerald-200/60">Add your first knowledge entry using the form above</p>
            </div>
          ) : (
            <>
              <div className="grid gap-6">
                {currentItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="bg-gradient-to-br from-green-900/50 to-emerald-900/30 backdrop-blur-sm border border-emerald-400/20 rounded-2xl shadow-xl overflow-hidden animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-white mb-2 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {item.question}
                          </h3>
                          <p className="text-emerald-100 pl-7">{item.answer}</p>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <button
                            onClick={() => handleEditClick(item)}
                            className="bg-amber-600/20 hover:bg-amber-600/40 text-amber-400 p-2 rounded-lg border border-amber-500/30 transition-all duration-300 hover:scale-110"
                            title="Edit"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDeleteKnowledge(item.id)}
                            className="bg-red-600/20 hover:bg-red-600/40 text-red-400 p-2 rounded-lg border border-red-500/30 transition-all duration-300 hover:scale-110"
                            title="Delete"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Section */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-12 space-x-2">
                  <button
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                    className={`${
                      currentPage === 1 ? "opacity-30 cursor-not-allowed" : "hover:bg-emerald-800/50"
                    } p-2 rounded-lg transition-all duration-300`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`${
                      currentPage === 1 ? "opacity-30 cursor-not-allowed" : "hover:bg-emerald-800/50"
                    } p-2 rounded-lg transition-all duration-300`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`${
                          currentPage === pageNum
                            ? "bg-emerald-600 text-white"
                            : "text-emerald-300 hover:bg-emerald-800/50"
                        } w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`${
                      currentPage === totalPages ? "opacity-30 cursor-not-allowed" : "hover:bg-emerald-800/50"
                    } p-2 rounded-lg transition-all duration-300`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                    className={`${
                      currentPage === totalPages ? "opacity-30 cursor-not-allowed" : "hover:bg-emerald-800/50"
                    } p-2 rounded-lg transition-all duration-300`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;