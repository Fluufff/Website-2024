import dateLocaleEnGB from 'date-fns/locale/en-GB';
import dateLocaleFr from 'date-fns/locale/fr';
import dateLocaleNlBE from 'date-fns/locale/nl-BE';

import { localeKeys, SupportedLocale } from '@/config';

export type PropsWithLocale<P = {}> = P & { params: { locale: string } };

export function isSupportedLocale(x: string): x is SupportedLocale {
  return (localeKeys as readonly string[]).includes(x);
}

export const getDateLocale = (locale: string) =>
  ({
    nl: dateLocaleNlBE,
    fr: dateLocaleFr,
    en: dateLocaleEnGB,
  })[locale] ?? dateLocaleEnGB;
