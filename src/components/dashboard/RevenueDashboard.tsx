import React, { useMemo, useState, useEffect } from 'react';
import { useBooking } from '../../context/BookingContext';
import { Users, TrendingUp, BarChart, Calendar, Monitor, Coffee, Zap, Sparkles } from 'lucide-react';

const RevenueDashboard: React.FC = () => {
  const { bookings } = useBooking();
  const [demoBookings, setDemoBookings] = useState<any[]>([]);
  
  useEffect(() => {
    // Load additional demo data from localStorage
    try {
      const storedBookings = localStorage.getItem('demoBookings');
      if (storedBookings) {
        setDemoBookings(JSON.parse(storedBookings));
      }
    } catch (error) {
      console.error('Error loading demo bookings:', error);
    }
  }, []);

  const allBookings = [...bookings, ...demoBookings];
  
  const data = useMemo(() => {
    // Early return if no bookings to prevent unnecessary calculations
    if (!allBookings || allBookings.length === 0) {
      return {
        totalBookings: 0,
        bookingsByTier: {},
        bookingsByDeskType: { individual: 0, team: 0 },
        chartData: [],
        averageSessionLength: 0,
        popularTimeSlots: {},
        userEngagement: 0,
      };
    }

    // Calculate total bookings
    const totalBookings = allBookings.length;
    
    // Calculate bookings by membership tier
    const bookingsByTier = allBookings.reduce((acc, booking) => {
      acc[booking.membershipTier] = (acc[booking.membershipTier] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    // Calculate bookings count by desk type
    const bookingsByDeskType = allBookings.reduce((acc, booking) => {
      const deskType = booking.deskId > 10 ? 'team' : 'individual';
      acc[deskType] = (acc[deskType] || 0) + 1;
      return acc;
    }, { individual: 0, team: 0 } as Record<string, number>);
    
    // Calculate bookings by date (limit to last 7 days for performance)
    const bookingsByDate = allBookings.reduce((acc, booking) => {
      acc[booking.date] = (acc[booking.date] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    // Sort dates and get top 7
    const sortedDates = Object.keys(bookingsByDate)
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
      .slice(-7);
    
    const chartData = sortedDates.map(date => ({
      date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      bookings: bookingsByDate[date],
    }));

    // Calculate average session length
    const averageSessionLength = allBookings.reduce((sum, booking) => sum + booking.duration, 0) / allBookings.length;

    // Calculate popular time slots
    const popularTimeSlots = allBookings.reduce((acc, booking) => {
      const hour = parseInt(booking.startTime.split(':')[0]);
      const timeSlot = `${hour}:00`;
      acc[timeSlot] = (acc[timeSlot] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Calculate user engagement (mock metric based on bookings)
    const userEngagement = Math.min(Math.round((totalBookings / 30) * 100), 100); // Mock calculation
    
    return {
      totalBookings,
      bookingsByTier,
      bookingsByDeskType,
      chartData,
      averageSessionLength: Math.round(averageSessionLength * 10) / 10,
      popularTimeSlots,
      userEngagement,
    };
  }, [allBookings]);
  
  const maxBookings = useMemo(() => 
    Math.max(...data.chartData.map(d => d.bookings), 0), 
    [data.chartData]
  );

  // Helper function to get percentage
  const getPercentage = (value: number, total: number) => {
    return total > 0 ? (value / total) * 100 : 0;
  };

  // Get most popular time slot
  const mostPopularTimeSlot = Object.keys(data.popularTimeSlots).reduce((a, b) => 
    data.popularTimeSlots[a] > data.popularTimeSlots[b] ? a : b, '9:00'
  );
  
  return (
    <div className="space-y-8">
      {/* Main Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: 'Total Bookings',
            value: data.totalBookings.toString(),
            subtitle: 'All time reservations',
            icon: Calendar,
            color: 'from-blue-500 to-blue-600',
            bgColor: 'from-blue-500/20 to-blue-600/20',
            borderColor: 'border-blue-500/30'
          },
          {
            title: 'Active Sessions',
            value: data.bookingsByDeskType.individual + data.bookingsByDeskType.team,
            subtitle: 'Current workspace usage',
            icon: Users,
            color: 'from-teal-500 to-teal-600',
            bgColor: 'from-teal-500/20 to-teal-600/20',
            borderColor: 'border-teal-500/30'
          },
          {
            title: 'Individual Desks',
            value: data.bookingsByDeskType.individual.toString(),
            subtitle: 'Solo workspace bookings',
            icon: Monitor,
            color: 'from-amber-500 to-orange-500',
            bgColor: 'from-amber-500/20 to-orange-500/20',
            borderColor: 'border-amber-500/30'
          },
          {
            title: 'Team Spaces',
            value: data.bookingsByDeskType.team.toString(),
            subtitle: 'Collaboration bookings',
            icon: Coffee,
            color: 'from-purple-500 to-purple-600',
            bgColor: 'from-purple-500/20 to-purple-600/20',
            borderColor: 'border-purple-500/30'
          }
        ].map((metric, index) => (
          <div 
            key={index}
            className={`group bg-gradient-to-br ${metric.bgColor} backdrop-blur-sm rounded-3xl p-8 border ${metric.borderColor} hover:border-opacity-80 transform hover:scale-105 hover:-rotate-1 transition-all duration-500 relative overflow-hidden`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Background Glow */}
            <div className={`absolute inset-0 bg-gradient-to-br ${metric.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`} />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-300 group-hover:text-white transition-colors duration-300">
                  {metric.title}
                </h3>
                <div className={`w-12 h-12 bg-gradient-to-br ${metric.color} rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
                  <metric.icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="text-3xl font-black text-white mb-2 group-hover:text-orange-300 transition-colors duration-300">
                {typeof metric.value === 'string' ? metric.value : metric.value.toString()}
              </div>
              <div className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                {metric.subtitle}
              </div>
            </div>
            
            {/* Hover Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-3xl" />
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Booking Trends Chart */}
        <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-700 lg:col-span-2 relative overflow-hidden">
          {/* Background Animation */}
          <div className="absolute inset-0">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-blue-400 rounded-full animate-float opacity-20"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>

          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-3">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              Booking Trends
            </h3>
            
            {data.chartData.length > 0 ? (
              <div className="h-64 flex items-end space-x-3">
                {data.chartData.map((item, index) => (
                  <div key={index} className="flex flex-col items-center flex-1 group">
                    <div 
                      className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg hover:from-orange-500 hover:to-amber-400 transition-all duration-500 cursor-pointer relative"
                      style={{ 
                        height: `${maxBookings > 0 ? (item.bookings / maxBookings) * 100 : 0}%`,
                        minHeight: '8px'
                      }}
                    >
                      <div className="opacity-0 group-hover:opacity-100 absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-2 px-3 rounded-lg whitespace-nowrap transition-opacity duration-300 border border-blue-500/30">
                        {item.bookings} bookings
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45 border-r border-b border-blue-500/30" />
                      </div>
                    </div>
                    <div className="text-xs text-gray-400 mt-2 whitespace-nowrap overflow-hidden text-ellipsis w-full text-center group-hover:text-white transition-colors duration-300">
                      {item.date}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 bg-gray-800/50 rounded-2xl border border-gray-700">
                <div className="text-center">
                  <BarChart className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-400">No booking data available</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Analytics Summary */}
        <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-700 relative overflow-hidden">
          {/* Background Animation */}
          <div className="absolute inset-0">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-orange-400 rounded-full animate-float opacity-20"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.25}s`,
                }}
              />
            ))}
          </div>

          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center mr-3">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              Usage Analytics
            </h3>
            
            <div className="space-y-6">
              {/* Experience Distribution */}
              <div>
                <h4 className="text-lg font-semibold text-gray-300 mb-4">Experience Distribution</h4>
                <div className="space-y-3">
                  {['Basic', 'Premium', 'Executive'].map((tier) => {
                    const count = data.bookingsByTier[tier] || 0;
                    const percentage = getPercentage(count, data.totalBookings);
                    
                    return (
                      <div key={tier} className="group">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors duration-300">
                            {tier}
                          </span>
                          <span className="text-sm font-bold text-white">
                            {count} bookings
                          </span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                          <div 
                            className={`h-3 rounded-full transition-all duration-500 ${
                              tier === 'Basic' ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                              tier === 'Premium' ? 'bg-gradient-to-r from-teal-500 to-teal-600' : 
                              'bg-gradient-to-r from-amber-500 to-orange-500'
                            }`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Key Metrics */}
              <div className="space-y-4 pt-6 border-t border-gray-700">
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/10 hover:border-orange-500/30 transition-all duration-300">
                  <span className="text-gray-300">Avg. Session</span>
                  <span className="text-orange-400 font-bold">{data.averageSessionLength}h</span>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/10 hover:border-blue-500/30 transition-all duration-300">
                  <span className="text-gray-300">Peak Hour</span>
                  <span className="text-blue-400 font-bold">{mostPopularTimeSlot}</span>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/10 hover:border-green-500/30 transition-all duration-300">
                  <span className="text-gray-300">Engagement</span>
                  <span className="text-green-400 font-bold">{data.userEngagement}%</span>
                </div>
              </div>

              {/* Workspace Distribution Pie */}
              {allBookings.length > 0 && (
                <div className="pt-6 border-t border-gray-700">
                  <h4 className="text-lg font-semibold text-gray-300 mb-6 text-center">Workspace Distribution</h4>
                  
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-32 h-32 relative">
                      <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                        <circle 
                          cx="18" 
                          cy="18" 
                          r="16" 
                          fill="none" 
                          stroke="#374151" 
                          strokeWidth="3" 
                        />
                        
                        {/* Individual desks */}
                        <circle 
                          cx="18" 
                          cy="18" 
                          r="16" 
                          fill="none" 
                          stroke="url(#individualGradient)" 
                          strokeWidth="4" 
                          strokeDasharray={`${getPercentage(data.bookingsByDeskType.individual, data.totalBookings)} 100`}
                          strokeDashoffset="0" 
                          strokeLinecap="round"
                          className="animate-pulse"
                        />
                        
                        {/* Team desks */}
                        <circle 
                          cx="18" 
                          cy="18" 
                          r="16" 
                          fill="none" 
                          stroke="url(#teamGradient)" 
                          strokeWidth="4" 
                          strokeDasharray={`${getPercentage(data.bookingsByDeskType.team, data.totalBookings)} 100`}
                          strokeDashoffset={`${-(getPercentage(data.bookingsByDeskType.individual, data.totalBookings))}`}
                          strokeLinecap="round"
                          className="animate-pulse"
                        />
                        
                        <defs>
                          <linearGradient id="individualGradient">
                            <stop offset="0%" stopColor="#3B82F6" />
                            <stop offset="100%" stopColor="#1D4ED8" />
                          </linearGradient>
                          <linearGradient id="teamGradient">
                            <stop offset="0%" stopColor="#10B981" />
                            <stop offset="100%" stopColor="#059669" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>
                  
                  <div className="flex justify-center space-x-6">
                    <div className="flex items-center">
                      <div className="h-3 w-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mr-2 animate-pulse" />
                      <span className="text-xs text-gray-400">Individual ({data.bookingsByDeskType.individual})</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-3 w-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full mr-2 animate-pulse" />
                      <span className="text-xs text-gray-400">Team ({data.bookingsByDeskType.team})</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
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

export default RevenueDashboard;
