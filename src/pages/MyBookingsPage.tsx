import React from 'react';
import { useAuth } from '../context/AuthContext';
import UserBookings from '../components/dashboard/UserBookings';

const MyBookingsPage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 bg-blue-50 border-b border-blue-100">
            <h2 className="text-xl font-semibold text-center text-blue-800">Login Required</h2>
          </div>
          <div className="p-6">
            <p className="text-gray-600 mb-4 text-center">
              Please login to view your bookings.
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href="/login"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Login
              </a>
              <a
                href="/register"
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Register
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">My Bookings</h1>
          <p className="text-gray-600">
            View and manage your workspace reservations
          </p>
        </div>
        
        <UserBookings />
        
        <div className="mt-6 flex justify-center">
          <a
            href="/booking"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Book New Desk
          </a>
        </div>
      </div>
    </div>
  );
};

export default MyBookingsPage;