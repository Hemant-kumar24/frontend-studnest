// src/pages/UserDashboard/MyBookings.jsx

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBed, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

const MyBookings = () => {
  // Dummy booking data
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Simulate loading dummy data
    const dummyBookings = [
      {
        id: 1,
        hostelName: "Blue Nest PG",
        location: "Delhi University",
        checkIn: "2025-08-10",
        roomType: "2 Seater",
      },
      {
        id: 2,
        hostelName: "Green Haven Hostel",
        location: "Bangalore City",
        checkIn: "2025-09-01",
        roomType: "1 Seater",
      },
    ];
    setBookings(dummyBookings); // Comment this out to test empty state
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-white">📘 My Bookings</h2>

      {bookings.length === 0 ? (
        <div className="bg-white/20 text-white p-6 rounded-xl shadow-lg text-center">
          <p className="text-xl mb-4">You haven't booked any hostel yet.</p>
          <Link
            to="/explore"
            className="inline-block mt-2 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition duration-300"
          >
            Go to Book Hostels
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white/20 backdrop-blur-lg text-white p-5 rounded-xl shadow-lg hover:shadow-2xl transition"
            >
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                <FaBed /> {booking.hostelName}
              </h3>
              <p className="mb-2 flex items-center gap-2">
                <FaMapMarkerAlt /> {booking.location}
              </p>
              <p className="mb-2 flex items-center gap-2">
                <FaCalendarAlt /> Check-in: {booking.checkIn}
              </p>
              <p className="font-semibold">Room Type: {booking.roomType}</p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
