import '@/styles/main.scss';

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

import Footer from './Footer';
import Menu from './Menu';

import { localeKeys } from '@/config';
import {
  getMessages,
  isSupportedLocale,
  Messages,
  PropsWithLocale,
} from '@/helpers/localization';
import { pineapple, readexPro } from '@/styles/fonts';

type Props = PropsWithLocale<{
  children: React.ReactNode;
}>;

export const metadata: Metadata = {
  title: {
    default: 'Flüüfff',
    template: 'Flüüfff – %s',
  },
  // TODO: description, favicon
};

export function generateStaticParams() {
  return localeKeys.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params: { locale },
}: Props) {
  let messages: Messages;
  try {
    if (!isSupportedLocale(locale)) notFound();
    messages = await getMessages(locale);
  } catch {
    notFound();
  }

  unstable_setRequestLocale(locale);

  return (
    <html lang="en">
      <body className={[readexPro.variable, pineapple.variable].join(' ')}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Menu />
          {children}
          <Footer locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
