// src/pages/AdminDashboard/Details.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Details = () => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAdminDetails = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.get("http://localhost:5000/api/admin/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAdmin(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching admin details:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminDetails();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
      >
        <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
          Admin Details
        </h2>

        {loading ? (
          <p className="text-gray-600 dark:text-gray-300">Loading...</p>
        ) : admin ? (
          <div className="space-y-4">
            <div>
              <h4 className="text-sm text-gray-500 dark:text-gray-400">
                Full Name
              </h4>
              <p className="text-lg font-semibold text-gray-800 dark:text-white">
                {admin.name}
              </p>
            </div>
            <div>
              <h4 className="text-sm text-gray-500 dark:text-gray-400">Email</h4>
              <p className="text-lg font-semibold text-gray-800 dark:text-white">
                {admin.email}
              </p>
            </div>
            <div>
              <h4 className="text-sm text-gray-500 dark:text-gray-400">
                Role
              </h4>
              <p className="text-lg font-semibold text-gray-800 dark:text-white">
                Administrator
              </p>
            </div>
            <div>
              <h4 className="text-sm text-gray-500 dark:text-gray-400">
                Registered On
              </h4>
              <p className="text-lg font-semibold text-gray-800 dark:text-white">
                {new Date(admin.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-red-500">Failed to load admin data.</p>
        )}
      </motion.div>
    </div>
  );
};

export default Details;
