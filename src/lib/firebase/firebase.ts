
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBIWqnQLELz_wOemo-mc7HV6mYeuh6FQJM",
  authDomain: "rak-site-safety-services-vn21z.firebaseapp.com",
  projectId: "rak-site-safety-services-vn21z",
  storageBucket: "rak-site-safety-services-vn21z.appspot.com",
  messagingSenderId: "1048163634498",
  appId: "1:1048163634498:web:f7c0ba3f89b17b6aa00cdb"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
