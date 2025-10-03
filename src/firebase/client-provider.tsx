// src/firebase/client-provider.tsx
'use client';
import { useMemo, type ReactNode } from 'react';
import { initializeFirebase } from '.';
import { FirebaseProvider } from './provider';

export function FirebaseClientProvider({ children }: { children: ReactNode }) {
  const value = useMemo(() => initializeFirebase(), []);

  return <FirebaseProvider value={value}>{children}</FirebaseProvider>;
}
