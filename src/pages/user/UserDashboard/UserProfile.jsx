// src/pages/UserDashboard/Profile.jsx

import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const UserProfile = () => {
  // Dummy user profile data
  const [user, setUser] = useState({
    name: "Hemant Kumar",
    email: "hemant@example.com",
    joined: "2024-11-15",
    profileImage: "", // If empty, fallback to icon
  });

  return (
    <div className="p-6">
      <motion.div
        className="bg-white/20 backdrop-blur-md rounded-xl p-6 shadow-md w-full max-w-3xl mx-auto text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
          {user.profileImage ? (
            <img
              src={user.profileImage}
              alt="Profile"
              className="w-28 h-28 object-cover rounded-full border-4 border-white"
            />
          ) : (
            <FaUserCircle className="text-gray-200 text-[100px]" />
          )}
          <div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-white/80">{user.email}</p>
            <p className="text-white/50 mt-1 text-sm">Joined on {user.joined}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="bg-white/10 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-1">Full Name</h4>
            <p className="text-white/80">{user.name}</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-1">Email Address</h4>
            <p className="text-white/80">{user.email}</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-1">Joined</h4>
            <p className="text-white/80">{user.joined}</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-1">User Type</h4>
            <p className="text-white/80">Student</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UserProfile;
