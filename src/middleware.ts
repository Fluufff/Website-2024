import createMiddleware from 'next-intl/middleware';

import { defaultLanguage, languages } from './config';

// Sets up full-featured prefix-based routing, picking the best language from
// URL, cookies, and request headers.
export default createMiddleware({
  locales: Object.keys(languages),
  defaultLocale: defaultLanguage,
});

export const config = {
  // Skips paths not subject to internationalisation. The recommended default
  // skips the api and _next root paths, plus any paths containing a dot (for
  // files with an extension, such as stylesheets and static assets).
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
