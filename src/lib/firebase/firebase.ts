// lib/firebase.ts
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";
import { getFunctions, type Functions } from "firebase/functions";
import { getAnalytics, type Analytics, isSupported } from "firebase/analytics";

// 🔑 Firebase config validation and loading
function getFirebaseConfig() {
  const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  };

  // Validate required config for core services
  const requiredFields = ['apiKey', 'authDomain', 'projectId', 'appId'] as const;
  const missingFields = requiredFields.filter(field => !config[field]);

  if (missingFields.length > 0) {
    throw new Error(
      `Missing required Firebase configuration: ${missingFields.join(', ')}. ` +
      `Please check your environment variables.`
    );
  }

  return config;
}

// 🔥 Initialize Firebase app (safe for hot reload and SSR)
let app: FirebaseApp | null = null;
let firebaseConfig: ReturnType<typeof getFirebaseConfig> | null = null;

try {
  firebaseConfig = getFirebaseConfig();
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
} catch (error) {
  console.error('Firebase initialization failed:', error);
  // We don't re-throw here to allow the app to run in environments
  // where client-side firebase is not needed, but we should handle this gracefully.
}

// 🔐 Initialize Auth
export const auth: Auth = app ? getAuth(app) : ({} as Auth);

// 📦 Initialize Firestore
export const db: Firestore = app ? getFirestore(app) : ({} as Firestore);

// 📂 Initialize Storage
export const storage: FirebaseStorage = app ? getStorage(app) : ({} as FirebaseStorage);

// ⚙️ Initialize Cloud Functions
// You can change the region here if needed
export const functions: Functions = app ? getFunctions(app, "us-central1") : ({} as Functions);

// 📊 Initialize Analytics (browser-only, with proper support check)
let analytics: Analytics | null = null;

if (typeof window !== "undefined" && app && firebaseConfig?.measurementId) {
  // Check if analytics is supported and measurementId is available
  isSupported()
    .then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
      }
    })
    .catch((error) => {
      console.warn('Firebase Analytics initialization check failed:', error);
    });
}

// Helper function to safely get analytics
export const getAnalyticsInstance = (): Analytics | null => analytics;

// Export the app instance
export { app };

// Export types for use in other files
export type {
  FirebaseApp,
  Auth,
  Firestore,
  FirebaseStorage,
  Functions,
  Analytics
};

// Helper functions for common checks
export const isClientSide = (): boolean => typeof window !== "undefined";
export const isAnalyticsAvailable = (): boolean => analytics !== null;

// Configuration getter (useful for debugging)
export const getProjectId = (): string | undefined => {
  return app?.options.projectId || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
};

// Development helper to log configuration status
if (process.env.NODE_ENV === 'development' && app) {
  try {
    const projectId = getProjectId();
    console.log('🔥 Firebase initialized:', {
      projectId: projectId,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      isClientSide: isClientSide(),
    });
    if (projectId) {
        console.log(`➡️ Your Authorized Redirect URI for Firebase is: https://${projectId}.firebaseapp.com/__/auth/handler`);
    }
  } catch (e) {
    console.error("Could not log Firebase initialization status.");
  }
}
