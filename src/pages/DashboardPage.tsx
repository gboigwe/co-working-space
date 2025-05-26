import React from 'react';
import Header from '../components/Header';
import RevenueDashboard from '../components/dashboard/RevenueDashboard';

const DashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
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
    </div>
  );
};

export default DashboardPage;
