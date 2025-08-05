import React, { useState, useEffect } from 'react';
import axiosInstance from "../../../utils/axiosInstance";

const UploadHostels = () => {
  const [formData, setFormData] = useState({
    propertyTitle: '',
    propertyType: '',
    description: '',
    address: '',
    city: '',
    nearbyCollege: '',
    monthlyRent: '',
    securityDeposit: '',
    genderPreference: '',
    totalRooms: '',
    availableRooms: '',
    amenities: [],
  });

  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(null); // <- check subscription
  const amenitiesList = ['WiFi', 'Laundry', 'CCTV', 'AC', 'Parking', 'Power Backup'];

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const res = await axiosInstance.get('/admin/profile');
        setIsSubscribed(res.data.isSubscribed);
      } catch (err) {
        setIsSubscribed(false);
        console.error('Failed to fetch subscription status');
      }
    };

    fetchAdminData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAmenityToggle = (amenity) => {
    const updated = formData.amenities.includes(amenity)
      ? formData.amenities.filter((a) => a !== amenity)
      : [...formData.amenities, amenity];
    setFormData({ ...formData, amenities: updated });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isSubscribed) {
      setMessage('❌ Please subscribe before uploading a hostel.');
      return;
    }

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'amenities') {
        form.append(key, JSON.stringify(value));
      } else {
        form.append(key, value);
      }
    });

    if (image) form.append('image', image);

    try {
      const res = await axiosInstance.post('/hostels', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setMessage(res.data.message || '✅ Hostel uploaded successfully');
      setFormData({
        propertyTitle: '',
        propertyType: '',
        description: '',
        address: '',
        city: '',
        nearbyCollege: '',
        monthlyRent: '',
        securityDeposit: '',
        genderPreference: '',
        totalRooms: '',
        availableRooms: '',
        amenities: [],
      });
      setImage(null);
    } catch (err) {
      setMessage(err.response?.data?.message || '❌ Upload failed');
    }
  };

  if (isSubscribed === null) {
    return <p className="text-center py-10">Checking subscription status...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 shadow rounded bg-white mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Upload Hostel</h2>
      {message && <p className="text-center text-red-600 font-medium mb-2">{message}</p>}

      {!isSubscribed && (
        <div className="text-center text-red-500 font-semibold mb-4">
          ⚠️ You must subscribe before uploading a hostel.
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <input disabled={!isSubscribed} name="propertyTitle" placeholder="Property Title" value={formData.propertyTitle} onChange={handleChange} className="p-2 border rounded" required />
        <input disabled={!isSubscribed} name="propertyType" placeholder="Property Type" value={formData.propertyType} onChange={handleChange} className="p-2 border rounded" required />
        <textarea disabled={!isSubscribed} name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="p-2 border rounded col-span-2" required />
        <input disabled={!isSubscribed} name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="p-2 border rounded" required />
        <input disabled={!isSubscribed} name="city" placeholder="City" value={formData.city} onChange={handleChange} className="p-2 border rounded" required />
        <input disabled={!isSubscribed} name="nearbyCollege" placeholder="Nearby College" value={formData.nearbyCollege} onChange={handleChange} className="p-2 border rounded" required />
        <input disabled={!isSubscribed} name="monthlyRent" placeholder="Monthly Rent" value={formData.monthlyRent} onChange={handleChange} className="p-2 border rounded" required />
        <input disabled={!isSubscribed} name="securityDeposit" placeholder="Security Deposit" value={formData.securityDeposit} onChange={handleChange} className="p-2 border rounded" required />
        <input disabled={!isSubscribed} name="genderPreference" placeholder="Gender Preference" value={formData.genderPreference} onChange={handleChange} className="p-2 border rounded" required />
        <input disabled={!isSubscribed} name="totalRooms" placeholder="Total Rooms" value={formData.totalRooms} onChange={handleChange} className="p-2 border rounded" required />
        <input disabled={!isSubscribed} name="availableRooms" placeholder="Available Rooms" value={formData.availableRooms} onChange={handleChange} className="p-2 border rounded" required />

        <div className="col-span-2">
          <label className="block font-semibold mb-1">Select Amenities:</label>
          <div className="flex flex-wrap gap-2">
            {amenitiesList.map((item) => (
              <label key={item} className="flex items-center space-x-2">
                <input disabled={!isSubscribed} type="checkbox" checked={formData.amenities.includes(item)} onChange={() => handleAmenityToggle(item)} />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="col-span-2">
          <label className="block font-semibold mb-1">Upload Image:</label>
          <input disabled={!isSubscribed} type="file" accept="image/*" onChange={handleImageChange} className="w-full" />
        </div>

        <button
          type="submit"
          disabled={!isSubscribed}
          className={`col-span-2 py-2 rounded font-medium ${
            isSubscribed
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-400 text-white cursor-not-allowed'
          }`}
        >
          Upload Hostel
        </button>
      </form>
    </div>
  );
};

export default UploadHostels;
