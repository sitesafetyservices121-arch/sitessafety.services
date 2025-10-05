// src/firebase/auth/sign-out.ts
"use client";
import { getAuth, signOut as firebaseSignOut } from "firebase/auth";

export function signOut(auth: any) {
    return firebaseSignOut(auth);
}
