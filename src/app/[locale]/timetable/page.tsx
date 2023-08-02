import { createTranslator } from 'next-intl';

import { getMessages } from '@/helpers/language';

import { getSchedule } from './data.tmp';
import Timetable from './Timetable';

// TODO
const headerImage = '';

export default async function TimetablePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await createTranslator({
    locale,
    messages: await getMessages(locale),
    namespace: 'Timetable',
  });

  const { events, locations } = await getSchedule().then((response) => ({
    events: response?._embedded?.events ?? [],
    locations: response?._embedded?.locations ?? [],
  }));

  return (
    <>
      <div
        className="o-header"
        style={{
          backgroundImage: `url(${headerImage})`,
        }}>
        <div className="u-container">
          <h1 className="o-header__title">{t('header.title')}</h1>
          <p className="o-header__sub-title">{t('header.sub_title')}</p>
        </div>
      </div>

      <div className="o-section o-section--alt o-section--no-hidden">
        <div className="o-section__content">
          <Timetable events={events} locations={locations} />
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
