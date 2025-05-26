import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { Calendar, Clock, Zap, CheckCircle, Sparkles, Users, Monitor } from 'lucide-react';

const BookingForm: React.FC = () => {
  const { 
    timeSlots, 
    selectedDate, 
    setSelectedDate, 
    selectedDesk,
    selectedMembershipTier,
    setSelectedStartTime, 
    setSelectedEndTime,
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
        // Save to localStorage for demo purposes
        const existingBookings = JSON.parse(localStorage.getItem('demoBookings') || '[]');
        existingBookings.push({
          ...booking,
          timestamp: new Date().toISOString()
        });
        localStorage.setItem('demoBookings', JSON.stringify(existingBookings));
        
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
  
  const canBook = startTime && endTime && selectedDesk;
  const duration = startTime && endTime ? parseInt(endTime.split(':')[0]) - parseInt(startTime.split(':')[0]) : 0;
  
  if (bookingSuccess) {
    return (
      <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-3xl border border-green-500/30 overflow-hidden shadow-2xl">
        {/* Success Header */}
        <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 p-8 border-b border-green-500/20 relative overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-green-400 rounded-full animate-float opacity-40"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>
          
          <div className="flex items-center justify-center relative z-10">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-center text-white mt-6 mb-2">Booking Confirmed!</h2>
          <p className="text-center text-green-200 text-lg">Your workspace reservation is secured</p>
        </div>
        
        {/* Success Content */}
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-green-500/20 rounded-full border border-green-500/30 mb-4">
              <Sparkles className="w-4 h-4 text-green-400 mr-2" />
              <span className="text-green-300 font-medium">Ready to work!</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Your workspace is ready and waiting. You can view or manage your reservation anytime in your bookings dashboard.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => window.location.href = '/my-bookings'}
              className="group px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl shadow-lg hover:shadow-green-500/25 transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
            >
              <Users className="mr-2 w-5 h-5" />
              View My Bookings
              <div className="ml-2 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            
            <button
              onClick={() => {
                setBookingSuccess(false);
                window.location.href = '/booking';
              }}
              className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 hover:border-green-400/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
            >
              <Zap className="mr-2 w-5 h-5" />
              Book Another Space
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-3xl border border-gray-700 overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500/20 to-amber-500/20 p-6 border-b border-orange-500/20 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-orange-400 rounded-full animate-float opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </div>
        
        <div className="flex items-center relative z-10">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center mr-4">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Reserve Your Time</h2>
            <p className="text-orange-200">Select your preferred date and time slot</p>
          </div>
        </div>
      </div>
      
      <div className="p-8">
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 text-red-300 rounded-xl text-sm backdrop-blur-sm">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-2" />
              {error}
            </div>
          </div>
        )}
        
        <div className="space-y-6">
          {/* Date Selection */}
          <div className="group">
            <label className="block text-lg font-semibold text-white mb-3 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-orange-400 group-hover:text-orange-300 transition-colors duration-200" />
              Select Date
            </label>
            <div className="relative">
              <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                min={today}
                className="w-full px-4 py-4 bg-gray-700/50 backdrop-blur-sm border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-white text-lg transition-all duration-300 hover:border-orange-400"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/5 to-orange-500/0 opacity-0 hover:opacity-100 rounded-xl transition-opacity duration-300 pointer-events-none" />
            </div>
          </div>
          
          {/* Time Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group">
              <label className="block text-lg font-semibold text-white mb-3 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-orange-400 group-hover:text-orange-300 transition-colors duration-200" />
                Start Time
              </label>
              <div className="relative">
                <select
                  value={startTime}
                  onChange={handleStartTimeChange}
                  className="w-full px-4 py-4 bg-gray-700/50 backdrop-blur-sm border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-white text-lg transition-all duration-300 hover:border-orange-400 appearance-none cursor-pointer"
                >
                  <option value="" className="bg-gray-800">Select start time</option>
                  {timeSlots.map(slot => (
                    <option key={slot.id} value={slot.time} disabled={!slot.isAvailable} className="bg-gray-800">
                      {slot.time}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/5 to-orange-500/0 opacity-0 hover:opacity-100 rounded-xl transition-opacity duration-300 pointer-events-none" />
              </div>
            </div>
            
            <div className="group">
              <label className="block text-lg font-semibold text-white mb-3 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-orange-400 group-hover:text-orange-300 transition-colors duration-200" />
                End Time
              </label>
              <div className="relative">
                <select
                  value={endTime}
                  onChange={handleEndTimeChange}
                  disabled={!startTime}
                  className="w-full px-4 py-4 bg-gray-700/50 backdrop-blur-sm border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-white text-lg transition-all duration-300 hover:border-orange-400 appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="" className="bg-gray-800">Select end time</option>
                  {filteredEndTimes.map(slot => (
                    <option key={slot.id} value={slot.time} disabled={!slot.isAvailable} className="bg-gray-800">
                      {slot.time}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/5 to-orange-500/0 opacity-0 hover:opacity-100 rounded-xl transition-opacity duration-300 pointer-events-none" />
              </div>
            </div>
          </div>
          
          {/* Booking Summary */}
          {startTime && endTime && (
            <div className="mt-8 p-6 bg-gradient-to-br from-orange-500/10 to-amber-500/10 backdrop-blur-sm rounded-2xl border border-orange-500/20 relative overflow-hidden">
              {/* Background Animation */}
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-amber-500/5 animate-pulse" />
              </div>
              
              <div className="relative z-10">
                <h3 className="font-bold text-orange-300 flex items-center mb-4 text-xl">
                  <Sparkles className="h-5 w-5 mr-2 animate-spin-slow" />
                  Booking Summary
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 font-medium">Experience:</span>
                      <span className="text-white font-bold">{selectedMembershipTier}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 font-medium">Duration:</span>
                      <span className="text-white font-bold">{duration} hours</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 font-medium">Workspace:</span>
                      <span className="text-white font-bold flex items-center">
                        {selectedDesk?.type === 'individual' ? (
                          <Monitor className="w-4 h-4 mr-1" />
                        ) : (
                          <Users className="w-4 h-4 mr-1" />
                        )}
                        {selectedDesk?.name}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mb-2 mx-auto animate-pulse">
                        <CheckCircle className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-orange-200 font-medium">Ready to book!</p>
                    </div>
                  </div>
                </div>
                
                {duration > 3 && (
                  <div className="mt-4 p-3 bg-green-500/20 border border-green-500/30 rounded-xl">
                    <div className="flex items-center text-green-300">
                      <Zap className="w-4 h-4 mr-2" />
                      <span className="font-medium">Extended session bonus: Enhanced amenities included!</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-gray-800/50 px-8 py-6 border-t border-gray-700 relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-amber-500/5" />
        
        <button
          onClick={handleBooking}
          disabled={!canBook || isProcessing}
          className={`relative w-full py-4 px-6 rounded-2xl shadow-lg text-lg font-bold transition-all duration-300 flex items-center justify-center ${
            canBook && !isProcessing
              ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 transform hover:scale-105 hover:-rotate-1 shadow-orange-500/25'
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isProcessing ? (
            <span className="flex items-center">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
              Processing your booking...
            </span>
          ) : (
            <span className="flex items-center">
              <Zap className="w-5 h-5 mr-2 animate-pulse" />
              Confirm Booking
              <CheckCircle className="w-5 h-5 ml-2" />
            </span>
          )}
        </button>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default BookingForm;
