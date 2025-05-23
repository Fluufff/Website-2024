import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import * as R from 'remeda';

import Timetable from './Timetable';

import headerImage from '@/assets/headers/schedule.jpg';
import lineImage from '@/assets/lines-2.png';
import { AccentImage } from '@/components/AccentImage';
import { Header } from '@/components/Header';
import { PropsWithLocale } from '@/helpers/localization';
import { redirect } from '@/helpers/navigation';
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
  const orderedLocations = R.pipe(
    locationById,
    R.values,
    R.sortBy(R.prop('position')),
  );

  if (!events.length) {
    // link is hidden because we have no data, so redirection is ok
    redirect('/');
  }

  return (
    <>
      <Header
        image={headerImage}
        title={t('header.title')}
        subtitle={t('header.subtitle')}
      />
      <div className="o-section o-section--alt">
        <div className="o-section__content">
          <Timetable events={events} locations={orderedLocations} />
        </div>
      </div>
      <div className="o-section o-section--dark">
        <AccentImage variant="alt" src={lineImage} />
        <div className="o-section__content">
          <div className="u-text-center">
            <h3>{t('idea.title')}</h3>
            <p>{t('idea.description')}</p>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLScCMjm_v59my7QaELMsoTqarOeFFNlyQoSF6FowCT2Z4E120A/viewform"
              target="_blank"
              className="a-button a-button--tertiary a-button--big u-margin-top"
              rel="noreferrer">
              {t('submit_proposal')}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
