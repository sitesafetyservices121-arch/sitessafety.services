
"use server";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { auth } from "./firebase";
import { redirect } from 'next/navigation';

export async function signUpWithEmail(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return {
      message: `User signed up successfully.`,
      user: userCredential.user,
    };
  } catch (error: any) {
    return { message: error.message, user: null };
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
    return { message: error.message, user: null };
  }
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
  } catch (error: any) {
    console.error("Google Sign-in Error:", error);
    return { message: error.message };
  }
  redirect('/account');
}

export async function signOut() {
  try {
    await firebaseSignOut(auth);
  } catch (error: any) {
    return { message: error.message };
  }
  redirect('/');
}
