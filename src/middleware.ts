import createMiddleware from 'next-intl/middleware';

import { defaultLocale, localeKeys } from './config';

// Sets up full-featured prefix-based routing, picking the best locale from URL,
// cookies, and request headers.
export default createMiddleware({
  locales: localeKeys,
  defaultLocale: defaultLocale,
  localePrefix: 'as-needed',
});

export const config = {
  // Skips paths not subject to internationalisation. The recommended default
  // skips the api and _next root paths, plus any paths containing a dot (for
  // files with an extension, such as stylesheets and static assets).
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
