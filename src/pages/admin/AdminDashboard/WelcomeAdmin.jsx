import React from 'react';

const WelcomeAdmin = () => {
  const adminName = localStorage.getItem('adminName') || 'Admin';

  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold mb-4">Welcome, {adminName}! 👋</h1>
      <p className="text-lg text-gray-600">Manage your hostels and analytics from here.</p>
    </div>
  );
};

export default WelcomeAdmin;
