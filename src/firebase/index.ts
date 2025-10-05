// src/firebase/index.ts
'use client';

import { FirebaseProvider, useFirebase, useFirebaseApp, useFirestore, useAuth, useUser } from './provider';
import { FirebaseClientProvider } from './client-provider';
import { useDoc } from './firestore/use-doc';

export {
  FirebaseProvider,
  FirebaseClientProvider,
  useFirebase,
  useFirebaseApp,
  useFirestore,
  useAuth,
  useUser,
  useDoc,
};
