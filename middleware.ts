import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSession } from './utils/auth';

export function middleware(request: NextRequest) {
  const userInfo = getSession();

  const { pathname, searchParams } = request.nextUrl;

  if (pathname === '/login' && !searchParams.get('invalid') && userInfo)
    return NextResponse.redirect(new URL('/', request.url));
  if (
    (pathname === '/welcome' ||
      pathname.includes('/mypage') ||
      // pathname.includes('/find-taste') ||
      pathname.includes('/reviews')) &&
    !userInfo
  )
    return NextResponse.redirect(new URL('/login', request.url));
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/login',
    '/welcome',
    '/mypage/:path',
    // '/find-taste/:path',
    '/perfumes/:path/reviews/new',
  ],
};
