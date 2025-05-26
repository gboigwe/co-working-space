import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Building, LogOut, User as UserIcon, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const { currentUser, logout, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm py-4 sticky top-0 z-10">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Building className="h-6 w-6 text-teal-600 mr-2" />
          <h1 className="text-2xl font-semibold text-blue-700">
            <span className="text-teal-600">Co</span>Working Space
          </h1>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="/" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">Home</a>
          <a href="/booking" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">Book a Desk</a>
          <a href="/my-bookings" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">My Bookings</a>
          {isAuthenticated && currentUser?.membershipTier === 'Executive' && (
            <a href="/dashboard" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">Dashboard</a>
          )}
        </nav>
        
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated && currentUser ? (
            <div className="flex items-center">
              <div className="mr-4 flex items-center">
                <div className="bg-blue-100 rounded-full p-1 mr-2">
                  <UserIcon className="h-5 w-5 text-blue-700" />
                </div>
                <div>
                  <p className="text-sm font-medium">{currentUser.name}</p>
                  <p className="text-xs text-gray-500">{currentUser.membershipTier} Member</p>
                </div>
              </div>
              <button 
                onClick={logout}
                className="flex items-center px-3 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors duration-200"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <a 
                href="/login" 
                className="px-4 py-2 text-sm font-medium text-blue-700 hover:text-blue-800 transition-colors duration-200"
              >
                Login
              </a>
              <a 
                href="/register" 
                className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
              >
                Register
              </a>
            </div>
          )}
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden flex items-center"
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-gray-700" />
          ) : (
            <Menu className="h-6 w-6 text-gray-700" />
          )}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 py-3 space-y-3 bg-gray-50 border-t border-gray-200">
          <a href="/" className="block py-2 text-gray-700 hover:text-blue-600">Home</a>
          <a href="/booking" className="block py-2 text-gray-700 hover:text-blue-600">Book a Desk</a>
          <a href="/my-bookings" className="block py-2 text-gray-700 hover:text-blue-600">My Bookings</a>
          {isAuthenticated && currentUser?.membershipTier === 'Executive' && (
            <a href="/dashboard" className="block py-2 text-gray-700 hover:text-blue-600">Dashboard</a>
          )}
          
          {isAuthenticated && currentUser ? (
            <div className="pt-3 border-t border-gray-200">
              <div className="flex items-center mb-3">
                <div className="bg-blue-100 rounded-full p-1 mr-2">
                  <UserIcon className="h-5 w-5 text-blue-700" />
                </div>
                <div>
                  <p className="text-sm font-medium">{currentUser.name}</p>
                  <p className="text-xs text-gray-500">{currentUser.membershipTier} Member</p>
                </div>
              </div>
              <button 
                onClick={logout}
                className="w-full flex items-center justify-center px-3 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </button>
            </div>
          ) : (
            <div className="pt-3 border-t border-gray-200 flex flex-col space-y-2">
              <a 
                href="/login" 
                className="w-full text-center px-4 py-2 text-sm font-medium text-blue-700 border border-blue-700 rounded-md hover:bg-blue-50"
              >
                Login
              </a>
              <a 
                href="/register" 
                className="w-full text-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Register
              </a>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;