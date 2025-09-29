
// src/app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase/admin';

// Set session cookie options
const SESSION_COOKIE_OPTIONS = {
  maxAge: 60 * 60 * 24 * 5 * 1000, // 5 days in milliseconds
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  sameSite: 'lax' as const,
};

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ message: 'Missing or invalid Authorization header.' }, { status: 401 });
  }

  const idToken = authHeader.split('Bearer ')[1];

  try {
    // Verify the ID token to ensure it's valid and from a trusted source
    await adminAuth.verifyIdToken(idToken);
    
    // The cookie name should be secure and preferably prefixed
    const cookieName = 'firebase-auth-token';

    const response = NextResponse.json({ success: true, message: 'Login successful.' }, { status: 200 });

    // Set the session cookie
    response.cookies.set(cookieName, idToken, SESSION_COOKIE_OPTIONS);

    return response;

  } catch (error) {
    console.error('Error creating session cookie:', error);
    return NextResponse.json({ message: 'Authentication failed. Please try again.' }, { status: 401 });
  }
}
