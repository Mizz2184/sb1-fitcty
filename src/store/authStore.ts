import { create } from 'zustand';
import { 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged
} from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string | null;
  role: 'admin' | 'client';
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  signup: (fullName: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  error: null,

  loginWithGoogle: async () => {
    try {
      set({ isLoading: true, error: null });
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      // Check if user exists in Firestore
      const userRef = doc(db, 'users', result.user.uid);
      const userDoc = await getDoc(userRef);
      
      if (!userDoc.exists()) {
        // Create new user document if first time
        await setDoc(userRef, {
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
          role: 'client', // Default role for new users
          createdAt: serverTimestamp()
        });
      }

      const userData = userDoc.exists() ? userDoc.data() : { role: 'client' };

      set({
        user: {
          uid: result.user.uid,
          email: result.user.email!,
          displayName: result.user.displayName!,
          photoURL: result.user.photoURL,
          role: userData.role
        },
        isLoading: false
      });

      return userData.role; // Return role for navigation purposes
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },

  loginWithEmail: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });
      const result = await signInWithEmailAndPassword(auth, email, password);
      
      const userDoc = await getDoc(doc(db, 'users', result.user.uid));
      const userData = userDoc.exists() ? userDoc.data() : { role: 'client' };

      set({
        user: {
          uid: result.user.uid,
          email: result.user.email!,
          displayName: result.user.displayName || email,
          photoURL: result.user.photoURL,
          role: userData.role
        },
        isLoading: false
      });

      return userData.role;
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },

  signup: async (fullName: string, email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update profile with full name
      await updateProfile(result.user, {
        displayName: fullName
      });

      // Create user document in Firestore
      const userRef = doc(db, 'users', result.user.uid);
      await setDoc(userRef, {
        fullName,
        email,
        role: 'client',
        createdAt: serverTimestamp()
      });

      set({
        user: {
          uid: result.user.uid,
          email: result.user.email!,
          displayName: fullName,
          photoURL: null,
          role: 'client'
        },
        isLoading: false
      });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    try {
      await signOut(auth);
      set({ user: null, error: null });
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    }
  }
}));

// Set up auth state listener
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    const userData = userDoc.exists() ? userDoc.data() : { role: 'client' };
    
    useAuthStore.setState({
      user: {
        uid: user.uid,
        email: user.email!,
        displayName: user.displayName || user.email!,
        photoURL: user.photoURL,
        role: userData.role
      },
      isLoading: false
    });
  } else {
    useAuthStore.setState({ user: null, isLoading: false });
  }
});