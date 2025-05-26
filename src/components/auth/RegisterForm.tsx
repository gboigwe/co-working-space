import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserPlus } from 'lucide-react';

const RegisterForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [membershipTier, setMembershipTier] = useState<'Basic' | 'Premium' | 'Executive'>('Basic');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await register(name, email, password, membershipTier);
      if (!success) {
        setError('Failed to create account. Email may already be in use.');
      }
    } catch (err) {
      setError('An error occurred during registration');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-teal-600 p-6">
        <h2 className="text-2xl font-bold text-white text-center">Create an Account</h2>
        <p className="text-teal-100 text-center mt-2">Join our coworking community today</p>
      </div>
      
      <div className="p-6">
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-200 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
              placeholder="John Doe"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
              placeholder="you@example.com"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                placeholder="••••••••"
                required
              />
            </div>
            
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                placeholder="••••••••"
                required
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="membership-tier" className="block text-sm font-medium text-gray-700 mb-1">
              Membership Tier
            </label>
            <div className="grid grid-cols-3 gap-3 mt-2">
              <div>
                <input
                  type="radio"
                  id="basic"
                  name="membershipTier"
                  value="Basic"
                  checked={membershipTier === 'Basic'}
                  onChange={() => setMembershipTier('Basic')}
                  className="sr-only"
                />
                <label
                  htmlFor="basic"
                  className={`w-full flex flex-col items-center justify-center p-3 border rounded-md cursor-pointer transition-all ${
                    membershipTier === 'Basic'
                      ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500'
                      : 'border-gray-300 bg-white hover:bg-gray-50'
                  }`}
                >
                  <span className="text-lg font-semibold">Basic</span>
                  <span className="text-sm text-gray-600">$10/hr</span>
                </label>
              </div>
              
              <div>
                <input
                  type="radio"
                  id="premium"
                  name="membershipTier"
                  value="Premium"
                  checked={membershipTier === 'Premium'}
                  onChange={() => setMembershipTier('Premium')}
                  className="sr-only"
                />
                <label
                  htmlFor="premium"
                  className={`w-full flex flex-col items-center justify-center p-3 border rounded-md cursor-pointer transition-all ${
                    membershipTier === 'Premium'
                      ? 'border-teal-500 bg-teal-50 ring-2 ring-teal-500'
                      : 'border-gray-300 bg-white hover:bg-gray-50'
                  }`}
                >
                  <span className="text-lg font-semibold">Premium</span>
                  <span className="text-sm text-gray-600">$15/hr</span>
                </label>
              </div>
              
              <div>
                <input
                  type="radio"
                  id="executive"
                  name="membershipTier"
                  value="Executive"
                  checked={membershipTier === 'Executive'}
                  onChange={() => setMembershipTier('Executive')}
                  className="sr-only"
                />
                <label
                  htmlFor="executive"
                  className={`w-full flex flex-col items-center justify-center p-3 border rounded-md cursor-pointer transition-all ${
                    membershipTier === 'Executive'
                      ? 'border-amber-500 bg-amber-50 ring-2 ring-amber-500'
                      : 'border-gray-300 bg-white hover:bg-gray-50'
                  }`}
                >
                  <span className="text-lg font-semibold">Executive</span>
                  <span className="text-sm text-gray-600">$20/hr</span>
                </label>
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            <input
              id="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
              I agree to the <a href="#" className="text-teal-600 hover:text-teal-500">Terms of Service</a> and <a href="#" className="text-teal-600 hover:text-teal-500">Privacy Policy</a>
            </label>
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating account...
              </span>
            ) : (
              <span className="flex items-center">
                <UserPlus className="mr-2 h-4 w-4" />
                Create Account
              </span>
            )}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="font-medium text-teal-600 hover:text-teal-500 transition-colors">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;