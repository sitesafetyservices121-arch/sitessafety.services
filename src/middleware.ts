
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('firebaseIdToken');

  const protectedRoutes = [
    '/rent-a-safety-officer',
    '/e-safety-file',
    '/safety-management-system/signup',
    '/account'
  ];

  const { pathname } = request.nextUrl;

  if (!token && protectedRoutes.some(p => pathname.startsWith(p))) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/rent-a-safety-officer/:path*',
    '/e-safety-file/:path*',
    '/safety-management-system/signup/:path*',
    '/account/:path*',
  ],
};
