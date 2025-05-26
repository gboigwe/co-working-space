import React, { useState, useEffect } from 'react';
import { Building, Menu, X, Zap, Sparkles } from 'lucide-react';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navigationItems = [
    { href: '/', label: 'Home', icon: '🏠' },
    { href: '/booking', label: 'Book Space', icon: '🚀' },
    { href: '/my-bookings', label: 'My Bookings', icon: '📋' },
    { href: '/dashboard', label: 'Dashboard', icon: '📊' },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-gray-900/95 backdrop-blur-xl border-b border-orange-500/20 shadow-2xl' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo with 3D Effect */}
            <div className="flex items-center group cursor-pointer">
              <div className="relative mr-3">
                {/* 3D Cube Logo */}
                <div className="w-12 h-12 relative transform-gpu transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-amber-500 rounded-xl transform rotate-6 opacity-60"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                    <Building className="h-6 w-6 text-white transform group-hover:scale-125 transition-transform duration-300" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full animate-pulse"></div>
                </div>
              </div>
              
              <div className="flex flex-col">
                <h1 className="text-2xl font-black text-white group-hover:text-orange-300 transition-colors duration-300">
                  <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                    Future
                  </span>
                  Space
                </h1>
                <div className="flex items-center text-xs text-gray-400 group-hover:text-orange-400 transition-colors duration-300">
                  <Sparkles className="w-3 h-3 mr-1" />
                  <span>Next-Gen Workspace</span>
                </div>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
              {navigationItems.map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="group relative px-6 py-3 text-white hover:text-orange-300 transition-all duration-300 rounded-xl hover:bg-white/5 backdrop-blur-sm border border-transparent hover:border-orange-500/30"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="flex items-center font-medium">
                    <span className="mr-2 text-lg filter grayscale group-hover:grayscale-0 transition-all duration-300">
                      {item.icon}
                    </span>
                    {item.label}
                  </span>
                  
                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/10 to-orange-500/0 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300" />
                  
                  {/* Bottom Glow Line */}
                  <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-amber-400 group-hover:w-full group-hover:left-0 transition-all duration-300 rounded-full" />
                </a>
              ))}
              
              {/* Special CTA Button */}
              <a
                href="/booking"
                className="ml-4 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl shadow-lg hover:shadow-orange-500/25 transform hover:scale-105 hover:-rotate-1 transition-all duration-300 border border-orange-400/50"
              >
                <span className="flex items-center">
                  <Zap className="w-4 h-4 mr-2 animate-pulse" />
                  Book Now
                </span>
              </a>
            </nav>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:border-orange-400/50 transition-all duration-300 hover:scale-105"
              onClick={toggleMobileMenu}
            >
              <div className="relative">
                {mobileMenuOpen ? (
                  <X className="h-6 w-6 text-white transform rotate-90 transition-transform duration-300" />
                ) : (
                  <Menu className="h-6 w-6 text-white transition-transform duration-300" />
                )}
              </div>
            </button>
          </div>
        </div>
      </header>
      
      {/* Mobile Navigation with 3D Effect */}
      <div 
        className={`fixed inset-0 z-40 transition-all duration-500 md:hidden ${
          mobileMenuOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-gray-900/95 backdrop-blur-xl"
          onClick={toggleMobileMenu}
        />
        
        {/* Menu Content */}
        <div 
          className={`absolute top-20 left-4 right-4 bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl rounded-3xl border border-orange-500/20 shadow-2xl transform transition-all duration-500 ${
            mobileMenuOpen 
              ? 'translate-y-0 scale-100 opacity-100' 
              : '-translate-y-4 scale-95 opacity-0'
          }`}
        >
          {/* Glowing Header */}
          <div className="p-6 border-b border-orange-500/20">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center mr-3">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-semibold">Navigation</span>
            </div>
          </div>
          
          {/* Navigation Items */}
          <div className="p-4 space-y-2">
            {navigationItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                onClick={toggleMobileMenu}
                className="group flex items-center w-full p-4 text-white hover:text-orange-300 bg-white/5 hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-amber-500/20 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg border border-transparent hover:border-orange-500/30"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="text-2xl mr-4 filter grayscale group-hover:grayscale-0 transition-all duration-300">
                  {item.icon}
                </span>
                <span className="font-medium text-lg">{item.label}</span>
                <div className="ml-auto w-2 h-2 bg-orange-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
            ))}
            
            {/* Special Mobile CTA */}
            <div className="pt-4 mt-4 border-t border-orange-500/20">
              <a
                href="/booking"
                onClick={toggleMobileMenu}
                className="flex items-center justify-center w-full p-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-orange-500/25 transform hover:scale-105 transition-all duration-300"
              >
                <Zap className="w-5 h-5 mr-2 animate-pulse" />
                Book Your Space Now
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .transform-gpu {
          transform-style: preserve-3d;
        }
        
        .hover\\:-rotate-1:hover {
          transform: rotate(-1deg) scale(1.05);
        }
      `}</style>
    </>
  );
};

export default Header;
