import { cache } from 'react';

import { localeKeys, SupportedLocale } from '@/config';

export type PropsWithLocale<P = {}> = P & { params: { locale: string } };

export type Messages = typeof import('@/messages/en.json');

export const getMessages = cache(
  async (locale: SupportedLocale): Promise<Messages> => {
    // The import is probably already cached by the module system, but too
    // low-level to my taste. Also, this is where we can implement a conversion
    // from other formats into json.
    return (await import(`@/messages/${locale}.json`)).default;
  },
);

export function isSupportedLocale(x: string): x is SupportedLocale {
  return (localeKeys as readonly string[]).includes(x);
}
