import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Auth Context
import { AuthProvider } from './context/AuthContext';

// General Pages
import Landing from './pages/Landing';
import RoleSelection from './pages/RoleSelection';

// User Auth
import UserLogin from './pages/user/UserLogin';
import UserRegister from './pages/user/UserRegister';

// Admin Auth
import AdminLogin from './pages/admin/AdminLogin';
import AdminRegister from './pages/admin/AdminRegister';

// User Dashboard + Nested Routes
import UserDashboard from './pages/user/UserDashboard/UserDashboard';
import MyBookings from './pages/user/UserDashboard/MyBookings';

import MyReviews from './pages/user/UserDashboard/MyReviews';
import UserProfile from './pages/user/UserDashboard/UserProfile';

// Admin Dashboard + Nested Routes
import AdminDashboard from './pages/admin/AdminDashboard/AdminDashboard';
import UploadHostels from './pages/admin/AdminDashboard/UploadHostels';
import HostelAnalysis from './pages/admin/AdminDashboard/HostelAnalysis';
import AdminDetails from './pages/admin/AdminDashboard/Details';
import AdminProfile from './pages/admin/AdminDashboard/AdminProfile';
import WelcomeAdmin from './pages/admin/AdminDashboard/WelcomeAdmin';


import Enquiry from './pages/Enquiry'; 
// Protected Route Wrapper
import ProtectedRoute from './components/ProtectedRoute';
import ExploreHostels from './pages/ExploreHostels';
import About from './pages/About';
import Contact from './pages/Contact';
import BookNow from './pages/user/BookNow';

import { Toaster } from 'react-hot-toast';
import Subscription from './pages/admin/AdminDashboard/Subscription';

const App = () => {
  return (
    <>
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 2000,
          style: {
            background: '#333',
            color: '#fff',
          },
        }}
      />

      <AuthProvider> {/* ✅ Wrapping the whole app in AuthProvider */}
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/explore" element={<ExploreHostels />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/choose-role/login" element={<RoleSelection redirectTo="login" />} />
            <Route path="/choose-role/register" element={<RoleSelection redirectTo="register" />} />
            <Route path="/user/login" element={<UserLogin />} />
            <Route path="/user/register" element={<UserRegister />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/register" element={<AdminRegister />} />
            <Route path="/user/book/:hostelId" element={<BookNow />} />
            <Route path="/enquiry/:id" element={<Enquiry />} />
            {/* Protected User Dashboard */}
            

            <Route
              path="/userdashboard"
              element={
                <ProtectedRoute role="user">
                  <UserDashboard />
                </ProtectedRoute>
              }
            >
              <Route path="my-bookings" element={<MyBookings />} />
             
              <Route path="my-reviews" element={<MyReviews />} />
              <Route path="profile" element={<UserProfile />} />
            </Route>

            {/* Protected Admin Dashboard */}
            <Route
              path="/admindashboard"
              element={
                <ProtectedRoute role="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            >
              <Route index element={<WelcomeAdmin />} />
              <Route path="upload" element={<UploadHostels />} />
              <Route path="analysis" element={<HostelAnalysis />} />
              <Route path="subscription" element={<Subscription/>} />
              <Route path="profile" element={<AdminProfile />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
};

export default App;
