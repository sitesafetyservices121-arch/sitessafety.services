
"use server";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { auth, db } from "./firebase";
import { redirect } from 'next/navigation';
import { doc, setDoc } from "firebase/firestore";

export async function signUpWithEmail(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Create a document in the 'users' collection in Firestore
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      createdAt: new Date(),
      isAdmin: false, // Default role
    });
    
    return {
      message: `User signed up and data stored successfully.`,
      user: user,
    };
  } catch (error: any) {
    // Firebase provides structured error codes, which are more reliable
    // to check than the message string.
    if (error.code === 'auth/email-already-in-use') {
        return { message: "This email address is already in use.", user: null };
    }
    // Return a generic error for other issues
    return { message: "An unexpected error occurred. Please try again.", user: null };
  }
}


export async function signInWithEmail(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return {
      message: `User signed in successfully.`,
      user: userCredential.user,
    };
  } catch (error: any) {
    if (error.code === 'auth/invalid-credential') {
        return { message: "Invalid email or password. Please try again.", user: null };
    }
    return { message: "An unexpected error occurred. Please try again.", user: null };
  }
}

export async function signOut() {
  try {
    await firebaseSignOut(auth);
  } catch (error: any) {
    console.error("Error signing out:", error);
    throw error; // Re-throw the error to be handled by the form or a higher-level error boundary
  }
  redirect('/');
}
