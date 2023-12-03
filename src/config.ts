// The ordering of keys matters and is used for the menu. The type is relaxed to
// allow indexing by arbitrary string.
//
// Leaving the keys untyped for convenience, to match `useLocale` returning
// `string`.
export const languages: Record<string, { name: string }> = {
  en: {
    name: 'English',
  },
  nl: {
    name: 'Nederlands',
  },
  fr: {
    name: 'Français',
  },
};

export const languageKeys = ['en', 'nl', 'fr'] as const;
export type SupportedLanguage = (typeof languageKeys)[number];

export const defaultLanguage = 'en' as const;
