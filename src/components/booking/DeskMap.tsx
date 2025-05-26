import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { Desk } from '../../types';
import { Monitor, Users, Zap, CheckCircle, Calendar, Sparkles, Wifi, Coffee } from 'lucide-react';

interface DeskMapProps {
  onSelectDesk: (desk: Desk) => void;
}

const DeskMap: React.FC<DeskMapProps> = ({ onSelectDesk }) => {
  const { desks, selectedDate, selectedStartTime, selectedEndTime, isDeskAvailable, setSelectedDesk } = useBooking();
  const [hoveredDesk, setHoveredDesk] = useState<number | null>(null);
  const [selectedDeskId, setSelectedDeskId] = useState<number | null>(null);

  const individualDesks = desks.filter(desk => desk.type === 'individual');
  const teamDesks = desks.filter(desk => desk.type === 'team');

  const handleDeskClick = (desk: Desk) => {
    if (getDeskAvailability(desk) === 'available') {
      setSelectedDesk(desk);
      setSelectedDeskId(desk.id);
      onSelectDesk(desk);
    }
  };

  const getDeskAvailability = (desk: Desk): 'available' | 'unavailable' | 'selected' => {
    if (selectedDeskId === desk.id) {
      return 'selected';
    }
    
    if (!selectedStartTime || !selectedEndTime) {
      return desk.isAvailable ? 'available' : 'unavailable';
    }
    
    if (!isDeskAvailable(desk.id, selectedDate, selectedStartTime, selectedEndTime)) {
      return 'unavailable';
    }
    
    return 'available';
  };

  const getDeskStyle = (desk: Desk, status: string) => {
    const baseClasses = "relative group cursor-pointer transform transition-all duration-300 hover:scale-110 hover:-rotate-2 rounded-2xl overflow-hidden shadow-lg";
    
    switch (status) {
      case 'available':
        return `${baseClasses} ${desk.type === 'individual' 
          ? 'bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-2 border-blue-400/50 hover:border-blue-300 hover:shadow-blue-500/30' 
          : 'bg-gradient-to-br from-teal-500/20 to-teal-600/20 border-2 border-teal-400/50 hover:border-teal-300 hover:shadow-teal-500/30'
        } backdrop-blur-sm hover:shadow-xl`;
      case 'selected':
        return `${baseClasses} bg-gradient-to-br from-orange-500/30 to-amber-500/30 border-2 border-orange-400 shadow-orange-500/50 ring-4 ring-orange-500/30`;
      default:
        return `${baseClasses} bg-gray-700/30 border-2 border-gray-600 opacity-50 cursor-not-allowed hover:scale-100 hover:rotate-0`;
    }
  };

  const getIconColor = (desk: Desk, status: string) => {
    switch (status) {
      case 'available':
        return desk.type === 'individual' ? 'text-blue-400' : 'text-teal-400';
      case 'selected':
        return 'text-orange-400';
      default:
        return 'text-gray-500';
    }
  };

  const getTextColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'text-white';
      case 'selected':
        return 'text-orange-300';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-3xl border border-gray-700 overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500/20 to-amber-500/20 p-8 border-b border-orange-500/20 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-orange-400 rounded-full animate-float opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mr-4 animate-pulse">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-1">Choose Your Workspace</h2>
              <p className="text-orange-200 text-lg">Select from our premium collection of workspaces</p>
            </div>
          </div>
          
          {selectedDate && (
            <div className="inline-flex items-center px-4 py-2 bg-orange-500/20 rounded-full border border-orange-500/30 backdrop-blur-sm">
              <Calendar className="w-4 h-4 text-orange-400 mr-2" />
              <span className="text-orange-200 font-medium">
                {new Date(selectedDate).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-8 space-y-12">
        {/* Individual Desks Section */}
        <div>
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mr-4 transform hover:rotate-12 transition-transform duration-300">
              <Monitor className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">Individual Workspaces</h3>
              <p className="text-gray-400">Perfect for focused, productive work sessions</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {individualDesks.map(desk => {
              const status = getDeskAvailability(desk);
              return (
                <div
                  key={desk.id}
                  onClick={() => handleDeskClick(desk)}
                  onMouseEnter={() => setHoveredDesk(desk.id)}
                  onMouseLeave={() => setHoveredDesk(null)}
                  className={getDeskStyle(desk, status)}
                >
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 ${
                    status === 'available' 
                      ? 'bg-gradient-to-br from-blue-500/10 to-blue-600/10' 
                      : status === 'selected'
                      ? 'bg-gradient-to-br from-orange-500/20 to-amber-500/20'
                      : 'bg-gray-700/10'
                  } opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  
                  {/* Content */}
                  <div className="relative p-6 text-center">
                    <div className={`w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center ${
                      status === 'available' 
                        ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
                        : status === 'selected'
                        ? 'bg-gradient-to-br from-orange-500 to-amber-500'
                        : 'bg-gray-600'
                    } transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-300`}>
                      <Monitor className={`w-6 h-6 ${getIconColor(desk, status)}`} />
                    </div>
                    
                    <div className={`font-bold text-lg mb-2 ${getTextColor(status)} group-hover:text-white transition-colors duration-300`}>
                      {desk.name}
                    </div>
                    
                    <div className={`text-sm mb-3 ${
                      status === 'available' 
                        ? 'text-blue-300' 
                        : status === 'selected'
                        ? 'text-orange-300'
                        : 'text-gray-500'
                    } group-hover:text-gray-200 transition-colors duration-300`}>
                      {status === 'available' ? 'Available' : status === 'selected' ? 'Selected' : 'Occupied'}
                    </div>
                    
                    {/* Amenities */}
                    {status !== 'unavailable' && (
                      <div className="flex justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Wifi className="w-4 h-4 text-gray-400" />
                        <Coffee className="w-4 h-4 text-gray-400" />
                      </div>
                    )}
                    
                    {/* Status Indicator */}
                    {status === 'selected' && (
                      <div className="absolute top-2 right-2">
                        <CheckCircle className="w-6 h-6 text-orange-400 animate-pulse" />
                      </div>
                    )}
                  </div>
                  
                  {/* Hover Info */}
                  {hoveredDesk === desk.id && status === 'available' && (
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-xs whitespace-nowrap border border-blue-500/50 shadow-lg">
                      Click to select
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45 border-r border-b border-blue-500/50" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Team Spaces Section */}
        <div>
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mr-4 transform hover:rotate-12 transition-transform duration-300">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">Team Collaboration Spaces</h3>
              <p className="text-gray-400">Designed for teamwork and creative collaboration</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {teamDesks.map(desk => {
              const status = getDeskAvailability(desk);
              return (
                <div
                  key={desk.id}
                  onClick={() => handleDeskClick(desk)}
                  onMouseEnter={() => setHoveredDesk(desk.id)}
                  onMouseLeave={() => setHoveredDesk(null)}
                  className={getDeskStyle(desk, status)}
                >
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 ${
                    status === 'available' 
                      ? 'bg-gradient-to-br from-teal-500/10 to-teal-600/10' 
                      : status === 'selected'
                      ? 'bg-gradient-to-br from-orange-500/20 to-amber-500/20'
                      : 'bg-gray-700/10'
                  } opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  
                  {/* Content */}
                  <div className="relative p-8 text-center">
                    <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center ${
                      status === 'available' 
                        ? 'bg-gradient-to-br from-teal-500 to-teal-600' 
                        : status === 'selected'
                        ? 'bg-gradient-to-br from-orange-500 to-amber-500'
                        : 'bg-gray-600'
                    } transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-300`}>
                      <Users className={`w-8 h-8 ${getIconColor(desk, status)}`} />
                    </div>
                    
                    <div className={`font-bold text-xl mb-3 ${getTextColor(status)} group-hover:text-white transition-colors duration-300`}>
                      {desk.name}
                    </div>
                    
                    <div className={`text-sm mb-4 ${
                      status === 'available' 
                        ? 'text-teal-300' 
                        : status === 'selected'
                        ? 'text-orange-300'
                        : 'text-gray-500'
                    } group-hover:text-gray-200 transition-colors duration-300`}>
                      {status === 'available' ? 'Available for teams' : status === 'selected' ? 'Selected' : 'Currently occupied'}
                    </div>
                    
                    {/* Team Features */}
                    {status !== 'unavailable' && (
                      <div className="space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex items-center justify-center text-xs text-gray-400">
                          <span>Seats 4-6 people</span>
                        </div>
                        <div className="flex justify-center space-x-3">
                          <Wifi className="w-4 h-4 text-gray-400" />
                          <Monitor className="w-4 h-4 text-gray-400" />
                          <Coffee className="w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                    )}
                    
                    {/* Status Indicator */}
                    {status === 'selected' && (
                      <div className="absolute top-3 right-3">
                        <CheckCircle className="w-6 h-6 text-orange-400 animate-pulse" />
                      </div>
                    )}
                  </div>
                  
                  {/* Hover Info */}
                  {hoveredDesk === desk.id && status === 'available' && (
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-xs whitespace-nowrap border border-teal-500/50 shadow-lg">
                      Click to select
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45 border-r border-b border-teal-500/50" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Footer Legend */}
      <div className="bg-gray-800/50 px-8 py-6 border-t border-gray-700 relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-amber-500/5" />
        
        <div className="flex flex-wrap items-center justify-between gap-6 relative z-10">
          <div className="flex flex-wrap items-center gap-8">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mr-2 animate-pulse" />
              <span className="text-gray-300 text-sm font-medium">Individual Workspace</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full mr-2 animate-pulse" />
              <span className="text-gray-300 text-sm font-medium">Team Space</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full mr-2 animate-pulse" />
              <span className="text-gray-300 text-sm font-medium">Selected</span>
            </div>
          </div>
          
          <div className="flex items-center text-gray-400 text-sm">
            <Zap className="w-4 h-4 mr-2 text-orange-400 animate-pulse" />
            <span>All spaces include premium amenities</span>
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

export default DeskMap;
