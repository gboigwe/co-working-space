import React, { useState } from 'react';
import { Building, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
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
          <a href="/dashboard" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">Dashboard</a>
        </nav>
        
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
          <a href="/dashboard" className="block py-2 text-gray-700 hover:text-blue-600">Dashboard</a>
        </div>
      )}
    </header>
  );
};

export default Header;
