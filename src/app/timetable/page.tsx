// TODO: split server/client part
'use client';

import { useEffect, useState } from 'react';
import { IEvent, ILocation, getSchedule } from './data.tmp';
import Timetable from './Timetable';

// TODO
const useTranslation = () => [
  function t(key: string) {
    return key;
  },
];

// TODO
const headerImage = '';

export default function TimetablePage() {
  const [t] = useTranslation();
  const [events, setEvents] = useState<IEvent[]>([]);
  const [locations, setLocations] = useState<ILocation[]>([]);

  useEffect(() => {
    getSchedule().then((response) => {
      const responseEvents = response?._embedded?.events ?? [];
      const responseLocations = response?._embedded?.locations ?? [];

      setEvents(responseEvents);
      setLocations(responseLocations);

      if (!responseEvents.length) {
        return;
      }
    });
  }, []);

  return (
    <>
      <div
        className="o-header"
        style={{
          backgroundImage: `url(${headerImage})`,
        }}>
        <div className="u-container">
          <h1 className="o-header__title">
            {t('PAGES.SCHEDULE.HEADER.TITLE')}
          </h1>
          <p className="o-header__sub-title">
            {t('PAGES.SCHEDULE.HEADER.SUB_TITLE')}
          </p>
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
            <h3>{t('PAGES.SCHEDULE.IDEA.TITLE')}</h3>
            <p>{t('PAGES.SCHEDULE.IDEA.DESCRIPTION')}</p>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSfbhSAz-w9qpCFMfNFvnb9E5IjvEPtzlZHkl-TmVadYRIbMqQ/viewform"
              target="_blank"
              className="a-button a-button--tertiary u-margin-top"
              rel="noreferrer">
              {t('GENERAL.BUTTONS.SUBMIT_PROPOSAL')}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
