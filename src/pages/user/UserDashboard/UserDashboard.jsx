import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  FaBook,
  FaRegListAlt,
  FaStar,
  FaUserCircle,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";
import { motion } from "framer-motion";

const UserDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { name: "My Bookings", path: "/userdashboard/my-bookings", icon: <FaBook /> },
    
    { name: "My Reviews", path: "/userdashboard/my-reviews", icon: <FaStar /> },
    { name: "Details", path: "/userdashboard/profile", icon: <FaUserCircle /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/user/login");
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gradient-to-r from-purple-600 via-blue-600 to-pink-500 text-white">
      {/* Topbar for mobile */}
      <div className="flex lg:hidden justify-between items-center p-4 bg-white/10 backdrop-blur-md">
        <h2 className="text-2xl font-bold">StudNest 🏠</h2>
        <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="text-white text-xl">
          <FaBars />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } lg:block w-full lg:w-72 bg-white/10 backdrop-blur-lg border-r border-white/20 p-6 flex flex-col justify-between shadow-xl z-10 absolute lg:relative transition-all duration-500`}
      >
        <div>
          <h2 className="text-3xl font-extrabold tracking-wide text-white mb-10 hidden lg:block">StudNest 🏠</h2>
          <nav className="space-y-4">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 text-lg font-medium ${
                  location.pathname === item.path
                    ? "bg-white/20 text-white scale-105"
                    : "hover:bg-white/10 hover:scale-105"
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>

        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={handleLogout}
          className="flex items-center justify-center space-x-3 px-4 py-2 mt-10 rounded-lg transition-all duration-300 bg-white text-red-500 font-semibold border border-red-500 hover:bg-gradient-to-r hover:from-pink-500 hover:to-red-500 hover:text-white hover:shadow-lg"
        >
          <FaSignOutAlt className="text-lg" />
          <span>Logout</span>
        </motion.button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto bg-white/10 backdrop-blur-sm shadow-inner rounded-t-3xl lg:rounded-l-3xl mt-4 lg:mt-0">
        <Outlet />
      </main>
    </div>
  );
};

export default UserDashboard;
