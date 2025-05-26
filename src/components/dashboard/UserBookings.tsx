import React, { useState, useEffect } from 'react';
import { useBooking } from '../../context/BookingContext';
import { Calendar, Clock, Trash2, Monitor, Users, Sparkles, CheckCircle, Zap, MapPin } from 'lucide-react';

const UserBookings: React.FC = () => {
  const { cancelBooking } = useBooking();
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [userBookings, setUserBookings] = useState<any[]>([]);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');

  useEffect(() => {
    loadBookingsFromStorage();
  }, []);

  const loadBookingsFromStorage = () => {
    try {
      const storedBookings = localStorage.getItem('demoBookings');
      if (storedBookings) {
        const bookings = JSON.parse(storedBookings);
        setUserBookings(bookings);
      }
    } catch (error) {
      console.error('Error loading bookings:', error);
      setUserBookings([]);
    }
  };
  
  // Group bookings by date
  const filteredBookings = userBookings.filter(booking => {
    if (filter === 'all') return true;
    
    const bookingDate = new Date(booking.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (filter === 'upcoming') {
      return bookingDate >= today;
    } else {
      return bookingDate < today;
    }
  });

  const bookingsByDate = filteredBookings.reduce((acc, booking) => {
    if (!acc[booking.date]) {
      acc[booking.date] = [];
    }
    acc[booking.date].push(booking);
    return acc;
  }, {} as Record<string, typeof userBookings>);
  
  // Sort dates in ascending order
  const sortedDates = Object.keys(bookingsByDate).sort((a, b) => {
    return new Date(a).getTime() - new Date(b).getTime();
  });
  
  const handleCancelBooking = async (bookingId: string) => {
    setCancellingId(bookingId);
    try {
      // Remove from localStorage
      const storedBookings = localStorage.getItem('demoBookings');
      if (storedBookings) {
        const bookings = JSON.parse(storedBookings);
        const updatedBookings = bookings.filter((b: any) => b.id !== bookingId);
        localStorage.setItem('demoBookings', JSON.stringify(updatedBookings));
        setUserBookings(updatedBookings);
      }
      
      // Also update context
      cancelBooking(bookingId);
    } finally {
      setCancellingId(null);
    }
  };
  
  const isPastBooking = (date: string) => {
    const bookingDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return bookingDate < today;
  };

  if (userBookings.length === 0) {
    return (
      <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-3xl border border-gray-700 overflow-hidden shadow-2xl p-12 text-center relative">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-orange-400 rounded-full animate-float opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10">
          <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-amber-500 rounded-3xl flex items-center justify-center mx-auto mb-8 animate-pulse">
            <Calendar className="h-12 w-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Your Workspace Journey Awaits</h2>
          <p className="text-gray-300 mb-8 text-lg max-w-md mx-auto">
            You haven't made any bookings yet. Start your productivity journey today!
          </p>
          <a 
            href="/booking"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-orange-500/25 transform hover:scale-105 hover:-rotate-1 transition-all duration-300"
          >
            <Zap className="mr-2 w-5 h-5 animate-pulse" />
            Book Your First Space
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Filter Tabs */}
      <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl p-2 border border-gray-700 inline-flex">
        {[
          { key: 'all', label: 'All Bookings', count: userBookings.length },
          { key: 'upcoming', label: 'Upcoming', count: userBookings.filter(b => !isPastBooking(b.date)).length },
          { key: 'past', label: 'Past', count: userBookings.filter(b => isPastBooking(b.date)).length },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key as any)}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center ${
              filter === tab.key
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg transform scale-105'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {tab.label}
            <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
              filter === tab.key 
                ? 'bg-white/20' 
                : 'bg-gray-700'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Bookings List */}
      <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-3xl border border-gray-700 overflow-hidden shadow-2xl">
        <div className="bg-gradient-to-r from-orange-500/20 to-amber-500/20 p-8 border-b border-orange-500/20 relative overflow-hidden">
          {/* Background Animation */}
          <div className="absolute inset-0">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-orange-400 rounded-full animate-float opacity-30"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>
          
          <div className="flex items-center relative z-10">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center mr-4">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Your Reservations</h2>
              <p className="text-orange-200">Manage and track your workspace bookings</p>
            </div>
          </div>
        </div>
        
        <div className="divide-y divide-gray-700">
          {sortedDates.map(date => (
            <div key={date} className="p-8 relative group hover:bg-white/5 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    {new Date(date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </h3>
                  {isPastBooking(date) && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-600/50 text-gray-300 border border-gray-600">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Completed
                    </span>
                  )}
                </div>
              </div>
              
              <div className="space-y-4">
                {bookingsByDate[date].map((booking: any, index: number) => {
                  const isPast = isPastBooking(date);
                  const isTeamDesk = booking.deskId > 10;
                  
                  return (
                    <div 
                      key={booking.id} 
                      className={`group/booking relative bg-gradient-to-br backdrop-blur-sm rounded-2xl p-6 border transition-all duration-500 hover:scale-105 hover:-rotate-1 ${
                        isPast 
                          ? 'from-gray-700/30 to-gray-800/30 border-gray-600/50' 
                          : 'from-blue-500/10 to-teal-500/10 border-blue-500/30 hover:border-blue-400/50'
                      }`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {/* Glow Effect */}
                      <div className={`absolute inset-0 ${
                        isPast 
                          ? 'bg-gradient-to-br from-gray-600/5 to-gray-700/5' 
                          : 'bg-gradient-to-br from-blue-500/10 to-teal-500/10'
                      } opacity-0 group-hover/booking:opacity-100 rounded-2xl transition-opacity duration-300`} />
                      
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 transition-all duration-300 group-hover/booking:scale-110 group-hover/booking:rotate-12 ${
                              isTeamDesk 
                                ? 'bg-gradient-to-br from-teal-500 to-teal-600' 
                                : 'bg-gradient-to-br from-blue-500 to-blue-600'
                            }`}>
                              {isTeamDesk ? (
                                <Users className="w-6 h-6 text-white" />
                              ) : (
                                <Monitor className="w-6 h-6 text-white" />
                              )}
                            </div>
                            <div>
                              <h4 className="text-lg font-bold text-white mb-1">
                                Desk {booking.deskId}
                              </h4>
                              <p className="text-gray-400 text-sm">
                                {isTeamDesk ? 'Team Collaboration Space' : 'Individual Workspace'}
                              </p>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className={`text-lg font-bold mb-1 ${isPast ? 'text-gray-400' : 'text-blue-400'}`}>
                              {booking.startTime} - {booking.endTime}
                            </div>
                            <div className="text-gray-500 text-sm">
                              {booking.duration} hours
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                          <div className="flex items-center text-gray-300">
                            <Clock className="w-4 h-4 mr-2 text-orange-400" />
                            <span className="text-sm">{booking.duration}h session</span>
                          </div>
                          
                          <div className="flex items-center text-gray-300">
                            <MapPin className="w-4 h-4 mr-2 text-teal-400" />
                            <span className="text-sm">{booking.membershipTier} Experience</span>
                          </div>
                          
                          <div className="flex items-center text-gray-300">
                            <Sparkles className="w-4 h-4 mr-2 text-amber-400" />
                            <span className="text-sm">
                              {booking.duration > 3 ? 'Extended session' : 'Standard session'}
                            </span>
                          </div>
                          
                          <div className="flex justify-end">
                            {!isPast && (
                              <button
                                onClick={() => handleCancelBooking(booking.id)}
                                disabled={cancellingId === booking.id}
                                className="group/button flex items-center px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 rounded-xl border border-red-500/30 hover:border-red-400/50 transition-all duration-300 hover:scale-105"
                              >
                                {cancellingId === booking.id ? (
                                  <>
                                    <div className="w-4 h-4 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin mr-2" />
                                    <span className="text-sm">Cancelling...</span>
                                  </>
                                ) : (
                                  <>
                                    <Trash2 className="h-4 w-4 mr-2 group-hover/button:scale-110 transition-transform duration-200" />
                                    <span className="text-sm font-medium">Cancel</span>
                                  </>
                                )}
                              </button>
                            )}
                            
                            {isPast && (
                              <div className="flex items-center px-4 py-2 bg-green-500/20 text-green-400 rounded-xl border border-green-500/30">
                                <CheckCircle className="h-4 w-4 mr-2" />
                                <span className="text-sm font-medium">Completed</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Hover Shine Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -translate-x-full group-hover/booking:translate-x-full transition-transform duration-1000 rounded-2xl" />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default UserBookings;
