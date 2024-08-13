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
import { getNews } from '@/services/cms/news';
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
    'Belgian Furry Convention - Edition 6 - Toxic Critters - November 6-10 - Bedford Hotel, Brussels',
  // TODO: icon (high res favicons)
};

export function generateStaticParams() {
  return localeKeys.map((locale) => ({ locale }));
}

async function getHasNews(locale: string): Promise<boolean> {
  const news = await getNews(locale);
  return !!news.length;
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
  const hasNews = await getHasNews(locale);

  return (
    <html lang="en">
      <body className={[readexPro.variable, creepster.variable].join(' ')}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Menu hasNews={hasNews} />
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
