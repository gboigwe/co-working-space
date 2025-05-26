import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import DeskMap from '../components/booking/DeskMap';
import BookingForm from '../components/booking/BookingForm';
import { useBooking } from '../context/BookingContext';
import { Desk, MembershipTier } from '../types';
import { ArrowLeft, Sparkles, Zap, Users, Monitor, CheckCircle, Calendar, Clock } from 'lucide-react';

const BookingPage: React.FC = () => {
  const { selectedMembershipTier, setSelectedMembershipTier } = useBooking();
  const [selectedDesk, setSelectedDesk] = useState<Desk | null>(null);
  const [step, setStep] = useState<'select-experience' | 'select-desk' | 'booking-details'>(
    'select-experience'
  );
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleExperienceSelect = (tier: MembershipTier) => {
    setSelectedMembershipTier(tier);
    setStep('select-desk');
  };

  const handleSelectDesk = (desk: Desk) => {
    setSelectedDesk(desk);
    setStep('booking-details');
  };

  const handleBackToSelectDesk = () => {
    setStep('select-desk');
  };

  const handleBackToExperience = () => {
    setStep('select-experience');
  };

  const experiences = [
    {
      tier: 'Basic' as MembershipTier,
      name: 'Essential',
      description: 'Perfect for focused work sessions',
      features: ['High-speed WiFi', 'Comfortable workspace', 'Coffee & tea access', 'Community areas'],
      color: 'from-blue-500 to-purple-600',
      icon: Monitor,
      badge: 'Most Popular'
    },
    {
      tier: 'Premium' as MembershipTier,
      name: 'Professional',
      description: 'Enhanced productivity experience',
      features: ['All Essential features', 'Priority desk selection', 'Meeting room access', 'Printing services', 'Dedicated support'],
      color: 'from-orange-500 to-red-500',
      icon: Users,
      badge: 'Recommended'
    },
    {
      tier: 'Executive' as MembershipTier,
      name: 'Elite',
      description: 'Ultimate workspace luxury',
      features: ['All Professional features', 'Private office access', '24/7 building access', 'Concierge service', 'Premium amenities'],
      color: 'from-amber-500 to-orange-600',
      icon: Sparkles,
      badge: 'Premium'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Header />
      
      {/* Hero Section */}
      <div className="pt-24 pb-12 bg-gradient-to-r from-orange-900/50 to-amber-900/50 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-orange-400 rounded-full animate-float opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
                Reserve Your <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">Future</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Experience the next generation of workspace booking with our immersive 3D interface
              </p>

              {/* Progress Indicator */}
              <div className="max-w-2xl mx-auto mb-8">
                <div className="flex items-center justify-between mb-4">
                  {['Experience', 'Workspace', 'Confirmation'].map((label, index) => (
                    <div key={label} className="flex items-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-500 ${
                        (step === 'select-experience' && index === 0) ||
                        (step === 'select-desk' && index === 1) ||
                        (step === 'booking-details' && index === 2)
                          ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg scale-110'
                          : 'bg-gray-700 text-gray-400'
                      }`}>
                        {index < (step === 'select-experience' ? 0 : step === 'select-desk' ? 1 : 2) ? (
                          <CheckCircle className="w-6 h-6" />
                        ) : (
                          index + 1
                        )}
                      </div>
                      {index < 2 && (
                        <div className={`w-24 h-1 mx-4 rounded-full transition-all duration-500 ${
                          index < (step === 'select-experience' ? 0 : step === 'select-desk' ? 1 : 2)
                            ? 'bg-gradient-to-r from-orange-500 to-amber-500'
                            : 'bg-gray-700'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span className={step === 'select-experience' ? 'text-orange-400 font-medium' : ''}>
                    Choose Experience
                  </span>
                  <span className={step === 'select-desk' ? 'text-orange-400 font-medium' : ''}>
                    Select Workspace
                  </span>
                  <span className={step === 'booking-details' ? 'text-orange-400 font-medium' : ''}>
                    Book Time
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Experience Selection */}
          {step === 'select-experience' && (
            <div className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white mb-4">Choose Your Experience</h2>
                <p className="text-gray-400 text-lg">Each tier offers unique benefits tailored to your workflow</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {experiences.map((experience, index) => (
                  <div
                    key={experience.tier}
                    onClick={() => handleExperienceSelect(experience.tier)}
                    className="group relative cursor-pointer transform transition-all duration-500 hover:scale-105 hover:-rotate-1"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    {/* Card */}
                    <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-700 hover:border-orange-500/50 transition-all duration-500 overflow-hidden">
                      {/* Badge */}
                      {experience.badge && (
                        <div className="absolute top-4 right-4">
                          <span className={`px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r ${experience.color} text-white`}>
                            {experience.badge}
                          </span>
                        </div>
                      )}

                      {/* Glow Effect */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${experience.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`} />

                      {/* Icon */}
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${experience.color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
                        <experience.icon className="w-8 h-8 text-white" />
                      </div>

                      {/* Content */}
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-orange-300 transition-colors duration-300">
                        {experience.name}
                      </h3>
                      <p className="text-gray-400 mb-6 group-hover:text-gray-300 transition-colors duration-300">
                        {experience.description}
                      </p>

                      {/* Features */}
                      <ul className="space-y-3">
                        {experience.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-gray-300 group-hover:text-white transition-colors duration-300">
                            <CheckCircle className="w-4 h-4 text-orange-400 mr-3 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {/* CTA Button */}
                      <button className="w-full mt-8 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl hover:from-orange-600 hover:to-amber-600 transform hover:scale-105 transition-all duration-300 flex items-center justify-center">
                        <Zap className="w-4 h-4 mr-2" />
                        Select Experience
                      </button>

                      {/* Hover Shine Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-3xl" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Current Experience Info */}
          {step !== 'select-experience' && (
            <div className="mb-8 p-6 bg-gradient-to-r from-orange-500/20 to-amber-500/20 backdrop-blur-sm rounded-2xl border border-orange-500/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center mr-4">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">
                      {experiences.find(exp => exp.tier === selectedMembershipTier)?.name} Experience
                    </h3>
                    <p className="text-orange-200 text-sm">
                      {experiences.find(exp => exp.tier === selectedMembershipTier)?.description}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleBackToExperience}
                  className="px-4 py-2 bg-white/10 backdrop-blur-sm text-orange-200 hover:text-white rounded-lg border border-orange-500/30 hover:border-orange-400 transition-all duration-300 hover:scale-105"
                >
                  Change
                </button>
              </div>
            </div>
          )}

          {/* Desk Selection */}
          {step === 'select-desk' && (
            <div className="transition-all duration-500 transform">
              <DeskMap onSelectDesk={handleSelectDesk} />
            </div>
          )}

          {/* Booking Details */}
          {step === 'booking-details' && selectedDesk && (
            <div className="transition-all duration-500 transform space-y-6">
              <div className="flex items-center mb-6">
                <button
                  onClick={handleBackToSelectDesk}
                  className="flex items-center text-orange-400 hover:text-orange-300 transition-colors duration-200 group"
                >
                  <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
                  Back to workspace selection
                </button>
              </div>
              
              {/* Selected Desk Info */}
              <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-700 mb-6">
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mr-4">
                    {selectedDesk.type === 'individual' ? (
                      <Monitor className="w-8 h-8 text-white" />
                    ) : (
                      <Users className="w-8 h-8 text-white" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">
                      {selectedDesk.name}
                    </h2>
                    <p className="text-gray-400">
                      {selectedDesk.type === 'individual' ? 'Individual Workspace' : 'Team Collaboration Space'}
                    </p>
                  </div>
                </div>
              </div>
              
              <BookingForm />
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default BookingPage;
