import React, { useState } from 'react';
import Header from '../components/Header';
import DeskMap from '../components/booking/DeskMap';
import BookingForm from '../components/booking/BookingForm';
import { useBooking } from '../context/BookingContext';
import { Desk, MembershipTier } from '../types';
import { ArrowLeft } from 'lucide-react';

const BookingPage: React.FC = () => {
  const { selectedMembershipTier, setSelectedMembershipTier } = useBooking();
  const [selectedDesk, setSelectedDesk] = useState<Desk | null>(null);
  const [step, setStep] = useState<'select-membership' | 'select-desk' | 'booking-details'>(
    'select-membership'
  );

  const handleMembershipSelect = (tier: MembershipTier) => {
    setSelectedMembershipTier(tier);
    setStep('select-desk');
  };

  const handleSelectDesk = (desk: Desk) => {
    setSelectedDesk(desk);
    setStep('booking-details');
  };

  const handleBackToSelectDesk = () => {
    setStep('select-desk');
  };

  const handleBackToMembership = () => {
    setStep('select-membership');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Book Your Workspace</h1>
            <p className="text-gray-600">
              Select your membership tier, desk, and time slot
            </p>
          </div>

          <div className="mb-6">
            <div className="overflow-hidden rounded-lg bg-gray-200 mb-4">
              <div 
                className="h-2 bg-blue-600" 
                style={{ 
                  width: step === 'select-membership' ? '33%' : 
                         step === 'select-desk' ? '66%' : '100%' 
                }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <div className={step === 'select-membership' ? 'font-medium text-blue-600' : ''}>
                1. Choose Membership
              </div>
              <div className={step === 'select-desk' ? 'font-medium text-blue-600' : ''}>
                2. Select Desk
              </div>
              <div className={step === 'booking-details' ? 'font-medium text-blue-600' : ''}>
                3. Book Time Slot
              </div>
            </div>
          </div>

          {/* Membership Selection */}
          {step === 'select-membership' && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Choose Your Membership Tier</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div 
                  onClick={() => handleMembershipSelect('Basic')}
                  className="cursor-pointer p-6 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
                >
                  <h3 className="text-lg font-semibold text-blue-600 mb-2">Basic</h3>
                  <div className="text-2xl font-bold text-gray-800 mb-2">$10<span className="text-sm text-gray-600">/hour</span></div>
                  <p className="text-gray-600 text-sm">Perfect for occasional visits</p>
                </div>

                <div 
                  onClick={() => handleMembershipSelect('Premium')}
                  className="cursor-pointer p-6 border-2 border-teal-500 bg-teal-50 rounded-lg hover:bg-teal-100 transition-all"
                >
                  <div className="text-xs font-semibold text-teal-600 mb-2">MOST POPULAR</div>
                  <h3 className="text-lg font-semibold text-teal-600 mb-2">Premium</h3>
                  <div className="text-2xl font-bold text-gray-800 mb-2">$15<span className="text-sm text-gray-600">/hour</span></div>
                  <p className="text-gray-600 text-sm">Ideal for regular users</p>
                </div>

                <div 
                  onClick={() => handleMembershipSelect('Executive')}
                  className="cursor-pointer p-6 border-2 border-gray-200 rounded-lg hover:border-amber-500 hover:bg-amber-50 transition-all"
                >
                  <h3 className="text-lg font-semibold text-amber-600 mb-2">Executive</h3>
                  <div className="text-2xl font-bold text-gray-800 mb-2">$20<span className="text-sm text-gray-600">/hour</span></div>
                  <p className="text-gray-600 text-sm">Premium experience</p>
                </div>
              </div>
            </div>
          )}

          {/* Current Membership Info */}
          {step !== 'select-membership' && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-md">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-800">
                    Selected Membership: <span className="text-blue-700">{selectedMembershipTier}</span>
                    <button
                      onClick={handleBackToMembership}
                      className="ml-2 text-sm text-blue-600 hover:text-blue-700 underline"
                    >
                      Change
                    </button>
                  </h3>
                  <p className="text-sm text-gray-600">
                    {selectedMembershipTier === 'Basic' && 'Rate: $10/hour for individual desks'}
                    {selectedMembershipTier === 'Premium' && 'Rate: $15/hour for individual desks'}
                    {selectedMembershipTier === 'Executive' && 'Rate: $20/hour for individual desks'}
                  </p>
                </div>
                <div className="text-sm text-gray-600">
                  Team desks: $25/hour
                </div>
              </div>
            </div>
          )}

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
    </div>
  );
};

export default BookingPage;
