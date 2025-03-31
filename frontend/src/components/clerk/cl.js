import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ItemList from '../clerk/itemlist';
import { FaUser, FaCog, FaBell, FaShieldAlt, FaBox, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import defaultProfilePhoto from "../../assets/bu.jpg";

function Cl() {
  const navigate = useNavigate();
  const [lowStockItems, setLowStockItems] = useState([]);
  const [items, setItems] = useState([]);
  const [clerkProfile, setClerkProfile] = useState(() => {
    const savedProfile = localStorage.getItem("clerkProfile");
    return savedProfile
      ? JSON.parse(savedProfile)
      : { name: "Clerk", profilePhoto: defaultProfilePhoto };
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const [newProfilePhoto, setNewProfilePhoto] = useState(null);
  const [newProfileName, setNewProfileName] = useState(clerkProfile.name);
  const [errorMessage, setErrorMessage] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleString());
  const [viewedLowStockIds, setViewedLowStockIds] = useState(() => {
    return JSON.parse(localStorage.getItem('viewedLowStockIds')) || [];
  });

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/items/items');
        const data = await response.json();
        setItems(data);
        const lowStock = data.filter((item) => item.quantity < 5);
        setLowStockItems(lowStock);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    fetchRequests();
  }, []);

  useEffect(() => {
    localStorage.setItem('viewedLowStockIds', JSON.stringify(viewedLowStockIds));
    console.log('Updated viewedLowStockIds in localStorage:', viewedLowStockIds);
  }, [viewedLowStockIds]);

  const addItem = (name, quantity) => {
    const newItem = {
      item_id: Date.now().toString(), // Unique ID
      item_name: name,
      quantity: parseInt(quantity),
    };
    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    const updatedLowStock = updatedItems.filter((item) => item.quantity < 5);
    setLowStockItems(updatedLowStock);
    setLastUpdated(new Date().toLocaleString());
    console.log('Added item:', newItem);
    console.log('Updated lowStockItems:', updatedLowStock);
  };

  const compressAndSaveProfile = (file, name) => {
    const img = new Image();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    img.onload = () => {
      const MAX_WIDTH = 200;
      const MAX_HEIGHT = 200;
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      const base64String = canvas.toDataURL("image/jpeg", 0.7);

      const updatedProfile = {
        name: name,
        profilePhoto: base64String,
      };

      setClerkProfile(updatedProfile);
      localStorage.setItem("clerkProfile", JSON.stringify(updatedProfile));
      setShowEditModal(false);
      setNewProfilePhoto(null);
      setErrorMessage(null);
    };

    img.src = URL.createObjectURL(file);
  };

  const handleEditProfile = () => {
    if (newProfilePhoto) {
      compressAndSaveProfile(newProfilePhoto, newProfileName);
    } else {
      const updatedProfile = {
        name: newProfileName,
        profilePhoto: clerkProfile.profilePhoto,
      };
      setClerkProfile(updatedProfile);
      localStorage.setItem("clerkProfile", JSON.stringify(updatedProfile));
      setShowEditModal(false);
      setErrorMessage(null);
    }
  };

  const handleNotificationClick = () => {
    setViewedLowStockIds((prev) => [...prev, ...lowStockItems.map((item) => item.item_id)]);
    navigate('/notify');
  };

  const handleLogout = () => {
    localStorage.removeItem("clerkProfile");
    navigate('/login');
  };

  // Form state for adding items
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');

  const handleAddItemSubmit = (e) => {
    e.preventDefault();
    if (itemName && itemQuantity) {
      addItem(itemName, itemQuantity);
      setItemName('');
      setItemQuantity('');
    }
  };

  // Check if there are any unviewed low stock items
  const hasUnviewedLowStock = lowStockItems.some((item) => !viewedLowStockIds.includes(item.item_id));

  return (
    <div className="min-h-screen bg-teal-50 text-gray-900">
      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-teal-500 text-white rounded-md"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Header Section */}
      <div className="bg-teal-500 text-white py-6 shadow-md fixed top-0 left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl md:text-3xl font-bold">Welcome, Clerk!</h1>
          <p className="mt-2 text-sm md:text-base">Manage your inventory efficiently</p>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 md:mt-12 flex flex-col md:flex-row">
        {/* Sidebar */}
        <div
          className={`fixed top-0 left-0 w-64 bg-green-50 text-green-700 p-6 shadow-lg h-screen overflow-y-auto z-10 md:w-64 md:left-0 md:top-0 ${
            sidebarOpen ? 'translate-x-0' : 'md:translate-x-0 -translate-x-full'
          }`}
        >
          <div className="mb-6 mt-20">
            <div className="flex flex-col items-center">
              <img
                src={clerkProfile.profilePhoto}
                alt="Clerk Profile"
                className="w-16 h-16 rounded-full object-cover border-2 border-green-200 mb-2"
              />
              <h2 className="text-lg font-semibold">{clerkProfile.name}</h2>
              <button
                onClick={() => {
                  setShowEditModal(true);
                  setNewProfileName(clerkProfile.name);
                  setErrorMessage(null);
                }}
                className="text-sm hover:text-green-900 mt-1"
              >
                Edit Profile
              </button>
            </div>
          </div>

          <ul className="space-y-4">
            <li>
              <button className="flex items-center hover:text-green-900 w-full transition-colors duration-200">
                <FaUser className="mr-2" /> Profile
              </button>
            </li>
            <li>
              <button className="flex items-center hover:text-green-900 w-full transition-colors duration-200">
                <FaCog className="mr-2" /> Account Settings
              </button>
            </li>
            <li>
              <button
                onClick={handleNotificationClick}
                className="flex items-center hover:text-green-900 w-full transition-colors duration-200 relative"
              >
                <FaBell className={`mr-2 ${hasUnviewedLowStock ? 'text-red-500' : ''}`} />
                {hasUnviewedLowStock && (
                  <span className="absolute top-0 left-2 w-3 h-3 bg-red-500 rounded-full transform -translate-y-1"></span>
                )}
                Notifications
              </button>
            </li>
            <li>
              <button onClick={() => navigate('/report')} className="flex items-center hover:text-green-900 w-full transition-colors duration-200">
                <FaShieldAlt className="mr-2" /> Reports
              </button>
            </li>
            <li>
              <button onClick={() => navigate('/clerk')} className="flex items-center hover:text-green-900 w-full transition-colors duration-200">
                <FaBox className="mr-2" /> Clerk
              </button>
            </li>
            <li>
              <button onClick={handleLogout} className="flex items-center hover:text-green-900 w-full transition-colors duration-200">
                <FaSignOutAlt className="mr-2" /> Logout
              </button>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 py-8 md:ml-64">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Inventory List</h2>
            <ItemList items={items} />

            {/* Add Item Form */}
            <form onSubmit={handleAddItemSubmit} className="mt-4">
              <div className="flex flex-col space-y-2">
                <input
                  type="text"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  placeholder="Item Name"
                  className="p-2 border border-gray-300 rounded-md"
                />
                <input
                  type="number"
                  value={itemQuantity}
                  onChange={(e) => setItemQuantity(e.target.value)}
                  placeholder="Quantity"
                  className="p-2 border border-gray-300 rounded-md"
                />
                <button
                  type="submit"
                  className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-md"
                >
                  Add Item
                </button>
              </div>
            </form>

            <p className="text-sm text-gray-500 mt-4">Last Updated: {lastUpdated}</p>
          </div>
        </div>
      </div>

      {/* Overlay for Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-0"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit Profile</h2>
            {errorMessage && (
              <p className="text-red-600 mb-4">{errorMessage}</p>
            )}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700">Name</label>
              <input
                type="text"
                value={newProfileName}
                onChange={(e) => setNewProfileName(e.target.value)}
                className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700">Profile Photo</label>
              <input
                type="file"
                onChange={(e) => setNewProfilePhoto(e.target.files[0])}
                accept="image/*"
                className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900"
              />
              <img
                src={
                  newProfilePhoto
                    ? URL.createObjectURL(newProfilePhoto)
                    : clerkProfile.profilePhoto
                }
                alt="Preview"
                className="mt-2 w-24 h-24 rounded-full object-cover"
              />
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleEditProfile}
                className="flex-1 bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setNewProfilePhoto(null);
                  setNewProfileName(clerkProfile.name);
                  setErrorMessage(null);
                }}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cl;