import React from 'react';
import { useBooking } from '../../context/BookingContext';
import { Desk } from '../../types';
import { Monitor, Users } from 'lucide-react';

interface DeskMapProps {
  onSelectDesk: (desk: Desk) => void;
}

const DeskMap: React.FC<DeskMapProps> = ({ onSelectDesk }) => {
  const { desks, selectedDate, selectedStartTime, selectedEndTime, isDeskAvailable } = useBooking();

  const individualDesks = desks.filter(desk => desk.type === 'individual');
  const teamDesks = desks.filter(desk => desk.type === 'team');

  const handleDeskClick = (desk: Desk) => {
    if (!selectedStartTime || !selectedEndTime) {
      alert('Please select a time slot first');
      return;
    }
    onSelectDesk(desk);
  };

  const getDeskAvailability = (desk: Desk): 'available' | 'unavailable' | 'selected' => {
    if (!selectedStartTime || !selectedEndTime) {
      return desk.isAvailable ? 'available' : 'unavailable';
    }
    
    if (!isDeskAvailable(desk.id, selectedDate, selectedStartTime, selectedEndTime)) {
      return 'unavailable';
    }
    
    return 'available';
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Select a Desk</h2>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-2 flex items-center">
            <Monitor className="h-5 w-5 mr-2 text-blue-600" />
            Individual Desks
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {individualDesks.map(desk => {
              const status = getDeskAvailability(desk);
              return (
                <button
                  key={desk.id}
                  onClick={() => status === 'available' && handleDeskClick(desk)}
                  disabled={status === 'unavailable'}
                  className={`relative p-4 rounded-lg border transition-all transform hover:scale-105 ${
                    status === 'available'
                      ? 'border-blue-400 bg-blue-50 cursor-pointer hover:shadow-md'
                      : status === 'selected'
                      ? 'border-green-500 bg-green-50 ring-2 ring-green-500'
                      : 'border-gray-200 bg-gray-100 opacity-60 cursor-not-allowed'
                  }`}
                >
                  <div className="text-center">
                    <div 
                      className={`font-medium ${
                        status === 'available' ? 'text-blue-700' : 
                        status === 'selected' ? 'text-green-700' : 'text-gray-500'
                      }`}
                    >
                      {desk.name}
                    </div>
                    <div 
                      className={`text-xs mt-1 ${
                        status === 'available' ? 'text-blue-600' : 
                        status === 'selected' ? 'text-green-600' : 'text-gray-500'
                      }`}
                    >
                      {status === 'available' ? 'Available' : 'Unavailable'}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2 flex items-center">
            <Users className="h-5 w-5 mr-2 text-teal-600" />
            Team Spaces
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {teamDesks.map(desk => {
              const status = getDeskAvailability(desk);
              return (
                <button
                  key={desk.id}
                  onClick={() => status === 'available' && handleDeskClick(desk)}
                  disabled={status === 'unavailable'}
                  className={`relative p-4 rounded-lg border transition-all transform hover:scale-105 ${
                    status === 'available'
                      ? 'border-teal-400 bg-teal-50 cursor-pointer hover:shadow-md'
                      : status === 'selected'
                      ? 'border-green-500 bg-green-50 ring-2 ring-green-500'
                      : 'border-gray-200 bg-gray-100 opacity-60 cursor-not-allowed'
                  }`}
                >
                  <div className="text-center">
                    <div 
                      className={`font-medium ${
                        status === 'available' ? 'text-teal-700' : 
                        status === 'selected' ? 'text-green-700' : 'text-gray-500'
                      }`}
                    >
                      {desk.name}
                    </div>
                    <div 
                      className={`text-xs mt-1 ${
                        status === 'available' ? 'text-teal-600' : 
                        status === 'selected' ? 'text-green-600' : 'text-gray-500'
                      }`}
                    >
                      {status === 'available' ? 'Available' : 'Unavailable'}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="h-3 w-3 bg-blue-100 border border-blue-400 rounded-full mr-1"></div>
              <span className="text-gray-600">Individual Desk</span>
            </div>
            <div className="flex items-center">
              <div className="h-3 w-3 bg-teal-100 border border-teal-400 rounded-full mr-1"></div>
              <span className="text-gray-600">Team Space</span>
            </div>
          </div>
          <div className="text-gray-500">
            {selectedDate && `Selected date: ${new Date(selectedDate).toLocaleDateString()}`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeskMap;