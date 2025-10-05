// src/firebase/client-provider.tsx
'use client';
import { useState, useEffect, type ReactNode } from 'react';
import { FirebaseProvider, type FirebaseContextValue } from './provider';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from './config';
import { TopLoader } from '@/components/top-loader';

function initializeFirebase(): FirebaseContextValue {
  const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  const auth = getAuth(app);
  const firestore = getFirestore(app);
  return { app, auth, firestore };
}

export function FirebaseClientProvider({ children }: { children: ReactNode }) {
  const [firebase, setFirebase] = useState<FirebaseContextValue | null>(null);

  useEffect(() => {
    // This effect runs only on the client, after the component has mounted.
    // It initializes Firebase and sets the context value.
    if (typeof window !== 'undefined' && !firebase) {
      setFirebase(initializeFirebase());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!firebase) {
    // While initializing on the client, show a loader.
    // This prevents any child components from trying to use Firebase
    // before it's ready.
    return <TopLoader />;
  }

  return <FirebaseProvider value={firebase}>{children}</FirebaseProvider>;
}
