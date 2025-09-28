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

  // Basic validation
  if (!email || !password) {
    return { 
      message: "Email and password are required.", 
      user: null,
      success: false 
    };
  }

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

    // Redirect after successful signup
    redirect("/dashboard"); // or wherever you want to send new users

  } catch (error: any) {
    console.error("Signup error:", error);
    
    if (error.code === "auth/email-already-in-use") {
      return { 
        message: "This email address is already in use.", 
        user: null, 
        success: false 
      };
    }
    if (error.code === "auth/weak-password") {
      return { 
        message: "Password is too weak. Please choose a stronger one.", 
        user: null, 
        success: false 
      };
    }
    if (error.code === "auth/invalid-email") {
      return { 
        message: "Please enter a valid email address.", 
        user: null, 
        success: false 
      };
    }
    return { 
      message: "An unexpected error occurred. Please try again.", 
      user: null, 
      success: false 
    };
  }
}

// 🔑 Sign in
export async function signInWithEmail(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Basic validation
  if (!email || !password) {
    return { 
      message: "Email and password are required.", 
      user: null,
      profile: null,
      success: false 
    };
  }

  try {
    // 1. Sign in
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // 2. Fetch Firestore profile
    const userDoc = await getDoc(doc(db, "users", user.uid));
    const profile = userDoc.exists() ? userDoc.data() : null;

    // Redirect after successful signin
    redirect("/dashboard"); // or wherever you want to send signed-in users

  } catch (error: any) {
    console.error("Signin error:", error);
    
    if (error.code === "auth/invalid-credential" || 
        error.code === "auth/wrong-password" || 
        error.code === "auth/invalid-login-credentials") {
      return { 
        message: "Invalid email or password. Please try again.", 
        user: null, 
        profile: null,
        success: false 
      };
    }
    if (error.code === "auth/user-not-found") {
      return { 
        message: "No account found with this email.", 
        user: null, 
        profile: null,
        success: false 
      };
    }
    if (error.code === "auth/too-many-requests") {
      return { 
        message: "Too many failed attempts. Please try again later.", 
        user: null, 
        profile: null,
        success: false 
      };
    }
    return { 
      message: "An unexpected error occurred. Please try again.", 
      user: null, 
      profile: null,
      success: false 
    };
  }
}

// 🚪 Sign out
export async function signOut() {
  try {
    await firebaseSignOut(auth);
    redirect("/"); // send back to homepage
  } catch (error: any) {
    console.error("Error signing out:", error);
    // Don't redirect if sign out fails
    throw new Error("Failed to sign out. Please try again.");
  }
}