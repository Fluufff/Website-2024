import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import headerImage from '@/assets/headers/charity.jpg';
import { Header } from '@/components/Header';
import { PropsWithLocale } from '@/helpers/localization';

type Props = PropsWithLocale;

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'Charity' });
  return {
    title: t('header.title'),
  };
}

export default async function Charity({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);

  const t = await getTranslations('Charity');

  const title = t('header.title');
  const subtitle = t('header.subtitle');

  return (
    <>
      <Header image={headerImage} title={title} subtitle={subtitle} />
      <div className="o-section o-section--dark">
        <div className="o-section__content">
          <div className="u-row">
            <div className="u-col-sm-6">
              <p>{t('content.subtitle')}</p>
              <p>{t('content.paragraph1')}</p>

              <p>{t('content.paragraph2')}</p>
            </div>
            <div className="u-col-sm-6">
              <p>{t('content.paragraph3')}</p>
              <p>{t('content.paragraph4')}</p>
              <p>{t('content.paragraph5')}</p>
              <p>{t('content.paragraph6')}</p>
              <p>
                <a
                  href="https://www.visitsealife.com/blankenberge/"
                  target="_blank"
                  rel="noreferrer">
                  {t('more_info')}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
