import { NextRequest, NextResponse } from 'next/server';
import { PathLinks } from './types/path-links';
import { getToken } from 'next-auth/jwt';

const protectedRoutes = [
  PathLinks.CONTACTS,  
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isProtected = protectedRoutes.some(
    route => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })

  if (!token) {
    const loginUrl = new URL(PathLinks.LOGIN, req.url);
    loginUrl.searchParams.set('callbackUrl', req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/contatos/:path*'
  ],
};
