import React, { useState } from 'react';

const ProfileModal = ({ showModal, onClose, adminProfile, onSaveProfile }) => {
  const [newProfileName, setNewProfileName] = useState(adminProfile.name);
  const [newProfilePhoto, setNewProfilePhoto] = useState(null);

  const handleSave = () => {
    onSaveProfile(newProfileName, newProfilePhoto);
    onClose();
  };

  return (
    showModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">Name</label>
            <input
              type="text"
              value={newProfileName}
              onChange={(e) => setNewProfileName(e.target.value)}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">Profile Photo</label>
            <input
              type="file"
              onChange={(e) => setNewProfilePhoto(e.target.files[0])}
              accept="image/*"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
            />
            <img
              src={newProfilePhoto ? URL.createObjectURL(newProfilePhoto) : adminProfile.profilePhoto}
              alt="Preview"
              className="mt-2 w-24 h-24 rounded-full object-cover"
            />
          </div>
          <div className="flex space-x-4">
            <button onClick={handleSave} className="flex-1 bg-teal-600 text-white py-2 px-4 rounded-lg">Save</button>
            <button onClick={onClose} className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg">Cancel</button>
          </div>
        </div>
      </div>
    )
  );
};

export default ProfileModal;
