import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaUserCircle, FaEdit, FaSave, FaTimes } from 'react-icons/fa';

const AdminProfile = () => {
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const fetchAdminData = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/admin/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdminData(res.data.admin);
      setFormData({ name: res.data.admin.name, email: res.data.admin.email });
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch admin profile', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const form = new FormData();
      form.append('name', formData.name);
      form.append('email', formData.email);
      if (imageFile) form.append('profileImage', imageFile);

      await axios.put('/api/admin/profile', form, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setEditMode(false);
      fetchAdminData();
    } catch (err) {
      console.error('Failed to update admin profile', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300 dark:from-gray-900 dark:via-gray-800 dark:to-black py-10 px-4">
      <motion.div
        className="max-w-3xl mx-auto p-8 bg-white/80 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 dark:border-gray-700"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-5 mb-8">
          <div className="relative">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-20 h-20 object-cover rounded-full border-4 border-white shadow"
              />
            ) : (
              <div className="bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 p-4 rounded-full shadow-md">
                <FaUserCircle className="text-5xl text-white" />
              </div>
            )}
            {editMode && (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute bottom-0 right-0 cursor-pointer opacity-0 w-20 h-20"
                title="Upload"
              />
            )}
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white">Admin Profile</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">Manage your account information</p>
          </div>
        </div>

        {loading ? (
          <div className="text-center text-gray-500 dark:text-gray-400">Loading...</div>
        ) : (
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6 text-gray-800 dark:text-gray-100">
              <div className="bg-white dark:bg-gray-700 p-4 rounded-xl shadow">
                <label className="block text-sm font-semibold text-gray-500 dark:text-gray-300 mb-1">Full Name</label>
                {editMode ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-600 outline-none"
                  />
                ) : (
                  <p className="text-lg font-medium">{adminData?.name}</p>
                )}
              </div>

              <div className="bg-white dark:bg-gray-700 p-4 rounded-xl shadow">
                <label className="block text-sm font-semibold text-gray-500 dark:text-gray-300 mb-1">Email</label>
                {editMode ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-600 outline-none"
                  />
                ) : (
                  <p className="text-lg font-medium">{adminData?.email}</p>
                )}
              </div>

              <div className="col-span-full bg-white dark:bg-gray-700 p-4 rounded-xl shadow">
                <label className="block text-sm font-semibold text-gray-500 dark:text-gray-300 mb-1">Joined On</label>
                <p className="text-lg font-medium">
                  {adminData?.createdAt ? new Date(adminData.createdAt).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              {editMode ? (
                <>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg shadow hover:scale-105 transition"
                  >
                    <FaSave /> Save
                  </button>
                  <button
                    onClick={() => {
                      setEditMode(false);
                      setImagePreview(null);
                      setFormData({ name: adminData?.name, email: adminData?.email });
                    }}
                    className="flex items-center gap-2 bg-gray-300 dark:bg-gray-600 text-black dark:text-white px-4 py-2 rounded-lg hover:scale-105 transition"
                  >
                    <FaTimes /> Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setEditMode(true)}
                  className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-lg shadow hover:scale-105 transition"
                >
                  <FaEdit /> Edit Profile
                </button>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AdminProfile;
