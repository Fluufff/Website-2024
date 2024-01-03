import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import Timetable from './Timetable';

import headerImage from '@/assets/headers/schedule.jpg';
import { PropsWithLocale } from '@/helpers/localization';
import { getSchedule } from '@/services/cms/schedule';

type Props = PropsWithLocale;

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'Timetable' });
  return {
    title: t('header.title'),
  };
}

export default async function TimetablePage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);

  const t = await getTranslations('Timetable');

  const { events, locationById } = await getSchedule(locale);

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

      <div className="o-section o-section--alt o-section--no-hidden">
        <div className="o-section__content">
          <Timetable events={events} locations={Object.values(locationById)} />
        </div>
      </div>
      <div className="o-section o-section--dark">
        {/* <img src={hibiscusImage} className="o-section__accent-image o-section__accent-image--alt" /> */}
        <div className="o-section__content">
          <div className="u-text-center">
            <h3>{t('idea.title')}</h3>
            <p>{t('idea.description')}</p>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSfbhSAz-w9qpCFMfNFvnb9E5IjvEPtzlZHkl-TmVadYRIbMqQ/viewform"
              target="_blank"
              className="a-button a-button--tertiary u-margin-top"
              rel="noreferrer">
              {t('submit_proposal')}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
