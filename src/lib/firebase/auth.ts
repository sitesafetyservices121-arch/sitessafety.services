"use server";

import { signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "./firebase";
import { redirect } from "next/navigation";

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
