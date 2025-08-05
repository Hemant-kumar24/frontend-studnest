import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  FaUpload,
  FaChartBar,
  FaInfoCircle,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";

const AdminDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: "Upload Hostels", path: "/admindashboard/upload", icon: <FaUpload /> },
    { name: "Hostel Analysis", path: "/admindashboard/analysis", icon: <FaChartBar /> },
    { name: "Subscriptions", path: "/admindashboard/subscription", icon: <FaInfoCircle /> }, // 👈 New button added here
    { name: "Profile", path: "/admindashboard/profile", icon: <FaUserCircle /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/admin/login");
  };

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full md:w-64 bg-gradient-to-b from-blue-700 via-purple-700 to-pink-600 text-white p-6 flex flex-col justify-between shadow-lg"
      >
        {/* Top Section */}
        <div>
          <h2 className="text-2xl font-bold mb-10 tracking-wide text-center">
            StudNest Admin 🛠️
          </h2>

          <nav className="space-y-3">
            {menuItems.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    location.pathname === item.path
                      ? "bg-white text-purple-700 shadow font-semibold"
                      : "hover:bg-purple-600"
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </motion.div>
            ))}
          </nav>
        </div>

        {/* Logout Button */}
        <div className="mt-6">
          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white font-medium transition-all"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </motion.button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <motion.main
        className="flex-1 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-4 md:p-8 overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Outlet />
      </motion.main>
    </div>
  );
};

export default AdminDashboard;
