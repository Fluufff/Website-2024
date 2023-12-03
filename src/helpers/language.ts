import { cache } from 'react';

import { languageKeys, SupportedLanguage } from '@/config';

export type Messages = typeof import('@/messages/en.json');

export const getMessages = cache(
  async (locale: SupportedLanguage): Promise<Messages> => {
    // The import is probably already cached by the module system, but too
    // low-level to my taste. Also, this is where we can implement a conversion
    // from other formats into json.
    return (await import(`@/messages/${locale}.json`)).default;
  },
);

export function isSupportedLanguage(x: string): x is SupportedLanguage {
  return (languageKeys as readonly string[]).includes(x);
}
