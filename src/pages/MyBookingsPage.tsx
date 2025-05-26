import React from 'react';
import Header from '../components/Header';
import UserBookings from '../components/dashboard/UserBookings';

const MyBookingsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
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
    </div>
  );
};

export default MyBookingsPage;
