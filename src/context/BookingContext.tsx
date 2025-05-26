import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Desk, Booking, TimeSlot, MembershipTier } from '../types';
import { generateDesks, generateTimeSlots } from '../utils/mockData';

interface BookingContextType {
  desks: Desk[];
  timeSlots: TimeSlot[];
  bookings: Booking[];
  selectedDate: string;
  selectedDesk: Desk | null;
  selectedStartTime: string;
  selectedEndTime: string;
  selectedMembershipTier: MembershipTier;
  setSelectedDate: (date: string) => void;
  setSelectedDesk: (desk: Desk | null) => void;
  setSelectedStartTime: (time: string) => void;
  setSelectedEndTime: (time: string) => void;
  setSelectedMembershipTier: (tier: MembershipTier) => void;
  calculateBookingPrice: () => number;
  createBooking: () => Promise<Booking | null>;
  isDeskAvailable: (deskId: number, date: string, startTime: string, endTime: string) => boolean;
  userBookings: Booking[];
  cancelBooking: (bookingId: string) => void;
  loadDemoBookings: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [desks, setDesks] = useState<Desk[]>(generateDesks());
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(generateTimeSlots());
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedDesk, setSelectedDesk] = useState<Desk | null>(null);
  const [selectedStartTime, setSelectedStartTime] = useState<string>('');
  const [selectedEndTime, setSelectedEndTime] = useState<string>('');
  const [selectedMembershipTier, setSelectedMembershipTier] = useState<MembershipTier>('Premium');
  const [userBookings, setUserBookings] = useState<Booking[]>([]);

  // Load demo bookings from localStorage on mount
  useEffect(() => {
    loadDemoBookings();
  }, []);

  // Update user bookings when bookings change
  useEffect(() => {
    setUserBookings(bookings);
  }, [bookings]);

  const loadDemoBookings = () => {
    try {
      const storedBookings = localStorage.getItem('demoBookings');
      if (storedBookings) {
        const parsedBookings = JSON.parse(storedBookings);
        setBookings(parsedBookings);
      } else {
        // Initialize with some sample bookings for demo
        const initialBookings = generateInitialDemoBookings();
        setBookings(initialBookings);
        localStorage.setItem('demoBookings', JSON.stringify(initialBookings));
      }
    } catch (error) {
      console.error('Error loading demo bookings:', error);
      // Fallback to initial bookings
      const initialBookings = generateInitialDemoBookings();
      setBookings(initialBookings);
    }
  };

  const generateInitialDemoBookings = (): Booking[] => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfter = new Date(today);
    dayAfter.setDate(dayAfter.getDate() + 2);

    return [
      {
        id: 'demo-1',
        userId: 'demo-user',
        deskId: 1,
        date: today.toISOString().split('T')[0],
        startTime: '9:00',
        endTime: '12:00',
        duration: 3,
        membershipTier: 'Basic',
        totalPrice: 0, // Removed pricing
      },
      {
        id: 'demo-2',
        userId: 'demo-user',
        deskId: 5,
        date: tomorrow.toISOString().split('T')[0],
        startTime: '13:00',
        endTime: '18:00',
        duration: 5,
        membershipTier: 'Premium',
        totalPrice: 0, // Removed pricing
      },
      {
        id: 'demo-3',
        userId: 'demo-user',
        deskId: 11,
        date: dayAfter.toISOString().split('T')[0],
        startTime: '10:00',
        endTime: '14:00',
        duration: 4,
        membershipTier: 'Executive',
        totalPrice: 0, // Removed pricing
      },
    ];
  };

  const saveDemoBookings = (newBookings: Booking[]) => {
    try {
      localStorage.setItem('demoBookings', JSON.stringify(newBookings));
    } catch (error) {
      console.error('Error saving demo bookings:', error);
    }
  };

  const calculateBookingPrice = (): number => {
    // Removed pricing calculation - return 0 for demo
    return 0;
  };

  const isDeskAvailable = (
    deskId: number, 
    date: string, 
    startTime: string, 
    endTime: string
  ): boolean => {
    const startHour = parseInt(startTime.split(':')[0]);
    const endHour = parseInt(endTime.split(':')[0]);

    // Check if there are any overlapping bookings
    const overlappingBookings = bookings.filter(booking => {
      if (booking.deskId !== deskId || booking.date !== date) {
        return false;
      }

      const bookingStartHour = parseInt(booking.startTime.split(':')[0]);
      const bookingEndHour = parseInt(booking.endTime.split(':')[0]);

      // Check for any overlap in time ranges
      return (
        (startHour < bookingEndHour && endHour > bookingStartHour) ||
        (bookingStartHour < endHour && bookingEndHour > startHour)
      );
    });

    return overlappingBookings.length === 0;
  };

  const createBooking = async (): Promise<Booking | null> => {
    if (!selectedDesk || !selectedStartTime || !selectedEndTime) {
      return null;
    }

    const startHour = parseInt(selectedStartTime.split(':')[0]);
    const endHour = parseInt(selectedEndTime.split(':')[0]);
    const duration = endHour - startHour;

    if (duration <= 0) {
      return null;
    }

    // Check if the desk is available for the selected time
    if (!isDeskAvailable(selectedDesk.id, selectedDate, selectedStartTime, selectedEndTime)) {
      return null;
    }

    const newBooking: Booking = {
      id: `booking-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      userId: 'demo-user',
      deskId: selectedDesk.id,
      date: selectedDate,
      startTime: selectedStartTime,
      endTime: selectedEndTime,
      duration,
      membershipTier: selectedMembershipTier,
      totalPrice: 0, // No pricing in demo
    };

    const updatedBookings = [...bookings, newBooking];
    setBookings(updatedBookings);
    saveDemoBookings(updatedBookings);
    
    // Reset selection
    setSelectedDesk(null);
    setSelectedStartTime('');
    setSelectedEndTime('');

    // Add success animation or notification here if needed
    console.log('Booking created successfully:', newBooking);

    return newBooking;
  };

  const cancelBooking = (bookingId: string) => {
    const updatedBookings = bookings.filter(booking => booking.id !== bookingId);
    setBookings(updatedBookings);
    saveDemoBookings(updatedBookings);
    
    // Add cancellation notification here if needed
    console.log('Booking cancelled:', bookingId);
  };

  return (
    <BookingContext.Provider value={{
      desks,
      timeSlots,
      bookings,
      selectedDate,
      selectedDesk,
      selectedStartTime,
      selectedEndTime,
      selectedMembershipTier,
      setSelectedDate,
      setSelectedDesk,
      setSelectedStartTime,
      setSelectedEndTime,
      setSelectedMembershipTier,
      calculateBookingPrice,
      createBooking,
      isDeskAvailable,
      userBookings,
      cancelBooking,
      loadDemoBookings,
    }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = (): BookingContextType => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
