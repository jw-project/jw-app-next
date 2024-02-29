import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { origin, href } = request.nextUrl;
  const session = request.cookies.get('fb:token');
  const uidUser = request.cookies.get('uidUser');

  if (!session || !uidUser) {
    return NextResponse.redirect(`${origin}/login?redirect=${href}`);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|login).*)',
};
