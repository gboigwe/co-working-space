import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Desk, Booking, TimeSlot } from '../types';
import { generateDesks, generateTimeSlots, generateBookings } from '../utils/mockData';
import { calculatePrice } from '../utils/pricing';
import { useAuth } from './AuthContext';

interface BookingContextType {
  desks: Desk[];
  timeSlots: TimeSlot[];
  bookings: Booking[];
  selectedDate: string;
  selectedDesk: Desk | null;
  selectedStartTime: string;
  selectedEndTime: string;
  setSelectedDate: (date: string) => void;
  setSelectedDesk: (desk: Desk | null) => void;
  setSelectedStartTime: (time: string) => void;
  setSelectedEndTime: (time: string) => void;
  calculateBookingPrice: () => number;
  createBooking: () => Promise<Booking | null>;
  isDeskAvailable: (deskId: number, date: string, startTime: string, endTime: string) => boolean;
  userBookings: Booking[];
  cancelBooking: (bookingId: string) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  const [desks, setDesks] = useState<Desk[]>(generateDesks());
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(generateTimeSlots());
  const [bookings, setBookings] = useState<Booking[]>(generateBookings());
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedDesk, setSelectedDesk] = useState<Desk | null>(null);
  const [selectedStartTime, setSelectedStartTime] = useState<string>('');
  const [selectedEndTime, setSelectedEndTime] = useState<string>('');
  const [userBookings, setUserBookings] = useState<Booking[]>([]);

  useEffect(() => {
    if (currentUser) {
      const filteredBookings = bookings.filter(booking => booking.userId === currentUser.id);
      setUserBookings(filteredBookings);
    } else {
      setUserBookings([]);
    }
  }, [currentUser, bookings]);

  const calculateBookingPrice = (): number => {
    if (!selectedDesk || !selectedStartTime || !selectedEndTime || !currentUser) {
      return 0;
    }

    const startHour = parseInt(selectedStartTime.split(':')[0]);
    const endHour = parseInt(selectedEndTime.split(':')[0]);
    const duration = endHour - startHour;

    if (duration <= 0) {
      return 0;
    }

    return calculatePrice(
      currentUser.membershipTier,
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
    if (!selectedDesk || !selectedStartTime || !selectedEndTime || !currentUser) {
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
      userId: currentUser.id,
      deskId: selectedDesk.id,
      date: selectedDate,
      startTime: selectedStartTime,
      endTime: selectedEndTime,
      duration,
      membershipTier: currentUser.membershipTier,
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
      setSelectedDate,
      setSelectedDesk,
      setSelectedStartTime,
      setSelectedEndTime,
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