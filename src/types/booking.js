export type Booking = {
  id: string;
  roomId: string;
  name: string;
  phone: string;
  email?: string;
  date: string;
  guests: number;
  mealPlan: string;
  extras: string[];
  comment: string;
  createdAt: string;
};
