import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface AppointmentData {
  userEmail: string;
  date: Date;
  time: string;
  services: Array<{
    name: string;
    price: number;
  }>;
  totalAmount: number;
  barber: string;
}

export const createAppointment = async (appointmentData: AppointmentData) => {
  try {
    const appointmentRef = await addDoc(collection(db, 'appointments'), {
      ...appointmentData,
      createdAt: serverTimestamp(),
      status: 'confirmed'
    });
    return appointmentRef.id;
  } catch (error) {
    console.error('Error creating appointment:', error);
    throw new Error('Failed to create appointment');
  }
};