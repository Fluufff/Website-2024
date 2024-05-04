// The ordering of keys matters and is used for the menu. The type is relaxed to
// allow indexing by arbitrary string.
//
// Leaving the keys untyped for convenience, to match `useLocale` returning
// `string`.
export const locales: Record<string, { name: string }> = {
  en: {
    name: 'English',
  },
  nl: {
    name: 'Nederlands',
  },
  fr: {
    name: 'Français',
  },
  de: {
    name: 'Deutsch',
  },
};

export const localeKeys = ['en', 'nl', 'fr', 'de'] as const;
export type SupportedLocale = (typeof localeKeys)[number];

export const defaultLocale = 'en' as const;
