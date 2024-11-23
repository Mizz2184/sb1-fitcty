export interface Service {
  id: string;
  name: string;
  duration: number;
  price: number;
  description: string;
}

export interface Barber {
  id: string;
  name: string;
  image: string;
  specialties: string[];
  rating: number;
  availability: Availability[];
}

export interface Availability {
  day: number;
  startTime: string;
  endTime: string;
  breaks?: { start: string; end: string }[];
}

export interface Appointment {
  id: string;
  customerId: string;
  barberId: string;
  services: Service[];
  date: Date;
  status: 'confirmed' | 'cancelled' | 'completed' | 'pending';
  totalPrice: number;
  totalDuration: number;
}