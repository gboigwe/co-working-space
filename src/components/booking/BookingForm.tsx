import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { useAuth } from '../../context/AuthContext';
import { Calendar, Clock, CreditCard } from 'lucide-react';

const BookingForm: React.FC = () => {
  const { currentUser } = useAuth();
  const { 
    timeSlots, 
    selectedDate, 
    setSelectedDate, 
    setSelectedStartTime, 
    setSelectedEndTime,
    calculateBookingPrice,
    createBooking
  } = useBooking();
  
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const today = new Date().toISOString().split('T')[0];
  
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };
  
  const handleStartTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setStartTime(value);
    setSelectedStartTime(value);
    
    // Reset end time if it's before new start time
    if (endTime) {
      const startHour = parseInt(value.split(':')[0]);
      const endHour = parseInt(endTime.split(':')[0]);
      
      if (endHour <= startHour) {
        setEndTime('');
        setSelectedEndTime('');
      }
    }
  };
  
  const handleEndTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setEndTime(value);
    setSelectedEndTime(value);
  };
  
  const filteredEndTimes = timeSlots.filter(slot => {
    if (!startTime) return false;
    
    const startHour = parseInt(startTime.split(':')[0]);
    const slotHour = parseInt(slot.time.split(':')[0]);
    
    return slotHour > startHour;
  });
  
  const handleBooking = async () => {
    setError('');
    setIsProcessing(true);
    
    try {
      const booking = await createBooking();
      
      if (booking) {
        setBookingSuccess(true);
        setStartTime('');
        setEndTime('');
      } else {
        setError('Failed to create booking. Please try again.');
      }
    } catch (err) {
      console.error('Booking error:', err);
      setError('An error occurred while creating your booking.');
    } finally {
      setIsProcessing(false);
    }
  };
  
  const totalPrice = calculateBookingPrice();
  const canBook = startTime && endTime && totalPrice > 0;
  
  if (bookingSuccess) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-green-50 p-6 border-b border-green-100">
          <div className="flex items-center justify-center">
            <div className="rounded-full bg-green-100 p-3">
              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h2 className="text-xl font-semibold text-center text-green-800 mt-4">Booking Confirmed!</h2>
          <p className="text-center text-green-700 mt-1">Your workspace has been reserved successfully.</p>
        </div>
        
        <div className="p-6">
          <p className="text-gray-600 mb-4 text-center">
            You can view or manage your booking in the "My Bookings" section.
          </p>
          
          <div className="flex justify-center space-x-3">
            <button
              onClick={() => window.location.href = '/my-bookings'}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              View My Bookings
            </button>
            
            <button
              onClick={() => {
                setBookingSuccess(false);
                window.location.href = '/booking';
              }}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Book Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Booking Details</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-200 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <Calendar className="h-4 w-4 mr-1 text-blue-600" />
              Select Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              min={today}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <Clock className="h-4 w-4 mr-1 text-blue-600" />
                Start Time
              </label>
              <select
                value={startTime}
                onChange={handleStartTimeChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select start time</option>
                {timeSlots.map(slot => (
                  <option key={slot.id} value={slot.time} disabled={!slot.isAvailable}>
                    {slot.time}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <Clock className="h-4 w-4 mr-1 text-blue-600" />
                End Time
              </label>
              <select
                value={endTime}
                onChange={handleEndTimeChange}
                disabled={!startTime}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select end time</option>
                {filteredEndTimes.map(slot => (
                  <option key={slot.id} value={slot.time} disabled={!slot.isAvailable}>
                    {slot.time}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {startTime && endTime && (
            <div className="mt-4 p-4 bg-blue-50 rounded-md border border-blue-100">
              <h3 className="font-medium text-blue-800 flex items-center">
                <CreditCard className="h-4 w-4 mr-1" />
                Price Details
              </h3>
              
              <div className="mt-2 space-y-1 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Membership Tier:</span>
                  <span className="font-medium text-gray-800">{currentUser?.membershipTier}</span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>Duration:</span>
                  <span className="font-medium text-gray-800">
                    {parseInt(endTime.split(':')[0]) - parseInt(startTime.split(':')[0])} hours
                  </span>
                </div>
                
                {parseInt(endTime.split(':')[0]) - parseInt(startTime.split(':')[0]) > 3 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount:</span>
                    <span className="font-medium">10% (for bookings over 3 hours)</span>
                  </div>
                )}
                
                <div className="border-t border-blue-200 pt-2 mt-2 flex justify-between font-medium">
                  <span className="text-blue-800">Total Price:</span>
                  <span className="text-blue-800">${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <button
          onClick={handleBooking}
          disabled={!canBook || isProcessing}
          className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors ${
            canBook && !isProcessing
              ? 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          {isProcessing ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            'Confirm Booking'
          )}
        </button>
      </div>
    </div>
  );
};

export default BookingForm;