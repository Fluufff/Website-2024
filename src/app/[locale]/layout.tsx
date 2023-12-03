import '@/styles/main.scss';

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

import Menu from './Menu';

import { languageKeys } from '@/config';
import { Messages, getMessages, isSupportedLanguage } from '@/helpers/language';
import { readexPro } from '@/styles/fonts';

export const metadata: Metadata = {
  title: {
    default: 'Flüüfff',
    template: 'Flüüfff – %s',
  },
  // TODO: description, favicon
};

export function generateStaticParams() {
  return languageKeys.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  let messages: Messages;
  try {
    if (!isSupportedLanguage(locale)) notFound();
    messages = await getMessages(locale);
  } catch {
    notFound();
  }

  unstable_setRequestLocale(locale);

  return (
    <html lang="en">
      <body className={readexPro.variable}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Menu />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
