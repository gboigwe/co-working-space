import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Desk, Booking, TimeSlot, MembershipTier } from '../types';
import { generateDesks, generateTimeSlots, generateBookings } from '../utils/mockData';
import { calculatePrice } from '../utils/pricing';

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
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [desks, setDesks] = useState<Desk[]>(generateDesks());
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(generateTimeSlots());
  const [bookings, setBookings] = useState<Booking[]>(generateBookings());
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedDesk, setSelectedDesk] = useState<Desk | null>(null);
  const [selectedStartTime, setSelectedStartTime] = useState<string>('');
  const [selectedEndTime, setSelectedEndTime] = useState<string>('');
  const [selectedMembershipTier, setSelectedMembershipTier] = useState<MembershipTier>('Premium');
  const [userBookings, setUserBookings] = useState<Booking[]>([]);

  useEffect(() => {
    // For demo purposes, show all bookings as user bookings
    setUserBookings(bookings);
  }, [bookings]);

  const calculateBookingPrice = (): number => {
    if (!selectedDesk || !selectedStartTime || !selectedEndTime) {
      return 0;
    }

    const startHour = parseInt(selectedStartTime.split(':')[0]);
    const endHour = parseInt(selectedEndTime.split(':')[0]);
    const duration = endHour - startHour;

    if (duration <= 0) {
      return 0;
    }

    return calculatePrice(
      selectedMembershipTier,
      selectedDesk.type,
      duration
    );
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

    const totalPrice = calculateBookingPrice();

    const newBooking: Booking = {
      id: `booking-${Date.now()}`,
      userId: 'demo-user', // Static user ID for demo
      deskId: selectedDesk.id,
      date: selectedDate,
      startTime: selectedStartTime,
      endTime: selectedEndTime,
      duration,
      membershipTier: selectedMembershipTier,
      totalPrice,
    };

    setBookings([...bookings, newBooking]);
    
    // Reset selection
    setSelectedDesk(null);
    setSelectedStartTime('');
    setSelectedEndTime('');

    return newBooking;
  };

  const cancelBooking = (bookingId: string) => {
    setBookings(bookings.filter(booking => booking.id !== bookingId));
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
