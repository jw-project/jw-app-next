import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostname = request.headers.get('host');
  const protocol = request.headers.get('x-forwarded-proto');
  const baseUrl = `${protocol}://${hostname}`;

  const session = request.cookies.get('fb:token')?.value;
  const uidUser = request.cookies.get('uidUser')?.value;

  if (!session || !uidUser) {
    return NextResponse.redirect(
      `${baseUrl}/login?redirect=${baseUrl}${pathname}`,
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|login).*)',
};
