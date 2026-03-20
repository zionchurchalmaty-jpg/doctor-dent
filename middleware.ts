import createMiddleware from 'next-intl/middleware';
    
export default createMiddleware({
  locales: ['ru', 'kz'],
  defaultLocale: 'ru',
  localePrefix: 'as-needed'
});

export const config = {
  matcher: ['/((?!api|_next|admin|blog|.*\\..*).*)'] 
};