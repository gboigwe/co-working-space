import { Desk, Booking, TimeSlot } from '../types';

// Generate 10 individual desks with enhanced properties
export const generateDesks = (): Desk[] => {
  const individualDesks = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: `Desk ${i + 1}`,
    type: 'individual' as const,
    isAvailable: Math.random() > 0.2, // Most desks available for better demo experience
  }));

  // Generate 5 team desks with creative names
  const teamDeskNames = ['Innovation Hub', 'Collaboration Zone', 'Creative Space', 'Think Tank', 'Synergy Suite'];
  const teamDesks = Array.from({ length: 5 }, (_, i) => ({
    id: i + 11,
    name: teamDeskNames[i] || `Team ${i + 1}`,
    type: 'team' as const,
    isAvailable: Math.random() > 0.25, // Good availability for teams
  }));

  return [...individualDesks, ...teamDesks];
};

// Generate time slots from 8 AM to 8 PM with better availability
export const generateTimeSlots = (): TimeSlot[] => {
  const timeSlots: TimeSlot[] = [];
  for (let hour = 8; hour <= 20; hour++) {
    timeSlots.push({
      id: `time-${hour}`,
      time: `${hour}:00`,
      isAvailable: Math.random() > 0.15, // Higher availability for better user experience
    });
  }
  return timeSlots;
};

// Generate diverse sample bookings for demo
export const generateBookings = (): Booking[] => {
  const today = new Date();
  const dates = [];
  
  // Generate dates for past, present, and future bookings
  for (let i = -5; i <= 10; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    dates.push(date.toISOString().split('T')[0]);
  }

  const membershipTiers = ['Basic', 'Premium', 'Executive'];
  const bookings: Booking[] = [];

  // Create realistic booking patterns
  dates.forEach((date, dateIndex) => {
    const numBookings = Math.floor(Math.random() * 4) + 1; // 1-4 bookings per day
    
    for (let i = 0; i < numBookings; i++) {
      const startHour = 9 + Math.floor(Math.random() * 8); // 9 AM to 4 PM starts
      const duration = Math.floor(Math.random() * 4) + 2; // 2-5 hour sessions
      const endHour = Math.min(startHour + duration, 20);
      
      const deskId = Math.floor(Math.random() * 15) + 1; // Random desk 1-15
      const membershipTier = membershipTiers[Math.floor(Math.random() * membershipTiers.length)];
      
      bookings.push({
        id: `demo-booking-${dateIndex}-${i}`,
        userId: 'demo-user',
        deskId,
        date,
        startTime: `${startHour}:00`,
        endTime: `${endHour}:00`,
        duration: endHour - startHour,
        membershipTier: membershipTier as any,
        totalPrice: 0, // No pricing in demo
      });
    }
  });

  return bookings;
};

// Generate sample analytics data for dashboard
export const generateAnalyticsData = () => {
  const today = new Date();
  const last30Days = [];
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    last30Days.push({
      date: date.toISOString().split('T')[0],
      bookings: Math.floor(Math.random() * 12) + 3, // 3-15 bookings per day
      users: Math.floor(Math.random() * 8) + 2, // 2-10 unique users per day
      occupancyRate: Math.floor(Math.random() * 40) + 60, // 60-100% occupancy
    });
  }
  
  return last30Days;
};

// Generate user engagement metrics
export const generateEngagementMetrics = () => {
  return {
    totalUsers: 127,
    activeUsers: 89,
    newUsersThisMonth: 24,
    averageSessionLength: 3.4,
    popularTimeSlots: {
      '9:00': 45,
      '10:00': 52,
      '11:00': 38,
      '13:00': 41,
      '14:00': 47,
      '15:00': 33,
      '16:00': 29,
    },
    deskTypePreference: {
      individual: 78,
      team: 22,
    },
    membershipDistribution: {
      Basic: 35,
      Premium: 45,
      Executive: 20,
    },
  };
};

