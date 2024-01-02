import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { PropsWithLocale } from '@/helpers/localization';

type Props = PropsWithLocale;

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'Terms' });
  return {
    title: t('header.title'),
  };
}

export default async function Terms({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);

  const t = await getTranslations('Terms');

  const TermsContents = (
    (await import(`@/messages/terms.${locale}.mdx`)) as typeof import('*.mdx')
  ).default;

  return (
    <>
      <div className="o-header">
        <div className="u-container">
          <h1 className="o-header__title">{t('header.title')}</h1>
          <p className="o-header__sub-title">{t('header.subtitle')}</p>
        </div>
      </div>
      <div className="o-section o-section--alt">
        <div className="o-section__content u-pre-wrap-p">
          <TermsContents />
        </div>
      </div>
    </>
  );
}
