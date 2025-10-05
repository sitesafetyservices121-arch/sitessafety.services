// src/lib/firebase/auth.ts
"use server";

import { signOut as firebaseSignOut } from "firebase/auth";
import { getAuth } from "firebase/auth"; // Changed import
import { app } from "./firebase"; // Import app
import { redirect } from "next/navigation";

const auth = getAuth(app); // Get auth instance

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
