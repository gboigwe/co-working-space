import React from 'react';
import Header from '../components/Header';
import { Building, Cpu, CreditCard, Clock, Check, Zap } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Your Flexible Workspace Solution
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Book individual desks or team spaces with a membership that fits your needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="/booking"
                className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-md hover:bg-blue-50 transition-colors duration-300 shadow-md"
              >
                Book Now
              </a>
              <a
                href="#features"
                className="px-6 py-3 bg-blue-700 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors duration-300 border border-blue-500"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Tiers */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Membership Tiers</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the plan that works best for your needs and budget
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Basic Tier */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 duration-300">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Basic</h3>
                <div className="flex items-end mb-4">
                  <span className="text-3xl font-bold text-blue-600">$10</span>
                  <span className="text-gray-600 ml-1">/hour</span>
                </div>
                <p className="text-gray-600">Perfect for occasional visits and freelancers.</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                    <span className="text-gray-600">Access to individual desks</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                    <span className="text-gray-600">High-speed WiFi</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                    <span className="text-gray-600">Access to common areas</span>
                  </li>
                </ul>
                <a
                  href="/booking"
                  className="block mt-6 px-4 py-2 bg-blue-600 text-white text-center rounded-md hover:bg-blue-700 transition-colors duration-200"
                >
                  Get Started
                </a>
              </div>
            </div>

            {/* Premium Tier */}
            <div className="bg-white rounded-lg shadow-xl overflow-hidden border-2 border-teal-500 transform transition-transform hover:scale-105 duration-300">
              <div className="bg-teal-600 py-2 text-center text-white text-sm font-medium">
                MOST POPULAR
              </div>
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Premium</h3>
                <div className="flex items-end mb-4">
                  <span className="text-3xl font-bold text-teal-600">$15</span>
                  <span className="text-gray-600 ml-1">/hour</span>
                </div>
                <p className="text-gray-600">Ideal for regular users and small teams.</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-teal-500 mr-2 mt-0.5" />
                    <span className="text-gray-600">All Basic features</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-teal-500 mr-2 mt-0.5" />
                    <span className="text-gray-600">Priority desk booking</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-teal-500 mr-2 mt-0.5" />
                    <span className="text-gray-600">Access to meeting rooms (2h/week)</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-teal-500 mr-2 mt-0.5" />
                    <span className="text-gray-600">Printing credits included</span>
                  </li>
                </ul>
                <a
                  href="/booking"
                  className="block mt-6 px-4 py-2 bg-teal-600 text-white text-center rounded-md hover:bg-teal-700 transition-colors duration-200"
                >
                  Get Started
                </a>
              </div>
            </div>

            {/* Executive Tier */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 duration-300">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Executive</h3>
                <div className="flex items-end mb-4">
                  <span className="text-3xl font-bold text-amber-600">$20</span>
                  <span className="text-gray-600 ml-1">/hour</span>
                </div>
                <p className="text-gray-600">Premium experience for professionals.</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                    <span className="text-gray-600">All Premium features</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                    <span className="text-gray-600">Access to private offices</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                    <span className="text-gray-600">24/7 access to the space</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                    <span className="text-gray-600">Access to business dashboard</span>
                  </li>
                </ul>
                <a
                  href="/booking"
                  className="block mt-6 px-4 py-2 bg-amber-600 text-white text-center rounded-md hover:bg-amber-700 transition-colors duration-200"
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Us</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our co-working space offers the perfect blend of comfort, flexibility, and professionalism
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="rounded-full bg-blue-100 w-12 h-12 flex items-center justify-center mb-4">
                <Building className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Prime Location</h3>
              <p className="text-gray-600">
                Centrally located with easy access to public transportation, restaurants, and amenities.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="rounded-full bg-teal-100 w-12 h-12 flex items-center justify-center mb-4">
                <Cpu className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">High-Tech Infrastructure</h3>
              <p className="text-gray-600">
                Fast internet, modern equipment, and smart meeting rooms for seamless work.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="rounded-full bg-amber-100 w-12 h-12 flex items-center justify-center mb-4">
                <CreditCard className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Flexible Pricing</h3>
              <p className="text-gray-600">
                Pay only for what you need with hourly rates and discounts for longer bookings.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="rounded-full bg-purple-100 w-12 h-12 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">24/7 Access</h3>
              <p className="text-gray-600">
                Work whenever inspiration strikes with round-the-clock access for Executive members.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to boost your productivity?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join our co-working community today and experience the perfect work environment.
          </p>
          <a
            href="/booking"
            className="inline-flex items-center px-6 py-3 bg-white text-blue-700 font-semibold rounded-md hover:bg-blue-50 transition-colors duration-300"
          >
            <Zap className="mr-2 h-5 w-5" />
            Book Your Desk
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Building className="h-6 w-6 text-teal-400 mr-2" />
                <h3 className="text-xl font-semibold text-white">
                  <span className="text-teal-400">Co</span>Working Space
                </h3>
              </div>
              <p className="text-gray-400 mb-4">
                Your flexible workspace solution with premium amenities and a vibrant community.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-medium text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="/" className="hover:text-teal-400 transition-colors">Home</a></li>
                <li><a href="/booking" className="hover:text-teal-400 transition-colors">Book a Desk</a></li>
                <li><a href="/my-bookings" className="hover:text-teal-400 transition-colors">My Bookings</a></li>
                <li><a href="/dashboard" className="hover:text-teal-400 transition-colors">Dashboard</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-medium text-white mb-4">Contact Us</h4>
              <address className="not-italic text-gray-400 space-y-2">
                <p>123 Workspace Avenue</p>
                <p>San Francisco, CA 94107</p>
                <p>Email: info@coworking.com</p>
                <p>Phone: (123) 456-7890</p>
              </address>
            </div>

            <div>
              <h4 className="text-lg font-medium text-white mb-4">Subscribe</h4>
              <p className="text-gray-400 mb-2">Get the latest news and updates</p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-3 py-2 bg-gray-700 text-white rounded-l-md focus:outline-none focus:ring-1 focus:ring-teal-400 flex-grow"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-teal-500 text-white rounded-r-md hover:bg-teal-600 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 CoWorking Space. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
