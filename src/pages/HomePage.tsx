import React, { useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import { Building, Cpu, CreditCard, Clock, Check, Zap, ArrowRight, Sparkles, Users, Globe } from 'lucide-react';

const HomePage: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        parallaxRef.current.style.transform = `translate3d(0, ${rate}px, 0)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 overflow-x-hidden">
      <Header />
      
      {/* 3D Hero Section with Orange Gradient */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: `
            radial-gradient(ellipse at ${mousePosition.x}% ${mousePosition.y}%, 
            rgba(251, 146, 60, 0.3) 0%, 
            rgba(249, 115, 22, 0.2) 25%, 
            rgba(194, 65, 12, 0.1) 50%, 
            rgba(17, 24, 39, 0.9) 100%)
          `
        }}
      >
        {/* Animated Background Elements */}
        <div ref={parallaxRef} className="absolute inset-0 overflow-hidden">
          {/* Floating 3D Cubes */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-6 h-6 bg-gradient-to-br from-orange-400 to-orange-600 transform rotate-45 animate-float opacity-20`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${4 + Math.random() * 2}s`,
              }}
            />
          ))}
          
          {/* Glowing Orbs */}
          {[...Array(8)].map((_, i) => (
            <div
              key={`orb-${i}`}
              className="absolute rounded-full bg-gradient-to-r from-orange-500 to-amber-500 opacity-10 animate-pulse"
              style={{
                width: `${100 + Math.random() * 200}px`,
                height: `${100 + Math.random() * 200}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.7}s`,
                filter: 'blur(2px)',
              }}
            />
          ))}
        </div>

        {/* Main Hero Content */}
        <div className="container mx-auto px-4 z-10 relative">
          <div className="max-w-5xl mx-auto text-center">
            <div 
              className={`transition-all duration-2000 transform ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
              }`}
            >
              {/* Animated Badge */}
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500/20 to-amber-500/20 backdrop-blur-sm rounded-full border border-orange-500/30 mb-8 transform hover:scale-105 transition-all duration-300">
                <Sparkles className="w-5 h-5 text-orange-400 mr-2 animate-spin-slow" />
                <span className="text-orange-300 font-medium text-sm">Experience the Future of Work</span>
              </div>

              {/* Main Heading with 3D Effect */}
              <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight relative">
                <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 bg-clip-text text-transparent drop-shadow-2xl">
                  Next-Gen
                </span>
                <br />
                <span className="text-white drop-shadow-2xl transform hover:scale-105 transition-transform duration-300 inline-block">
                  Workspace
                </span>
                
                {/* 3D Shadow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent opacity-30 transform translate-x-2 translate-y-2 -z-10">
                  Next-Gen<br />Workspace
                </div>
              </h1>

              {/* Subtitle with Glow */}
              <p className="text-xl md:text-2xl mb-12 text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Immerse yourself in a <span className="text-orange-400 font-semibold">revolutionary</span> co-working experience 
                where innovation meets comfort in a stunning <span className="text-amber-400 font-semibold">3D environment</span>
              </p>

              {/* CTA Buttons with 3D Hover Effects */}
              <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
                <a
                  href="/booking"
                  className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl shadow-2xl transform hover:scale-110 hover:-rotate-1 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative flex items-center justify-center">
                    <Zap className="mr-2 w-5 h-5 animate-pulse" />
                    Book Your Space
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </span>
                </a>
                
                <button
                  onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 hover:border-orange-400/50 transform hover:scale-105 transition-all duration-300"
                >
                  <span className="flex items-center justify-center">
                    <Globe className="mr-2 w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />
                    Explore Features
                  </span>
                </button>
              </div>

              {/* Stats with 3D Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {[
                  { icon: Users, number: '500+', label: 'Happy Members' },
                  { icon: Building, number: '50+', label: 'Premium Desks' },
                  { icon: Clock, number: '24/7', label: 'Access Available' },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-orange-400/30 transform hover:scale-105 hover:-rotate-1 transition-all duration-300"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <stat.icon className="w-8 h-8 text-orange-400 mx-auto mb-3 group-hover:scale-125 transition-transform duration-300" />
                    <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                    <div className="text-gray-300 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-orange-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-orange-400 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features Section with 3D Cards */}
      <section id="features" className="py-24 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, orange 2px, transparent 2px),
              radial-gradient(circle at 75% 75%, amber 2px, transparent 2px)
            `,
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">
              Why Choose <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">Our Space</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the perfect fusion of cutting-edge technology, stunning design, and unmatched comfort
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Building,
                title: 'Prime Location',
                description: 'Strategically positioned in the heart of innovation with breathtaking city views.',
                color: 'from-orange-500 to-red-500'
              },
              {
                icon: Cpu,
                title: 'AI-Powered Tech',
                description: 'Smart desks, IoT integration, and AI-assisted productivity tools at your fingertips.',
                color: 'from-amber-500 to-orange-500'
              },
              {
                icon: Sparkles,
                title: '3D Immersive Design',
                description: 'Step into the future with our holographic displays and virtual reality zones.',
                color: 'from-orange-500 to-yellow-500'
              },
              {
                icon: Globe,
                title: 'Global Community',
                description: 'Connect with innovators, creators, and entrepreneurs from around the world.',
                color: 'from-red-500 to-orange-500'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group perspective-1000"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 hover:border-orange-400/50 transform-gpu transition-all duration-500 hover:rotateY-12 hover:scale-105 hover:-translate-y-2">
                  {/* Glowing Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`} />
                  
                  {/* Icon with 3D Effect */}
                  <div className="relative mb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-orange-300 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    {feature.description}
                  </p>

                  {/* Hover Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-3xl" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Particle Effects */}
      <section className="relative py-24 bg-gradient-to-r from-orange-900 via-amber-900 to-orange-900 overflow-hidden">
        {/* Particle Background */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-orange-300 rounded-full animate-float opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Ready to <span className="text-orange-300">Transform</span> Your Work?
          </h2>
          <p className="text-xl text-orange-100 mb-12 max-w-2xl mx-auto">
            Join thousands of innovators who've already discovered the future of productivity
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a
              href="/booking"
              className="group relative px-12 py-5 bg-white text-orange-900 font-bold text-lg rounded-2xl shadow-2xl transform hover:scale-110 hover:rotate-1 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-200 to-amber-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center justify-center">
                <Zap className="mr-3 w-6 h-6 animate-pulse" />
                Start Your Journey
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-200" />
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer with 3D Elements */}
      <footer className="bg-gray-900 text-gray-300 py-16 relative overflow-hidden">
        {/* 3D Grid Background */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(251, 146, 60, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(251, 146, 60, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '30px 30px'
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center mr-3 transform hover:rotate-12 transition-transform duration-300">
                  <Building className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  <span className="text-orange-400">Future</span>Space
                </h3>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Redefining the workspace experience with cutting-edge technology and stunning 3D environments.
              </p>
            </div>

            {[
              {
                title: 'Quick Links',
                links: ['Home', 'Book Space', 'My Bookings', 'Features']
              },
              {
                title: 'Experience',
                links: ['3D Virtual Tour', 'AI Assistant', 'Smart Desks', 'VR Meetings']
              },
              {
                title: 'Connect',
                links: ['Community', 'Events', 'Newsletter', 'Support']
              }
            ].map((section, index) => (
              <div key={index} className="transform hover:scale-105 transition-transform duration-300">
                <h4 className="text-lg font-semibold text-white mb-6">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a 
                        href="#" 
                        className="text-gray-400 hover:text-orange-400 transition-colors duration-200 hover:translate-x-1 transform inline-block"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 FutureSpace. Crafted with 🧡 for the future of work.
            </p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(45deg); }
          50% { transform: translateY(-20px) rotate(45deg); }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .transform-gpu {
          transform-style: preserve-3d;
        }
        
        .hover\\:rotateY-12:hover {
          transform: rotateY(12deg);
        }
      `}</style>
    </div>
  );
};

export default HomePage;
