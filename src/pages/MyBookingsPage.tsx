import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import UserBookings from '../components/dashboard/UserBookings';
import { Calendar, Zap, Sparkles, Users, TrendingUp } from 'lucide-react';

const MyBookingsPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [stats, setStats] = useState({
    totalBookings: 0,
    upcomingBookings: 0,
    hoursBooked: 0,
  });

  useEffect(() => {
    setIsVisible(true);
    
    // Calculate stats from localStorage
    try {
      const storedBookings = localStorage.getItem('demoBookings');
      if (storedBookings) {
        const bookings = JSON.parse(storedBookings);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const upcoming = bookings.filter((booking: any) => 
          new Date(booking.date) >= today
        );
        
        const totalHours = bookings.reduce((sum: number, booking: any) => 
          sum + booking.duration, 0
        );
        
        setStats({
          totalBookings: bookings.length,
          upcomingBookings: upcoming.length,
          hoursBooked: totalHours,
        });
      }
    } catch (error) {
      console.error('Error calculating stats:', error);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Header />
      
      {/* Hero Section */}
      <div className="pt-24 pb-12 bg-gradient-to-r from-orange-900/50 to-amber-900/50 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-orange-400 rounded-full animate-float opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500/20 to-amber-500/20 backdrop-blur-sm rounded-full border border-orange-500/30 mb-8">
                <Calendar className="w-5 h-5 text-orange-400 mr-2 animate-pulse" />
                <span className="text-orange-300 font-medium">Your Workspace Journey</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
                My <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">Bookings</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Manage your workspace reservations and track your productivity journey
              </p>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                {[
                  { 
                    icon: Calendar, 
                    value: stats.totalBookings.toString(), 
                    label: 'Total Bookings', 
                    color: 'from-blue-500 to-blue-600',
                    bgColor: 'from-blue-500/20 to-blue-600/20',
                    borderColor: 'border-blue-500/30'
                  },
                  { 
                    icon: TrendingUp, 
                    value: stats.upcomingBookings.toString(), 
                    label: 'Upcoming', 
                    color: 'from-green-500 to-green-600',
                    bgColor: 'from-green-500/20 to-green-600/20',
                    borderColor: 'border-green-500/30'
                  },
                  { 
                    icon: Users, 
                    value: `${stats.hoursBooked}h`, 
                    label: 'Hours Booked', 
                    color: 'from-orange-500 to-amber-500',
                    bgColor: 'from-orange-500/20 to-amber-500/20',
                    borderColor: 'border-orange-500/30'
                  },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className={`group bg-gradient-to-br ${stat.bgColor} backdrop-blur-sm rounded-2xl p-6 border ${stat.borderColor} hover:border-opacity-60 transform hover:scale-105 hover:-rotate-1 transition-all duration-500`}
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-gray-300 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <UserBookings />
          
          {/* CTA Section */}
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-700 relative overflow-hidden">
              {/* Background Animation */}
              <div className="absolute inset-0">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-orange-400 rounded-full animate-float opacity-20"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${i * 0.3}s`,
                    }}
                  />
                ))}
              </div>

              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4">Ready for Your Next Session?</h3>
                <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                  Discover new workspaces, unlock premium features, and boost your productivity with our cutting-edge facilities.
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <a
                    href="/booking"
                    className="group px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-orange-500/25 transform hover:scale-105 hover:-rotate-1 transition-all duration-300 flex items-center justify-center"
                  >
                    <Zap className="mr-2 w-5 h-5 animate-pulse" />
                    Book New Workspace
                    <div className="ml-2 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </a>
                  
                  <a
                    href="/"
                    className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-2xl border border-white/20 hover:bg-white/20 hover:border-orange-400/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
                  >
                    <Calendar className="mr-2 w-5 h-5" />
                    Explore Features
                  </a>
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
      `}</style>
    </div>
  );
};

export default MyBookingsPage;
