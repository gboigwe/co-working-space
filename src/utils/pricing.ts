import { MembershipTier } from '../types';

export const MEMBERSHIP_PRICES = {
  Basic: 10,
  Premium: 15,
  Executive: 20
};

export const TEAM_DESK_PRICE = 25;

export const calculatePrice = (
  membershipTier: MembershipTier,
  deskType: 'individual' | 'team',
  duration: number
): number => {
  // Get the base price per hour
  const hourlyRate = deskType === 'individual' 
    ? MEMBERSHIP_PRICES[membershipTier]
    : TEAM_DESK_PRICE;
  
  // Calculate total before discount
  let totalPrice = hourlyRate * duration;
  
  // Apply 10% discount for bookings over 3 hours
  if (duration > 3) {
    totalPrice = totalPrice * 0.9;
  }
  
  return Number(totalPrice.toFixed(2));
};