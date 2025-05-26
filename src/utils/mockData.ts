import { Desk, Booking, TimeSlot } from '../types';

// Generate 10 individual desks
export const generateDesks = (): Desk[] => {
  const individualDesks = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: `Desk ${i + 1}`,
    type: 'individual' as const,
    isAvailable: Math.random() > 0.3, // Randomly set some desks as unavailable
  }));

  // Generate 5 team desks
  const teamDesks = Array.from({ length: 5 }, (_, i) => ({
    id: i + 11,
    name: `Team ${i + 1}`,
    type: 'team' as const,
    isAvailable: Math.random() > 0.3, // Randomly set some desks as unavailable
  }));

  return [...individualDesks, ...teamDesks];
};

// Generate time slots from 8 AM to 8 PM
export const generateTimeSlots = (): TimeSlot[] => {
  const timeSlots: TimeSlot[] = [];
  for (let hour = 8; hour <= 20; hour++) {
    timeSlots.push({
      id: `time-${hour}`,
      time: `${hour}:00`,
      isAvailable: Math.random() > 0.2,
    });
  }
  return timeSlots;
};

// Generate sample bookings
export const generateBookings = (): Booking[] => {
  return [
    {
      id: '1',
      userId: 'demo-user',
      deskId: 1,
      date: '2025-01-15',
      startTime: '9:00',
      endTime: '12:00',
      duration: 3,
      membershipTier: 'Basic',
      totalPrice: 30,
    },
    {
      id: '2',
      userId: 'demo-user',
      deskId: 5,
      date: '2025-01-16',
      startTime: '13:00',
      endTime: '18:00',
      duration: 5,
      membershipTier: 'Premium',
      totalPrice: 67.5, // 15 * 5 * 0.9 (10% discount)
    },
    {
      id: '3',
      userId: 'demo-user',
      deskId: 11,
      date: '2025-01-17',
      startTime: '10:00',
      endTime: '14:00',
      duration: 4,
      membershipTier: 'Executive',
      totalPrice: 90, // Team desk: 25 * 4 * 0.9 (10% discount)
    },
  ];
};
