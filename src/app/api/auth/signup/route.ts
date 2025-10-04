
// src/app/api/auth/signup/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, isAdminInitialized } from '@/lib/firebase/admin';

const SESSION_COOKIE_OPTIONS = {
  maxAge: 60 * 60 * 24 * 5 * 1000, // 5 days
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  sameSite: 'lax' as const,
};

export async function POST(request: NextRequest) {
  if (!isAdminInitialized() || !adminAuth) {
    console.error("Firebase Admin SDK not initialized.");
    return NextResponse.json({ message: "Server configuration error." }, { status: 500 });
  }

  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required.' }, { status: 400 });
    }

    await adminAuth.createUser({
      email,
      password,
    });

    return NextResponse.json({ success: true, message: 'Signup successful.' }, { status: 200 });

  } catch (error: any) {
    console.error('Error creating user:', error);

    if (error.code === 'auth/email-already-exists') {
      return NextResponse.json({ message: 'This email address is already in use.' }, { status: 409 });
    }
    
    if (error.code === 'auth/invalid-password') {
        return NextResponse.json({ message: 'Password is too weak. Please choose a stronger one.' }, { status: 400 });
    }

    return NextResponse.json({ message: 'An unexpected error occurred. Please try again.' }, { status: 500 });
  }
}
