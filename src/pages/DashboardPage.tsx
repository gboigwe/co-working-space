import React from 'react';
import { useAuth } from '../context/AuthContext';
import RevenueDashboard from '../components/dashboard/RevenueDashboard';

const DashboardPage: React.FC = () => {
  const { isAuthenticated, currentUser } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 bg-blue-50 border-b border-blue-100">
            <h2 className="text-xl font-semibold text-center text-blue-800">Login Required</h2>
          </div>
          <div className="p-6">
            <p className="text-gray-600 mb-4 text-center">
              Please login to access the dashboard.
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href="/login"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Login
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentUser?.membershipTier !== 'Executive') {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 bg-amber-50 border-b border-amber-100">
            <h2 className="text-xl font-semibold text-center text-amber-800">Executive Access Only</h2>
          </div>
          <div className="p-6">
            <p className="text-gray-600 mb-4 text-center">
              This dashboard is only available for Executive members.
            </p>
            <p className="text-sm text-gray-500 mb-4 text-center">
              Your current membership: {currentUser?.membershipTier}
            </p>
            <div className="flex justify-center">
              <a
                href="/"
                className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
              >
                Upgrade Membership
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Revenue Dashboard</h1>
          <p className="text-gray-600">
            Overview of booking performance and revenue metrics
          </p>
        </div>
        
        <RevenueDashboard />
      </div>
    </div>
  );
};

export default DashboardPage;