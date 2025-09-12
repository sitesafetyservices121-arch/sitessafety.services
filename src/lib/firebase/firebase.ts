
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  projectId: "rak-site-safety-services-vn21z",
  appId: "1:1048163634498:web:fd0469340bdeb36aa00cdb",
  storageBucket: "rak-site-safety-services-vn21z.firebasestorage.app",
  apiKey: "AIzaSyBIWqnQLELz_wOemo-mc7HV6mYeuh6FQJM",
  authDomain: "rak-site-safety-services-vn21z.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "1048163634498"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
