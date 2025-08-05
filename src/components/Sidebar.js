// src/components/Sidebar.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";

const Sidebar = ({ role }) => {
  const navigate = useNavigate();

  const menuItems =
    role === "admin"
      ? [
          { label: "Upload Hostel", path: "/admindashboard/upload" },
          { label: "Hostel Analysis", path: "/admindashboard/analysis" },
         
          { label: "Profile", path: "/admindashboard/profile" },
        ]
      : [
          
          { label: "My Bookings", path: "/userdashboard/bookings" },
          { label: "My Reviews", path: "/userdashboard/reviews" },
          { label: "Profile", path: "/userdashboard/profile" },
        ];

  return (
    <div className="w-64 h-screen bg-blue-900 text-white p-5">
      <h2 className="text-xl font-bold mb-6">StudNest</h2>
      <ul className="space-y-4">
        {menuItems.map((item) => (
          <li
            key={item.path}
            className="cursor-pointer hover:underline"
            onClick={() => navigate(item.path)}
          >
            {item.label}
          </li>
        ))}
      </ul>
      <button
        onClick={logout}
        className="mt-10 bg-red-500 px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
