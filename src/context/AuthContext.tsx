import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User, MembershipTier } from '../types';
import { mockUsers } from '../utils/mockData';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string, membershipTier: MembershipTier) => Promise<boolean>;
  updateMembership: (tier: MembershipTier) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // In a real app, this would be an API call
      const user = mockUsers.find(user => user.email === email);
      
      if (user) {
        setCurrentUser(user);
        setIsAuthenticated(true);
        navigate('/booking'); // Redirect to booking page after successful login
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    navigate('/'); // Redirect to home page after logout
  };

  const register = async (
    name: string, 
    email: string, 
    password: string, 
    membershipTier: MembershipTier
  ): Promise<boolean> => {
    try {
      // Check if email already exists
      const existingUser = mockUsers.find(user => user.email === email);
      if (existingUser) {
        return false;
      }

      // In a real app, this would be an API call
      const newUser: User = {
        id: String(mockUsers.length + 1),
        name,
        email,
        membershipTier,
      };
      
      mockUsers.push(newUser); // Add to mock data
      setCurrentUser(newUser);
      setIsAuthenticated(true);
      navigate('/booking'); // Redirect to booking page after successful registration
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const updateMembership = (tier: MembershipTier) => {
    if (currentUser) {
      setCurrentUser({ ...currentUser, membershipTier: tier });
    }
  };

  return (
    <AuthContext.Provider value={{ 
      currentUser, 
      login, 
      logout, 
      register, 
      updateMembership,
      isAuthenticated
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};