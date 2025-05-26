import React, { useMemo } from 'react';
import { useBooking } from '../../context/BookingContext';
import { DollarSign, Users, TrendingUp, BarChart } from 'lucide-react';

const RevenueDashboard: React.FC = () => {
  const { bookings } = useBooking();
  
  const data = useMemo(() => {
    // Early return if no bookings to prevent unnecessary calculations
    if (!bookings || bookings.length === 0) {
      return {
        totalRevenue: 0,
        revenueByTier: {},
        bookingsByDeskType: { individual: 0, team: 0 },
        chartData: [],
      };
    }

    // Calculate total revenue
    const totalRevenue = bookings.reduce((sum, booking) => sum + booking.totalPrice, 0);
    
    // Calculate revenue by membership tier
    const revenueByTier = bookings.reduce((acc, booking) => {
      acc[booking.membershipTier] = (acc[booking.membershipTier] || 0) + booking.totalPrice;
      return acc;
    }, {} as Record<string, number>);
    
    // Calculate bookings count by desk type
    const bookingsByDeskType = bookings.reduce((acc, booking) => {
      const deskType = booking.deskId > 10 ? 'team' : 'individual';
      acc[deskType] = (acc[deskType] || 0) + 1;
      return acc;
    }, { individual: 0, team: 0 } as Record<string, number>);
    
    // Calculate revenue by date (limit to last 7 days for performance)
    const revenueByDate = bookings.reduce((acc, booking) => {
      acc[booking.date] = (acc[booking.date] || 0) + booking.totalPrice;
      return acc;
    }, {} as Record<string, number>);
    
    // Sort dates and get top 7
    const sortedDates = Object.keys(revenueByDate)
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
      .slice(-7);
    
    const chartData = sortedDates.map(date => ({
      date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      revenue: revenueByDate[date],
    }));
    
    return {
      totalRevenue,
      revenueByTier,
      bookingsByDeskType,
      chartData,
    };
  }, [bookings]);
  
  const maxRevenue = useMemo(() => 
    Math.max(...data.chartData.map(d => d.revenue), 0), 
    [data.chartData]
  );

  // Helper function to get percentage
  const getPercentage = (value: number, total: number) => {
    return total > 0 ? (value / total) * 100 : 0;
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-700">Total Revenue</h3>
            <div className="rounded-full bg-blue-100 p-2">
              <DollarSign className="h-5 w-5 text-blue-600" />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-800">${data.totalRevenue.toFixed(2)}</div>
          <div className="mt-1 text-sm text-gray-500">All time earnings</div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-700">Bookings</h3>
            <div className="rounded-full bg-teal-100 p-2">
              <Users className="h-5 w-5 text-teal-600" />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-800">{bookings.length}</div>
          <div className="mt-1 text-sm text-gray-500">Total reservations</div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-700">Individual Desks</h3>
            <div className="rounded-full bg-amber-100 p-2">
              <TrendingUp className="h-5 w-5 text-amber-600" />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-800">{data.bookingsByDeskType.individual}</div>
          <div className="mt-1 text-sm text-gray-500">Individual desk bookings</div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-700">Team Spaces</h3>
            <div className="rounded-full bg-purple-100 p-2">
              <BarChart className="h-5 w-5 text-purple-600" />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-800">{data.bookingsByDeskType.team}</div>
          <div className="mt-1 text-sm text-gray-500">Team space bookings</div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Revenue Trend</h3>
          
          {data.chartData.length > 0 ? (
            <div className="h-64 flex items-end space-x-2">
              {data.chartData.map((item, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div 
                    className="w-full bg-blue-500 rounded-t-sm hover:bg-blue-600 transition-all cursor-pointer relative group"
                    style={{ 
                      height: `${maxRevenue > 0 ? (item.revenue / maxRevenue) * 100 : 0}%`,
                      minHeight: '4px'
                    }}
                  >
                    <div className="opacity-0 group-hover:opacity-100 absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap transition-opacity">
                      ${item.revenue.toFixed(2)}
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 mt-1 whitespace-nowrap overflow-hidden text-ellipsis w-full text-center">
                    {item.date}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 bg-gray-50 rounded-md border border-gray-200">
              <p className="text-gray-500">No revenue data available</p>
            </div>
          )}
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Revenue by Membership</h3>
          
          <div className="space-y-4">
            {['Basic', 'Premium', 'Executive'].map((tier) => {
              const revenue = data.revenueByTier[tier] || 0;
              const percentage = getPercentage(revenue, data.totalRevenue);
              
              return (
                <div key={tier}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-600">{tier}</span>
                    <span className="text-sm font-medium text-gray-800">
                      ${revenue.toFixed(2)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        tier === 'Basic' ? 'bg-blue-600' :
                        tier === 'Premium' ? 'bg-teal-600' : 'bg-amber-600'
                      }`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {bookings.length > 0 && (
            <div className="mt-6 pt-4 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Desk Type Distribution</h4>
              
              <div className="flex items-center justify-center">
                <div className="w-32 h-32 relative">
                  <svg viewBox="0 0 36 36" className="w-full h-full">
                    <circle 
                      cx="18" 
                      cy="18" 
                      r="16" 
                      fill="none" 
                      stroke="#ddd" 
                      strokeWidth="2" 
                    />
                    
                    {/* Individual desks */}
                    <circle 
                      cx="18" 
                      cy="18" 
                      r="16" 
                      fill="none" 
                      stroke="#3B82F6" 
                      strokeWidth="4" 
                      strokeDasharray={`${getPercentage(data.bookingsByDeskType.individual, bookings.length)} 100`}
                      strokeDashoffset="25" 
                      strokeLinecap="round"
                    />
                    
                    {/* Team desks */}
                    <circle 
                      cx="18" 
                      cy="18" 
                      r="16" 
                      fill="none" 
                      stroke="#0D9488" 
                      strokeWidth="4" 
                      strokeDasharray={`${getPercentage(data.bookingsByDeskType.team, bookings.length)} 100`}
                      strokeDashoffset={`${100 - getPercentage(data.bookingsByDeskType.individual, bookings.length) + 25}`}
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
              
              <div className="flex justify-center space-x-6 mt-4">
                <div className="flex items-center">
                  <div className="h-3 w-3 bg-blue-500 rounded-full mr-1"></div>
                  <span className="text-xs text-gray-600">Individual</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 bg-teal-500 rounded-full mr-1"></div>
                  <span className="text-xs text-gray-600">Team</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RevenueDashboard;
