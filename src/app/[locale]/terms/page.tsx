import { MDXProps } from 'mdx/types';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { Header } from '@/components/Header';
import { PropsWithLocale } from '@/helpers/localization';

type Props = PropsWithLocale;

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'Terms' });
  return {
    title: t('header.title'),
  };
}

async function getTerms(locale: string): Promise<React.FC<MDXProps>> {
  const mod: typeof import('*.mdx') = await import(
    `@/messages/terms.${locale}.mdx`
  );

  return mod.default;
}

export default async function Terms({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);

  const t = await getTranslations('Terms');

  const TermsContents = await getTerms(locale).catch(() => getTerms('en'));

  return (
    <>
      <Header
        image={undefined}
        title={t('header.title')}
        subtitle={t('header.subtitle')}
      />
      <div className="o-section o-section--alt">
        <div className="o-section__content">
          <TermsContents />
        </div>
      </div>
    </>
  );
}
