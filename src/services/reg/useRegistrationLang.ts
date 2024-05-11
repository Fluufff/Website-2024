'use client';

import { useLocale } from 'next-intl';

import { SupportedLocale } from '@/config';

const langMap: Record<SupportedLocale, string | undefined> = {
  en: 'en_GB',
  nl: 'nl_BE',
  fr: 'fr_FR',
  // No German support yet, so we put no language. We do not fallback to one set
  // language, because Platy+ will set the cookie, so if a German user prefers
  // Dutch they would be reset all the time.
  de: undefined,
};

export function useRegistrationLang() {
  const locale = useLocale() as SupportedLocale;
  const lang = langMap[locale];

  return new URLSearchParams(lang ? { lang } : {});
}
