// src/firebase/provider.tsx
'use client';
import type { FirebaseApp } from 'firebase/app';
import type { Auth, User } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';
import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
  useState,
  useEffect,
} from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useDoc } from './firestore/use-doc';

// Define the shape of your user profile document in Firestore
export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  lastLogin: any; // Using `any` for serverTimestamp flexibility
  role?: 'admin' | 'user';
}

// Augment the Firebase User type to include our custom profile
export type UserWithProfile = User & {
  userProfile?: UserProfile | null;
};


export type FirebaseContextValue = {
  app: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
};

const FirebaseContext = createContext<FirebaseContextValue | undefined>(
  undefined
);

export function FirebaseProvider({
  value,
  children,
}: {
  value: FirebaseContextValue;
  children: ReactNode;
}) {
  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
}

export function useFirebase() {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
}

export function useFirebaseApp() {
  return useFirebase().app;
}

export function useFirestore() {
  return useFirebase().firestore;
}

export function useAuth() {
  return useFirebase().auth;
}

export function useUser() {
  const auth = useAuth();
  const firestore = useFirestore();
  const [user, setUser] = useState<UserWithProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Memoize the document reference to prevent re-renders
  const userDocRef = useMemo(() => {
    if (!user || !firestore) return null; // Add guard for firestore
    return doc(firestore, 'users', user.uid);
  }, [user, firestore]);

  const { data: userProfile, loading: profileLoading } = useDoc<UserProfile>(userDocRef);

  useEffect(() => {
    if (!auth || !firestore) {
      setLoading(false);
      return;
    };

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser); // Set the base user immediately
        const userRef = doc(firestore, 'users', firebaseUser.uid);

        // Write user data to Firestore on login/signup, but importantly,
        // use { merge: true } to avoid overwriting existing fields like 'role'.
        try {
            await setDoc(userRef, {
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                displayName: firebaseUser.displayName,
                photoURL: firebaseUser.photoURL,
                lastLogin: serverTimestamp(),
            }, { merge: true });
        } catch (error) {
            console.error("Error writing user data to Firestore:", error);
        }

      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth, firestore]);

  // Combine user and profile data once both are loaded
  const userWithProfile = useMemo(() => {
    if (user && userProfile) {
      return {
        ...user,
        userProfile: userProfile,
      };
    }
    return user;
  }, [user, userProfile]);

  return {
    user: userWithProfile,
    userProfile, // You can still access the raw profile if needed
    loading: loading || (user != null && profileLoading), // Only consider profile loading if a user exists
  };
}
