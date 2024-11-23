import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB_neXSb4kGeSZ-sls8OIw40m-D8SBLcvE",
  authDomain: "barberapp-bf433.firebaseapp.com",
  projectId: "barberapp-bf433",
  storageBucket: "barberapp-bf433.firebasestorage.app",
  messagingSenderId: "518150170176",
  appId: "1:518150170176:web:d2ed2b0ecc52cce9d321a5"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);