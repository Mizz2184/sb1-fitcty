import { db } from './firebase';
import { collection, addDoc, serverTimestamp, doc, updateDoc, arrayUnion } from 'firebase/firestore';

export const createAppointment = async (appointmentData: any) => {
  try {
    // Create the appointment document
    const appointmentRef = await addDoc(collection(db, 'appointments'), {
      ...appointmentData,
      createdAt: serverTimestamp()
    });

    // Update user's appointments array
    const userRef = doc(db, 'users', appointmentData.userId);
    await updateDoc(userRef, {
      appointments: arrayUnion(appointmentRef.id)
    });

    return appointmentRef.id;
  } catch (error) {
    throw new Error('Failed to create appointment');
  }
};

export const createPayment = async (paymentData: any) => {
  try {
    // Create the payment document
    const paymentRef = await addDoc(collection(db, 'payments'), {
      ...paymentData,
      createdAt: serverTimestamp()
    });

    // Update user's payments array
    const userRef = doc(db, 'users', paymentData.userId);
    await updateDoc(userRef, {
      payments: arrayUnion(paymentRef.id)
    });

    return paymentRef.id;
  } catch (error) {
    throw new Error('Failed to process payment');
  }
};