// src/pages/UserDashboard/MyReviews.jsx

import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

const MyReviews = () => {
  // Dummy review data
  const [reviews, setReviews] = useState([
    {
      id: 1,
      hostelName: "Sunrise PG",
      rating: 4,
      comment: "Nice and clean place. Owner is friendly.",
      date: "2025-07-25",
    },
    {
      id: 2,
      hostelName: "Green Stay",
      rating: 5,
      comment: "Best PG near college, food quality is great!",
      date: "2025-07-15",
    },
  ]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-white">My Reviews</h2>

      {reviews.length === 0 ? (
        <div className="bg-white/20 p-6 rounded-lg text-white">
          <p>No reviews submitted yet.</p>
          <p className="mt-2">Go explore and share your experience!</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white/20 text-white rounded-xl shadow-md p-5 backdrop-blur-md hover:shadow-lg transition-all duration-300"
            >
              <h3 className="text-xl font-semibold mb-2">{review.hostelName}</h3>
              <div className="flex items-center gap-1 text-yellow-300 mb-2">
                {Array.from({ length: 5 }, (_, i) => (
                  <FaStar key={i} className={i < review.rating ? "text-yellow-400" : "text-gray-300"} />
                ))}
                <span className="ml-2 text-sm text-white/80">({review.rating} Stars)</span>
              </div>
              <p className="text-white/90 mb-3 italic">"{review.comment}"</p>
              <p className="text-sm text-white/60 text-right">Reviewed on {review.date}</p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReviews;
