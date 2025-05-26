import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import RevenueDashboard from '../components/dashboard/RevenueDashboard';
import { BarChart3, TrendingUp, Sparkles, Users, Calendar, Zap } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [dashboardStats, setDashboardStats] = useState({
    totalBookings: 0,
    activeUsers: 0,
    occupancyRate: 0,
    popularTimeSlot: '',
  });

  useEffect(() => {
    setIsVisible(true);
    
    // Calculate dashboard stats from localStorage
    try {
      const storedBookings = localStorage.getItem('demoBookings');
      if (storedBookings) {
        const bookings = JSON.parse(storedBookings);
        
        // Calculate occupancy rate (mock calculation)
        const totalSlots = 15 * 12; // 15 desks * 12 hours
        const occupiedSlots = bookings.reduce((sum: number, booking: any) => 
          sum + booking.duration, 0
        );
        const occupancyRate = Math.min((occupiedSlots / totalSlots) * 100, 100);
        
        // Find most popular time slot
        const timeSlotCounts: { [key: string]: number } = {};
        bookings.forEach((booking: any) => {
          const hour = parseInt(booking.startTime.split(':')[0]);
          const timeSlot = `${hour}:00`;
          timeSlotCounts[timeSlot] = (timeSlotCounts[timeSlot] || 0) + 1;
        });
        
        const popularTimeSlot = Object.keys(timeSlotCounts).reduce((a, b) => 
          timeSlotCounts[a] > timeSlotCounts[b] ? a : b, '9:00'
        );
        
        setDashboardStats({
          totalBookings: bookings.length,
          activeUsers: Math.max(bookings.length, 8), // Mock active users
          occupancyRate: Math.round(occupancyRate),
          popularTimeSlot,
        });
      }
    } catch (error) {
      console.error('Error calculating dashboard stats:', error);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Header />
      
      {/* Hero Section */}
      <div className="pt-24 pb-12 bg-gradient-to-r from-orange-900/50 to-amber-900/50 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-orange-400 rounded-full animate-float opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.15}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <div className="text-center mb-12">
                <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500/20 to-amber-500/20 backdrop-blur-sm rounded-full border border-orange-500/30 mb-8">
                  <BarChart3 className="w-5 h-5 text-orange-400 mr-2 animate-pulse" />
                  <span className="text-orange-300 font-medium">Workspace Analytics</span>
                </div>

                <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
                  Analytics <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">Dashboard</span>
                </h1>
                <p className="text-xl text-gray-300 mb-8">
                  Real-time insights into workspace performance and user engagement
                </p>
              </div>

              {/* Key Metrics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {[
                  { 
                    icon: Calendar, 
                    value: dashboardStats.totalBookings.toString(), 
                    label: 'Total Bookings',
                    change: '+12%',
                    color: 'from-blue-500 to-blue-600',
                    bgColor: 'from-blue-500/20 to-blue-600/20',
                    borderColor: 'border-blue-500/30'
                  },
                  { 
                    icon: Users, 
                    value: dashboardStats.activeUsers.toString(), 
                    label: 'Active Users',
                    change: '+8%',
                    color: 'from-green-500 to-green-600',
                    bgColor: 'from-green-500/20 to-green-600/20',
                    borderColor: 'border-green-500/30'
                  },
                  { 
                    icon: TrendingUp, 
                    value: `${dashboardStats.occupancyRate}%`, 
                    label: 'Occupancy Rate',
                    change: '+5%',
                    color: 'from-orange-500 to-amber-500',
                    bgColor: 'from-orange-500/20 to-amber-500/20',
                    borderColor: 'border-orange-500/30'
                  },
                  { 
                    icon: Zap, 
                    value: dashboardStats.popularTimeSlot, 
                    label: 'Peak Hour',
                    change: 'Popular',
                    color: 'from-purple-500 to-purple-600',
                    bgColor: 'from-purple-500/20 to-purple-600/20',
                    borderColor: 'border-purple-500/30'
                  },
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
                        <div className={`w-14 h-14 bg-gradient-to-br ${metric.color} rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
                          <metric.icon className="w-7 h-7 text-white" />
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                          metric.change.startsWith('+') 
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                            : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        }`}>
                          {metric.change}
                        </div>
                      </div>
                      
                      <div className="text-3xl font-black text-white mb-2 group-hover:text-orange-300 transition-colors duration-300">
                        {metric.value}
                      </div>
                      <div className="text-gray-300 font-medium">{metric.label}</div>
                    </div>
                    
                    {/* Hover Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-3xl" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Dashboard Content Header */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-700 mb-6">
              <Sparkles className="w-5 h-5 text-orange-400 mr-2 animate-spin-slow" />
              <span className="text-white font-medium">Detailed Analytics</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Comprehensive <span className="text-orange-400">Insights</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Dive deep into booking patterns, user behavior, and workspace utilization metrics
            </p>
          </div>
          
          <RevenueDashboard />
          
          {/* Additional Insights Section */}
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Booking Trends */}
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-700 relative overflow-hidden">
              <div className="absolute inset-0">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-blue-400 rounded-full animate-float opacity-20"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${i * 0.3}s`,
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
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                    <span className="text-gray-300">Peak booking hours</span>
                    <span className="text-blue-400 font-bold">9AM - 11AM</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                    <span className="text-gray-300">Average session length</span>
                    <span className="text-green-400 font-bold">3.2 hours</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                    <span className="text-gray-300">Most popular desk type</span>
                    <span className="text-orange-400 font-bold">Individual</span>
                  </div>
                </div>
              </div>
            </div>

            {/* User Insights */}
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-700 relative overflow-hidden">
              <div className="absolute inset-0">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-orange-400 rounded-full animate-float opacity-20"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${i * 0.3}s`,
                    }}
                  />
                ))}
              </div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center mr-3">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  User Insights
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                    <span className="text-gray-300">New users this month</span>
                    <span className="text-green-400 font-bold">+24</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                    <span className="text-gray-300">Return user rate</span>
                    <span className="text-blue-400 font-bold">78%</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                    <span className="text-gray-300">Average bookings per user</span>
                    <span className="text-orange-400 font-bold">4.1</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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

export default DashboardPage;
