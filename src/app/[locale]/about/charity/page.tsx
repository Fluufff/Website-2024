import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import headerImage from '@/assets/headers/charity.jpg';
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
  const tGeneral = await getTranslations('general');

  return (
    <>
      <div
        className="o-header"
        style={{
          backgroundImage: `url(${headerImage.src})`,
        }}>
        <div className="u-container">
          <h1 className="o-header__title">{t('header.title')}</h1>
          <p className="o-header__sub-title">{t('header.subtitle')}</p>
        </div>
      </div>
      <div className="o-section o-section--dark">
        <div className="o-section__content">
          <div className="u-row">
            <div className="u-col-sm-6">
              <h4>{t('content.title')}</h4>
              <p>{t('content.subtitle')}</p>
              <p>{t('content.description')}</p>

              <p>
                <b>{t('study.title')}</b>: {t('study.content')}
              </p>

              <p>
                <b>{t('protect.title')}</b>: {t('protect.content')}
              </p>
            </div>
            <div className="u-col-sm-6">
              <p>
                <b>{t('involvement.title')}</b>: {t('involvement.content')}
              </p>
              <p>
                <b>{t('education.title')}</b>: {t('education.content')}
              </p>
              <p>
                {t('more_info')}{' '}
                <a
                  href="https://www.natagora.be/"
                  target="_blank"
                  rel="noreferrer">
                  {tGeneral('labels.here')}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
