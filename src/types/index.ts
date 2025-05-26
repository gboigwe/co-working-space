export type MembershipTier = 'Basic' | 'Premium' | 'Executive';

export interface Desk {
  id: number;
  name: string;
  type: 'individual' | 'team';
  isAvailable: boolean;
}

export interface Booking {
  id: string;
  userId: string;
  deskId: number;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  membershipTier: MembershipTier;
  totalPrice: number;
}

export interface TimeSlot {
  id: string;
  time: string;
  isAvailable: boolean;
}
