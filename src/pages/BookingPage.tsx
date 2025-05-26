import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import DeskMap from '../components/booking/DeskMap';
import BookingForm from '../components/booking/BookingForm';
import { Desk } from '../types';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const BookingPage: React.FC = () => {
  const { isAuthenticated, currentUser } = useAuth();
  const [selectedDesk, setSelectedDesk] = useState<Desk | null>(null);
  const [step, setStep] = useState<'select-desk' | 'booking-details'>(
    'select-desk'
  );

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 bg-blue-50 border-b border-blue-100">
            <h2 className="text-xl font-semibold text-center text-blue-800">Login Required</h2>
          </div>
          <div className="p-6">
            <p className="text-gray-600 mb-4 text-center">
              Please login or create an account to book a desk.
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

  const handleSelectDesk = (desk: Desk) => {
    setSelectedDesk(desk);
    setStep('booking-details');
  };

  const handleBackToSelectDesk = () => {
    setStep('select-desk');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Book Your Workspace</h1>
          <p className="text-gray-600">
            Select a desk and time slot that works for you
          </p>
        </div>

        <div className="mb-6">
          <div className="overflow-hidden rounded-lg bg-gray-200 mb-4">
            <div className="h-2 bg-blue-600" style={{ width: step === 'select-desk' ? '50%' : '100%' }}></div>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <div className={step === 'select-desk' ? 'font-medium text-blue-600' : ''}>
              1. Select a Desk
            </div>
            <div className={step === 'booking-details' ? 'font-medium text-blue-600' : ''}>
              2. Book Time Slot
            </div>
          </div>
        </div>

        {/* User Membership Info */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-md">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-800">Current Membership: <span className="text-blue-700">{currentUser?.membershipTier}</span></h3>
              <p className="text-sm text-gray-600">
                {currentUser?.membershipTier === 'Basic' && 'Rate: $10/hour for individual desks'}
                {currentUser?.membershipTier === 'Premium' && 'Rate: $15/hour for individual desks'}
                {currentUser?.membershipTier === 'Executive' && 'Rate: $20/hour for individual desks'}
              </p>
            </div>
            <div className="text-sm text-gray-600">
              Team desks: $25/hour
            </div>
          </div>
        </div>

        {step === 'select-desk' && (
          <div className="transition-all duration-300 transform">
            <DeskMap onSelectDesk={handleSelectDesk} />
          </div>
        )}

        {step === 'booking-details' && selectedDesk && (
          <div className="transition-all duration-300 transform">
            <div className="mb-4 flex items-center">
              <button
                onClick={handleBackToSelectDesk}
                className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to desk selection
              </button>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="p-4 bg-blue-50 border-b border-blue-100">
                <h2 className="font-medium text-gray-800">
                  Selected: <span className="text-blue-700">{selectedDesk.name}</span> ({selectedDesk.type === 'individual' ? 'Individual Desk' : 'Team Space'})
                </h2>
              </div>
            </div>
            
            <BookingForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingPage;