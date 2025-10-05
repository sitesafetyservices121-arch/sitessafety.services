// src/firebase/auth/sign-out.ts
"use client";
import { getAuth, signOut as firebaseSignOut } from "firebase/auth";
import { useFirebaseApp } from "@/firebase/provider";

export function signOut() {
    const app = useFirebaseApp();
    const auth = getAuth(app);
    return firebaseSignOut(auth);
}
