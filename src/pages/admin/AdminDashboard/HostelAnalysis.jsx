import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { motion } from "framer-motion";

const COLORS = ["#4F46E5", "#16A34A", "#F59E0B", "#EF4444", "#06B6D4", "#8B5CF6", "#10B981", "#DC2626"];

const HostelAnalysis = () => {
  const [hostels, setHostels] = useState([]);

  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/hostels");
        setHostels(response.data || []);
      } catch (error) {
        console.error("Error fetching hostels:", error);
      }
    };

    fetchHostels();
  }, []);

  const countByCity = hostels.reduce((acc, hostel) => {
    acc[hostel.city] = (acc[hostel.city] || 0) + 1;
    return acc;
  }, {});

  const countByRoomType = hostels.reduce((acc, hostel) => {
    acc[hostel.roomType] = (acc[hostel.roomType] || 0) + 1;
    return acc;
  }, {});

  const amenitiesCount = hostels.reduce((acc, hostel) => {
    (hostel.amenities || []).forEach((a) => {
      acc[a] = (acc[a] || 0) + 1;
    });
    return acc;
  }, {});

  const barChartData = Object.entries(countByCity).map(([city, count]) => ({
    name: city,
    hostels: count,
  }));

  const pieChartData = Object.entries(countByRoomType).map(([type, count]) => ({
    name: type,
    value: count,
  }));

  const amenitiesData = Object.entries(amenitiesCount).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="p-6 sm:p-10 bg-gray-100 min-h-screen dark:bg-gray-900">
      <motion.h1
        className="text-3xl font-bold mb-10 text-center text-gray-800 dark:text-gray-100"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Hostel Analysis Dashboard
      </motion.h1>

      <div className="grid gap-8 md:grid-cols-2 mb-12">
        <motion.div
          className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-100">
            Hostels by City
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barChartData}>
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="hostels" fill="#4F46E5" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-100">
            Room Type Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
                dataKey="value"
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend layout="horizontal" verticalAlign="bottom" align="center" />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <motion.div
        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg mb-12"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-100">
          Popular Amenities Usage
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={amenitiesData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              label
            >
              {amenitiesData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend layout="horizontal" verticalAlign="bottom" align="center" />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center">
          <h3 className="text-xl font-medium text-gray-700 dark:text-gray-100 mb-2">Total Hostels</h3>
          <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{hostels.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center">
          <h3 className="text-xl font-medium text-gray-700 dark:text-gray-100 mb-2">Cities Covered</h3>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">
            {Object.keys(countByCity).length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center">
          <h3 className="text-xl font-medium text-gray-700 dark:text-gray-100 mb-2">Room Types</h3>
          <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
            {Object.keys(countByRoomType).length}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default HostelAnalysis;
