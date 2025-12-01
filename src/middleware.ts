import createMiddleware from 'next-intl/middleware';

export const routing = {
  locales: ['fr', 'en'],
  defaultLocale: 'fr',
};

export default createMiddleware(routing);

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};

