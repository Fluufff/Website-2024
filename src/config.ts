// The ordering of keys matters and is used for the menu. The type is relaxed to
// allow indexing by arbitrary string.
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

export const defaultLanguage = 'en';
