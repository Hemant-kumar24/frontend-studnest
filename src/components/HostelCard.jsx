import React from 'react';
import { useNavigate } from 'react-router-dom';

const HostelCard = ({ hostel }) => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    const token = localStorage.getItem('userToken');
    if (!token) {
      alert('Please login to book');
      return navigate('/user/login');
    }

    // ✅ Navigate to booking page with hostel ID
    navigate(`/user/book/${hostel._id}`);
  };

  return (
    <div className="border rounded-lg p-4 shadow-md">
      <img
        src={`http://localhost:5000/${hostel.images?.[0]}`}
        alt={hostel.propertyTitle}
        className="w-full h-40 object-cover rounded mb-2"
      />
      <h3 className="text-lg font-semibold">{hostel.propertyTitle}</h3>
      <p className="text-sm text-gray-600">
        {hostel.city} - {hostel.nearbyCollege}
      </p>
      <p className="font-medium mt-1">₹{hostel.monthlyRent}/month</p>

      {/* ✅ Book Now Button */}
      <button
        onClick={handleBookNow}
        className="mt-3 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
      >
        Book Now
      </button>
    </div>
  );
};

export default HostelCard;
