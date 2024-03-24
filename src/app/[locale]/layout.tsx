import '@/styles/main.scss';

import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';

import Footer from './Footer';
import Menu from './Menu';

import { localeKeys } from '@/config';
import { PropsWithLocale } from '@/helpers/localization';
import { pineapple, readexPro } from '@/styles/fonts';

type Props = PropsWithLocale<{
  children: React.ReactNode;
}>;

export const metadata: Metadata = {
  title: {
    default: 'Flüüfff',
    template: 'Flüüfff – %s',
  },
  description:
    'Belgian Furry Convention - Edition 6 - Toxic Critters - November 6-10 - Bedford Hotel, Brussels',
  // TODO: icon (high res favicons)
};

export function generateStaticParams() {
  return localeKeys.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params: { locale },
}: Props) {
  unstable_setRequestLocale(locale);

  const messages = await getMessages();

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
