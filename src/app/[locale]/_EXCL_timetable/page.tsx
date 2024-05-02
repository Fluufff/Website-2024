import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import Timetable from './Timetable';

import headerImage from '@/assets/headers/schedule.jpg';
import lineImage from '@/assets/lines-2.png';
import { Header } from '@/components/Header';
import { exclude } from '@/helpers/exclude';
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
      <Header
        image={headerImage}
        title={t('header.title')}
        subtitle={t('header.subtitle')}
      />
      <div className="o-section o-section--alt o-section--no-hidden">
        <div className="o-section__content">
          <Timetable events={events} locations={Object.values(locationById)} />
        </div>
      </div>
      {exclude(
        'panel-form',
        <div className="o-section o-section--dark">
          <img
            src={lineImage}
            className="o-section__accent-image o-section__accent-image--alt"
          />
          <div className="o-section__content">
            <div className="u-text-center">
              <h3>{t('idea.title')}</h3>
              <p>{t('idea.description')}</p>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfbhSAz-w9qpCFMfNFvnb9E5IjvEPtzlZHkl-TmVadYRIbMqQ/viewform"
                target="_blank"
                className="a-button a-button--tertiary a-button--big u-margin-top"
                rel="noreferrer">
                {t('submit_proposal')}
              </a>
            </div>
          </div>
        </div>,
      )}
    </>
  );
}
