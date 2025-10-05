// src/firebase/provider.tsx
'use client';
import type { FirebaseApp } from 'firebase/app';
import type { Auth, User } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';
import {
  createContext,
  useContext,
  type ReactNode,
} from 'react';

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
