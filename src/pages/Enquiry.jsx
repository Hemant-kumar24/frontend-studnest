import React, { useEffect, useState } from "react";
import { FaPhoneAlt, FaUser, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";

const dummyHostels = [
  {
    id: "1",
    name: "Elite Boys Hostel",
    address: "123 College Road",
    city: "Delhi",
    description: "Spacious rooms with attached bathrooms and study tables.",
    roomType: "Shared Room",
    amenities: ["WiFi", "Laundry", "CCTV", "Power Backup"],
    images: ["https://source.unsplash.com/800x600/?hostel,room"],
    owner: {
      name: "Rajeev Mehta",
      email: "rajeev@hostel.com",
      phone: "+91-9876543210",
    },
  },
  {
    id: "2",
    name: "Sunrise Girls Hostel",
    address: "45 Market Street",
    city: "Mumbai",
    description: "Safe and clean girls PG with 24x7 security.",
    roomType: "Private Room",
    amenities: ["Security", "Geyser", "Meals", "WiFi"],
    images: ["https://source.unsplash.com/800x600/?hostel,girls"],
    owner: {
      name: "Shalini Rao",
      email: "shalini@sunrise.com",
      phone: "+91-9123456789",
    },
  },
  {
    id: "3",
    name: "PG Stay",
    address: "Near MG Road",
    city: "Bangalore",
    description: "Affordable PG for students with mess facility.",
    roomType: "Triple Sharing",
    amenities: ["Mess", "WiFi", "Housekeeping", "Parking"],
    images: ["https://source.unsplash.com/800x600/?pg,room"],
    owner: {
      name: "Naveen Reddy",
      email: "naveen@pgstay.com",
      phone: "+91-9876501234",
    },
  },
  {
    id: "4",
    name: "Comfort Living",
    address: "Sector 22",
    city: "Chandigarh",
    description: "Comfortable PG with attached kitchen and balcony.",
    roomType: "Private Room",
    amenities: ["Balcony", "Kitchen", "WiFi", "Fridge"],
    images: ["https://source.unsplash.com/800x600/?comfort,pg"],
    owner: {
      name: "Puneet Sharma",
      email: "puneet@comfort.com",
      phone: "+91-9988776655",
    },
  },
  {
    id: "5",
    name: "City View Hostel",
    address: "Hill Top Colony",
    city: "Dehradun",
    description: "Scenic hostel with peaceful environment.",
    roomType: "Shared Room",
    amenities: ["Garden", "Parking", "WiFi", "Laundry"],
    images: ["https://source.unsplash.com/800x600/?scenic,hostel"],
    owner: {
      name: "Sonia Verma",
      email: "sonia@cityview.com",
      phone: "+91-9112233445",
    },
  },
];

const Enquiry = () => {
  const [hostel, setHostel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call delay
    setTimeout(() => {
      const randomHostel =
        dummyHostels[Math.floor(Math.random() * dummyHostels.length)];
      setHostel(randomHostel);
      setLoading(false);
    }, 1000); // 1s loading simulation
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <p className="text-lg font-semibold">Loading hostel details...</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${hostel.images?.[0]})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"></div>

      {/* Content */}
      <div className="relative z-10 px-4 py-10 min-h-screen flex justify-center items-center">
        <div className="max-w-4xl w-full bg-white shadow-2xl rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
            Hostel Owner Contact Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <FaUser className="text-blue-500" />
                <span className="font-semibold">Owner Name:</span>
                <span>{hostel.owner?.name}</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-blue-500" />
                <span className="font-semibold">Email:</span>
                <span>{hostel.owner?.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhoneAlt className="text-blue-500" />
                <span className="font-semibold">Phone:</span>
                <span>{hostel.owner?.phone}</span>
              </div>
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-blue-500 mt-1" />
                <span className="font-semibold">Address:</span>
                <span>
                  {hostel.address}, {hostel.city}
                </span>
              </div>
            </div>

            <div className="bg-gray-100 rounded-xl p-4">
              <h3 className="text-xl font-semibold mb-2">Hostel Description</h3>
              <p className="text-gray-700 mb-2">{hostel.description}</p>

              <div className="mt-4">
                <h4 className="font-medium">Room Type:</h4>
                <p>{hostel.roomType}</p>
              </div>

              <div className="mt-2">
                <h4 className="font-medium">Amenities:</h4>
                <ul className="list-disc list-inside">
                  {hostel.amenities?.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Enquiry;