// Enhanced workspace amenities data
export const getWorkspaceAmenities = () => {
  return {
    individual: [
      { name: 'High-Speed WiFi', icon: '📶', available: true },
      { name: 'Ergonomic Chair', icon: '🪑', available: true },
      { name: 'Desk Lamp', icon: '💡', available: true },
      { name: 'Power Outlets', icon: '🔌', available: true },
      { name: 'Privacy Screen', icon: '🖥️', available: true },
      { name: 'Storage Locker', icon: '🗄️', available: true },
    ],
    team: [
      { name: 'Collaboration Tools', icon: '🤝', available: true },
      { name: 'Whiteboard', icon: '📝', available: true },
      { name: 'Video Conference Setup', icon: '📹', available: true },
      { name: 'Flexible Seating', icon: '🪑', available: true },
      { name: 'Presentation Screen', icon: '📺', available: true },
      { name: 'Coffee Station', icon: '☕', available: true },
      { name: 'Sound Privacy', icon: '🔇', available: true },
    ],
  };
};

// Generate workspace usage patterns for insights
// REPLACE THE ENTIRE generateUsagePatterns FUNCTION WITH THIS:
export const generateUsagePatterns = () => {
  const patterns = {
    hourlyUsage: {} as Record<string, number>,
    dailyUsage: {} as Record<string, number>,
    weeklyTrends: {} as Record<string, number>,
    seasonalPatterns: {} as Record<string, number>,
  };

  // Hourly usage (8 AM to 8 PM)
  for (let hour = 8; hour <= 20; hour++) {
    const usage = hour >= 9 && hour <= 17 
      ? Math.floor(Math.random() * 30) + 50  // Peak hours: 50-80%
      : Math.floor(Math.random() * 20) + 20; // Off hours: 20-40%
    patterns.hourlyUsage[`${hour}:00`] = usage;
  }

  // Daily usage (Monday = 1, Sunday = 0)
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  days.forEach((day, index) => {
    const isWeekend = index === 0 || index === 6;
    const usage = isWeekend 
      ? Math.floor(Math.random() * 30) + 20  // Weekend: 20-50%
      : Math.floor(Math.random() * 25) + 65; // Weekday: 65-90%
    patterns.dailyUsage[day] = usage;
  });

  return patterns;
};

// Demo notification system
export const generateNotifications = () => {
  return [
    {
      id: 'notif-1',
      type: 'success',
      title: 'Booking Confirmed',
      message: 'Your workspace reservation for tomorrow at 9:00 AM is confirmed.',
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
      read: false,
    },
    {
      id: 'notif-2',
      type: 'info',
      title: 'New Feature Available',
      message: 'Check out our new 3D virtual workspace tour!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
      read: false,
    },
    {
      id: 'notif-3',
      type: 'reminder',
      title: 'Upcoming Session',
      message: 'Your booking starts in 1 hour at Desk 5.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(), // 6 hours ago
      read: true,
    },
  ];
};

// Enhanced demo user profile
export const getDemoUserProfile = () => {
  return {
    id: 'demo-user',
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    membershipTier: 'Premium',
    joinDate: '2024-01-15',
    totalBookings: 47,
    favoriteDesk: 'Desk 3',
    preferredTimeSlot: '10:00',
    productivityScore: 87,
    badges: [
      { name: 'Early Bird', icon: '🌅', description: 'Books morning slots regularly' },
      { name: 'Consistency King', icon: '👑', description: '30+ bookings this year' },
      { name: 'Team Player', icon: '🤝', description: 'Uses team spaces frequently' },
    ],
    preferences: {
      notifications: true,
      emailUpdates: true,
      mobileReminders: true,
      theme: 'dark',
      language: 'en',
    },
  };
};

// Export all utilities for easy import
export const demoUtils = {
  generateAnalyticsData,
  generateEngagementMetrics,
  getWorkspaceAmenities,
  generateUsagePatterns,
  generateNotifications,
  getDemoUserProfile,
};
