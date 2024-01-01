import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

import { isSupportedLocale } from './helpers/localization';

export default getRequestConfig(async ({ locale }) => {
  if (!isSupportedLocale(locale)) notFound();

  return {
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
