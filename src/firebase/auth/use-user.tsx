// src/firebase/auth/use-user.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth, useFirestore, type UserProfile } from '../provider';
import { useDoc } from '../firestore/use-doc';

// Augment the Firebase User type to include our custom profile
export type UserWithProfile = User & {
  userProfile?: UserProfile | null;
};

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
