import '@/styles/main.scss';

import type { Metadata } from 'next';
import Script from 'next/script';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';

import Footer from './Footer';
import Menu from './Menu';

import { localeKeys } from '@/config';
import { env } from '@/env';
import { PropsWithLocale } from '@/helpers/localization';
import { getHasNews } from '@/services/cms/news';
import { getHasSchedule } from '@/services/cms/schedule';
import { creepster, readexPro } from '@/styles/fonts';

type Props = PropsWithLocale<{
  children: React.ReactNode;
}>;

export const metadata: Metadata = {
  metadataBase:
    env.METADATA_BASE !== undefined ? new URL(env.METADATA_BASE) : undefined,
  title: {
    default: 'Flüüfff',
    template: 'Flüüfff – %s',
  },
  description:
    'Belgian Furry Convention - Edition 7 - Forest Fantasy - November 5-9 - Bedford Hotel, Brussels',
  // TODO: icon (high res favicons)
};

export function generateStaticParams() {
  return localeKeys.map((locale) => ({ locale }));
}

const trackingDomain = {
  development: null,
  staging: 'test.fluufff.org',
  production: 'fluufff.org',
}[env.APP_ENV];

export default async function RootLayout({
  children,
  params: { locale },
}: Props) {
  unstable_setRequestLocale(locale);

  const messages = await getMessages();
  const hasSchedule = await getHasSchedule(locale);
  const hasNews = await getHasNews(locale);

  return (
    <html lang="en">
      <body className={[readexPro.variable, creepster.variable].join(' ')}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Menu hasSchedule={hasSchedule} hasNews={hasNews} />
          {children}
          <Footer locale={locale} />
        </NextIntlClientProvider>

        {trackingDomain && (
          <Script
            data-domain={trackingDomain}
            src="https://tracker.fluufff.org/js/script.js"
          />
        )}
      </body>
    </html>
  );
}
