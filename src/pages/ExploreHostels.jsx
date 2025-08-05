// src/pages/Explore.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { FaStar, FaUser, FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ExploreHostels = () => {
  const [hostels, setHostels] = useState([]);
  const [filteredHostels, setFilteredHostels] = useState([]);
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('');
  const [college, setCollege] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/hostels')
      .then(res => {
        setHostels(res.data);
        setFilteredHostels(res.data);
      })
      .catch(err => console.error('Error fetching hostels:', err));
  }, []);

  useEffect(() => {
    const result = hostels.filter(h => {
      const matchesSearch = h.propertyTitle?.toLowerCase().includes(search.toLowerCase());
      const matchesCity = city ? h.city?.toLowerCase() === city.toLowerCase() : true;
      const matchesCollege = college ? h.nearbyCollege?.toLowerCase() === college.toLowerCase() : true;
      return matchesSearch && matchesCity && matchesCollege;
    });
    setFilteredHostels(result);
  }, [search, city, college, hostels]);

  return (
    <>
      <Navbar />

      <div className="pt-24 px-4 md:px-10 max-w-7xl mx-auto min-h-screen text-gray-900 dark:text-white">
        <h1 className="text-4xl font-bold mb-10 text-center bg-gradient-to-r from-pink-500 to-indigo-500 text-transparent bg-clip-text">
          🔍 Explore Verified PGs & Hostels
        </h1>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <input
            type="text"
            placeholder="Search by name"
            className="w-full sm:w-64 px-4 py-2 rounded-xl border dark:border-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-900 dark:text-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="w-full sm:w-48 px-4 py-2 rounded-xl border dark:border-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-900 dark:text-white"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            <option value="">🏙️ All Cities</option>
            {[...new Set(hostels.map(h => h.city))].map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>

          <select
            className="w-full sm:w-60 px-4 py-2 rounded-xl border dark:border-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white dark:bg-gray-900 dark:text-white"
            value={college}
            onChange={(e) => setCollege(e.target.value)}
          >
            <option value="">🎓 All Colleges</option>
            {[...new Set(hostels.map(h => h.nearbyCollege))].map(college => (
              <option key={college} value={college}>{college}</option>
            ))}
          </select>
        </div>

        {/* Hostel Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHostels.length > 0 ? (
            filteredHostels.map((hostel) => (
              <motion.div
                key={hostel._id}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl p-5 hover:shadow-2xl transition relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
              >
                <img
                  src={
                    hostel.image
                      ? `http://localhost:5000/uploads/${hostel.image}`
                      : 'https://via.placeholder.com/300'
                  }
                  alt={hostel.propertyTitle}
                  className="rounded-xl w-full h-48 object-cover mb-4"
                />

                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-semibold text-indigo-600 dark:text-pink-400">
                    {hostel.propertyTitle}
                  </h3>
                  <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-400" />
                    <span className="text-sm font-medium">{hostel.rating || '4.5'}</span>
                  </div>
                </div>

                <p className="text-sm flex items-center mb-1">
                  <FaMapMarkerAlt className="mr-2 text-pink-500" />
                  {hostel.city} — Near {hostel.nearbyCollege}
                </p>

                <div className="text-sm space-y-1 mb-3">
                  <p>🏠 Type: {hostel.propertyType}</p>
                  <p>🛏️ Rooms: {hostel.totalRooms} | 🪑 Available: {hostel.availableRooms}</p>
                  <p>💰 Rent: ₹{hostel.monthlyRent} /mo</p>
                  <p>🔐 Deposit: ₹{hostel.securityDeposit}</p>
                  <p className="flex items-center">
                    <FaUser className="mr-1" /> Preference: {hostel.genderPreference}
                  </p>
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 text-xs text-gray-700 dark:text-gray-300 mb-4">
                  {hostel.amenities?.map((a, i) => (
                    <span
                      key={i}
                      className="bg-gradient-to-r from-indigo-200 to-purple-200 dark:from-indigo-700 dark:to-purple-700 px-3 py-1 rounded-full"
                    >
                      {a}
                    </span>
                  ))}
                </div>

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    const token = localStorage.getItem('token');
                    if (!token) {
                      toast.error('Please login to continue');
                      navigate('/user/login');
                    } else {
                      navigate(`/enquiry/${hostel._id}`);
                    }
                  }}
                  className="w-full py-2 bg-gradient-to-r from-[#6a11cb] to-[#2575fc] hover:from-[#4a00e0] hover:to-[#8e2de2] text-white font-semibold rounded-xl shadow-md transition duration-300"
                >
                  Enquiry Now
                </motion.button>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-lg col-span-full text-gray-600 dark:text-gray-400">
              😕 No hostels found matching your filters.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default ExploreHostels;
