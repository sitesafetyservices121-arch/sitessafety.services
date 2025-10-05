// src/firebase/index.ts
'use client';

// This is the main "barrel" file for all Firebase-related functionality.
// It exports everything from the other files in this directory,
// making it easy to import anything from Firebase with a single import statement.

export * from './config';
export * from './provider';
export * from './client-provider';
export * from './firestore/use-doc';
export * from './auth/use-user';
export * from './auth/sign-out';
