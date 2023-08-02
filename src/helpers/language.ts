import { cache } from 'react';

// TODO
export function getLanguage() {
  return 'en_GB';
}

export const getMessages = cache(async (locale: string) => {
  // The import is probably already cached by the module system, but too
  // low-level to my taste. Also, this is where we can implement a conversion
  // from other formats into json.
  return (await import(`@/messages/${locale}.json`)).default;
});
