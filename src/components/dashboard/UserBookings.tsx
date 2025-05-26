import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { useAuth } from '../../context/AuthContext';
import { Calendar, Clock, DollarSign, Trash2 } from 'lucide-react';

const UserBookings: React.FC = () => {
  const { currentUser } = useAuth();
  const { userBookings, cancelBooking } = useBooking();
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  
  // Group bookings by date
  const bookingsByDate = userBookings.reduce((acc, booking) => {
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
      <div className="bg-white rounded-lg shadow-md overflow-hidden p-6 text-center">
        <div className="rounded-full bg-blue-50 p-4 mx-auto w-16 h-16 flex items-center justify-center mb-4">
          <Calendar className="h-8 w-8 text-blue-500" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">No Bookings Found</h2>
        <p className="text-gray-600 mb-4">You haven't made any bookings yet.</p>
        <a 
          href="/booking"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Book a Desk Now
        </a>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">My Bookings</h2>
        <p className="text-gray-600 mt-1">Manage your workspace reservations</p>
      </div>
      
      <div className="divide-y divide-gray-200">
        {sortedDates.map(date => (
          <div key={date} className="p-6">
            <div className="flex items-center mb-3">
              <Calendar className="h-5 w-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-medium text-gray-800">
                {new Date(date).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </h3>
              {isPastBooking(date) && (
                <span className="ml-2 px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                  Past
                </span>
              )}
            </div>
            
            <div className="space-y-4">
              {bookingsByDate[date].map(booking => {
                const isPast = isPastBooking(date);
                
                return (
                  <div 
                    key={booking.id} 
                    className={`border rounded-lg overflow-hidden ${
                      isPast ? 'border-gray-200 bg-gray-50' : 'border-blue-200 bg-blue-50'
                    }`}
                  >
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium text-gray-800">
                          Desk {booking.deskId}
                        </div>
                        <div className={`text-sm font-medium ${isPast ? 'text-gray-500' : 'text-blue-600'}`}>
                          {booking.startTime} - {booking.endTime}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                        <div className="flex items-center text-gray-600">
                          <Clock className="h-4 w-4 mr-1" />
                          {booking.duration} hours
                        </div>
                        
                        <div className="flex items-center text-gray-600">
                          <DollarSign className="h-4 w-4 mr-1" />
                          ${booking.totalPrice.toFixed(2)}
                        </div>
                        
                        <div className="md:text-right">
                          {!isPast && (
                            <button
                              onClick={() => handleCancelBooking(booking.id)}
                              disabled={cancellingId === booking.id}
                              className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                            >
                              {cancellingId === booking.id ? (
                                <span>Cancelling...</span>
                              ) : (
                                <>
                                  <Trash2 className="h-3 w-3 mr-1" />
                                  Cancel
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserBookings;