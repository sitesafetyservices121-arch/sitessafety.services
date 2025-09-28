
"use server";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { auth, db } from "./firebase";
import { redirect } from "next/navigation";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

// 🆕 Sign up
export async function signUpWithEmail(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    // 1. Create auth user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // 2. Create Firestore user doc
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      createdAt: serverTimestamp(),
      isAdmin: false, // default role
    });

    return {
      message: "User signed up and profile created successfully.",
      user,
    };
  } catch (error: any) {
    if (error.code === "auth/email-already-in-use") {
      return { message: "This email address is already in use.", user: null };
    }
    if (error.code === "auth/weak-password") {
      return { message: "Password is too weak. Please choose a stronger one.", user: null };
    }
    return { message: "An unexpected error occurred. Please try again.", user: null };
  }
}

// 🔑 Sign in
export async function signInWithEmail(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    // 1. Sign in
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // 2. Fetch Firestore profile
    const userDoc = await getDoc(doc(db, "users", user.uid));
    const profile = userDoc.exists() ? userDoc.data() : null;

    return {
      message: "User signed in successfully.",
      user,
      profile,
    };
  } catch (error: any) {
    if (error.code === "auth/invalid-credential" || error.code === "auth/wrong-password") {
      return { message: "Invalid email or password. Please try again.", user: null };
    }
    if (error.code === "auth/user-not-found") {
      return { message: "No account found with this email.", user: null };
    }
    return { message: "An unexpected error occurred. Please try again.", user: null };
  }
}

// 🚪 Sign out
export async function signOut() {
  try {
    await firebaseSignOut(auth);
  } catch (error: any) {
    console.error("Error signing out:", error);
    throw error; // handled by Next.js error boundary if needed
  }
  redirect("/"); // send back to homepage
}
