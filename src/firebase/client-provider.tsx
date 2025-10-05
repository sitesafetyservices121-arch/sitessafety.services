// src/firebase/client-provider.tsx
'use client';
import { useMemo, type ReactNode } from 'react';
import { FirebaseProvider } from './provider';
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { firebaseConfig } from './config';

function initializeFirebase(): { app: FirebaseApp; auth: Auth; firestore: Firestore } {
  if (typeof window === 'undefined') {
    // This is a safeguard. This function should not be called on the server.
    throw new Error("Firebase can only be initialized on the client.");
  }
  const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  const auth = getAuth(app);
  const firestore = getFirestore(app);
  return { app, auth, firestore };
}


export function FirebaseClientProvider({ children }: { children: ReactNode }) {
  const value = useMemo(() => initializeFirebase(), []);

  return <FirebaseProvider value={value}>{children}</FirebaseProvider>;
}
