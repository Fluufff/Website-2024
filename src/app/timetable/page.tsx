// TODO: split server/client part
'use client';

import classNames from 'classnames';
import { format, parseISO } from 'date-fns';
import { enGB, fr, nlBE } from 'date-fns/locale';
import { useRef, useState } from 'react';

// TODO
function t(key: string) {
  return key;
}

// TODO
function getLanguage() {
  return 'en_GB';
}

// TODO
function showModal(event: unknown): void {
  return;
}

// TODO
const animateScroll = { scrollTo: (pos: unknown) => {} };

// TODO
const LinkFix = (props: any) => props.children;
const Modal = (props: any) => (props.isOpen ? 'modal!' : 'no modal');

export default function TimetablePage() {
  // Lower = W I D E R
  // Higher = tighter
  const scale = 20;
  const oneHourHeightInPx = 100;

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const events: any[] = [];
  const locations: any[] = [];
  const days: any[] = [];
  const currentTimeIndicatorPosition = 0;
  const isCurrentTimeInSchedule = false;
  const [displayState, setDisplayState] = useState<'SCHEDULE' | 'TIMELINE'>(
    'SCHEDULE',
  );
  const [mobileDaysVisible, setMobileDaysVisible] = useState(false);
  const activeEvent: Record<string, any> = {};
  const firstEventTimestamp = 0;
  const conHours: number[] = [];
  const user = {};

  const scheduleRef = useRef<HTMLDivElement>(null);

  // TODO
  const updateScroll = (direction: 'left' | 'right'): void => {};

  const renderSchedule = () => (
    <div className="m-timetable">
      <div className="m-timetable__locations">
        <ul>
          {locations.map((location, i) => (
            <li key={location.name}>
              {i !== 0 ? (
                <span
                  onClick={() => updateScroll('left')}
                  className="uil uil-arrow-left"></span>
              ) : (
                <div></div>
              )}
              <span>{location.name}</span>
              {i !== locations.length - 1 ? (
                <span
                  onClick={() => updateScroll('right')}
                  className="uil uil-arrow-right"></span>
              ) : (
                <div></div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="m-timetable__events">
        <div className="m-timetable__hours">
          {conHours.map((hour) => (
            <div
              id={`p_${firstEventTimestamp + hour * 60 * 60}`}
              key={hour}
              style={{
                height: `${oneHourHeightInPx}px`,
              }}
              className={classNames({
                'm-timetable__hour-indicator': true,
                'm-timetable__hour-indicator--daybreak':
                  format(
                    firstEventTimestamp * 1000 + hour * 60 * 60 * 1000,
                    'HH',
                    {
                      locale:
                        getLanguage() === 'nl_BE'
                          ? nlBE
                          : getLanguage() === 'fr_FR'
                          ? fr
                          : enGB,
                    },
                  ) === '00',
                'm-timetable__hour-indicator--before-daybreak':
                  format(
                    firstEventTimestamp * 1000 + hour * 60 * 60 * 1000,
                    'HH',
                    {
                      locale:
                        getLanguage() === 'nl_BE'
                          ? nlBE
                          : getLanguage() === 'fr_FR'
                          ? fr
                          : enGB,
                    },
                  ) === '23',
              })}>
              <p className="m-timetable__hour-indicator__time">
                {firstEventTimestamp !== Infinity &&
                  format(
                    firstEventTimestamp * 1000 + hour * 60 * 60 * 1000,
                    'HH:mm',
                  )}
              </p>
              <p className="m-timetable__hour-indicator__day">
                {format(
                  firstEventTimestamp * 1000 + hour * 60 * 60 * 1000,
                  'HH',
                ) === '00' &&
                  format(
                    firstEventTimestamp * 1000 + hour * 60 * 60 * 1000,
                    'eeee',
                    {
                      locale:
                        getLanguage() === 'nl_BE'
                          ? nlBE
                          : getLanguage() === 'fr_FR'
                          ? fr
                          : enGB,
                    },
                  )}
              </p>
              <p className="m-timetable__hour-indicator__day m-timetable__hour-indicator__day--mobile">
                {format(
                  firstEventTimestamp * 1000 + hour * 60 * 60 * 1000,
                  'HH',
                ) === '00' &&
                  format(
                    firstEventTimestamp * 1000 + hour * 60 * 60 * 1000,
                    'dd/MM',
                    {
                      locale:
                        getLanguage() === 'nl_BE'
                          ? nlBE
                          : getLanguage() === 'fr_FR'
                          ? fr
                          : enGB,
                    },
                  )}
              </p>
            </div>
          ))}
        </div>
        <div className="m-timetable__blocks">
          {locations.map((location) => (
            <div className="m-timetable__blocks-block" key={location.name}>
              {events
                .filter(
                  (event) => event.description.schedule === 'on' || !!user,
                )
                .filter((event) => event.location.locid === location.locid)
                .map((event, i) => (
                  <div
                    key={i}
                    onClick={() => showModal(event)}
                    className="m-timetable__event"
                    style={{
                      top:
                        ((parseISO(event.begin).getTime() / 1000 -
                          firstEventTimestamp) /
                          3600) *
                        oneHourHeightInPx,
                      height:
                        ((parseISO(event.end).getTime() / 1000 -
                          parseISO(event.begin).getTime() / 1000) /
                          3600) *
                        oneHourHeightInPx,
                    }}>
                    <p className="m-schedule__event__name">
                      {event.description.name}
                    </p>
                    <p className="m-schedule__event__time">
                      {format(parseISO(event.begin), 'HH:mm')} -{' '}
                      {format(parseISO(event.end), 'HH:mm')}
                    </p>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTimeline = () => (
    <div className="m-schedule">
      {!events.length ? (
        <div className="m-schedule__empty">
          <p>{t('PAGES.SCHEDULE.SCHEDULE.NOT_AVAILABLE')}</p>
        </div>
      ) : (
        <>
          <div className="m-schedule__locations">
            {locations.map((location) => (
              <div key={location.locid} className="m-schedule__location">
                <p>{location.name}</p>
              </div>
            ))}
          </div>
          <div
            className="m-schedule__events"
            id="m-schedule__events"
            ref={scheduleRef}>
            <div className="m-schedule__hour-indicators">
              {conHours.map((hour) => (
                <div
                  id={`p_${firstEventTimestamp + hour * 60 * 60}`}
                  key={hour}
                  className={classNames({
                    'm-schedule__hour-indicator': true,
                    'm-schedule__hour-indicator--daybreak':
                      format(
                        firstEventTimestamp * 1000 + hour * 60 * 60 * 1000,
                        'HH',
                        {
                          locale:
                            getLanguage() === 'nl_BE'
                              ? nlBE
                              : getLanguage() === 'fr_FR'
                              ? fr
                              : enGB,
                        },
                      ) === '00',
                  })}
                  style={{
                    left: (hour * 60 * 60) / scale,
                  }}>
                  <p className="m-schedule__hour-indicator__time">
                    {firstEventTimestamp !== Infinity &&
                      format(
                        firstEventTimestamp * 1000 + hour * 60 * 60 * 1000,
                        'HH:mm',
                      )}
                  </p>
                  <p className="m-schedule__hour-indicator__day">
                    {format(
                      firstEventTimestamp * 1000 + hour * 60 * 60 * 1000,
                      'HH',
                    ) === '00' &&
                      format(
                        firstEventTimestamp * 1000 + hour * 60 * 60 * 1000,
                        'eeee',
                        {
                          locale:
                            getLanguage() === 'nl_BE'
                              ? nlBE
                              : getLanguage() === 'fr_FR'
                              ? fr
                              : enGB,
                        },
                      )}
                  </p>
                </div>
              ))}
            </div>
            {isCurrentTimeInSchedule && (
              <div
                className="m-schedule__current-time-indicator"
                style={{
                  left: currentTimeIndicatorPosition,
                }}>
                <p>{format(new Date().getTime(), 'HH:mm')}</p>
              </div>
            )}
            {events
              .filter((event) => event.description.schedule === 'on' || !!user)
              .map((event, i) => (
                <div
                  key={i}
                  className="m-schedule__event"
                  onClick={() => showModal(event)}
                  style={{
                    left:
                      (parseISO(event.begin).getTime() / 1000 -
                        firstEventTimestamp) /
                      scale,
                    top:
                      locations.findIndex(
                        (location) => location.locid === event.location.locid,
                      ) *
                        86 +
                      30,
                    width:
                      (parseISO(event.end).getTime() / 1000 -
                        parseISO(event.begin).getTime() / 1000) /
                      scale,
                  }}>
                  <p className="m-schedule__event__name">
                    {event.description.name}
                  </p>
                  <p className="m-schedule__event__time">
                    {format(parseISO(event.begin), 'HH:mm')} -{' '}
                    {format(parseISO(event.end), 'HH:mm')}
                  </p>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );

  return (
    <>
      <div
        className="o-header"
        style={{
          backgroundImage: undefined,
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
        {/* <div className="o-section__image o-section__image--top">
					<img src={accentImage} />
				</div> */}
        <div className="o-section__content">
          <div className="m-schedule__meta">
            <div className="m-schedule__toggle">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  animateScroll.scrollTo(300);
                  setDisplayState('SCHEDULE');
                }}
                className={`a-button ${
                  displayState === 'SCHEDULE' ? '' : 'a-button--transparent'
                }`}>
                Schedule
              </a>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  animateScroll.scrollTo(300);
                  setDisplayState('TIMELINE');
                }}
                className={`a-button ${
                  displayState === 'TIMELINE' ? '' : 'a-button--transparent'
                }`}>
                Timeline
              </a>
            </div>
            <div className="m-schedule__days">
              {days.map((day) => (
                <LinkFix
                  className="a-button a-button--secondary"
                  key={day.name}
                  smooth={true}
                  offset={-150}
                  horizontal={displayState === 'TIMELINE'}
                  containerId={
                    displayState === 'TIMELINE'
                      ? 'm-schedule__events'
                      : undefined
                  }
                  to={`p_${day.key}`}>
                  {day.name}
                </LinkFix>
              ))}
            </div>
            <div className="m-schedule__mobile-days">
              <a
                href="#"
                className="a-button a-button--secondary"
                onClick={(e) => {
                  e.preventDefault();
                  setMobileDaysVisible(!mobileDaysVisible);
                }}>
                <span className="uil uil-schedule"></span>
              </a>
            </div>
            <div
              className={`m-schedule__mobile-days__days ${
                mobileDaysVisible && 'm-schedule__mobile-days__days--visible'
              }`}>
              {days.map((day) => (
                <LinkFix
                  className="a-button a-button--secondary"
                  key={day.name}
                  smooth={true}
                  offset={-150}
                  onClick={() => setMobileDaysVisible(false)}
                  horizontal={displayState === 'TIMELINE'}
                  containerId={
                    displayState === 'TIMELINE'
                      ? 'm-schedule__events'
                      : undefined
                  }
                  to={`p_${day.key}`}>
                  {day.name}
                </LinkFix>
              ))}
            </div>
          </div>
          {displayState === 'SCHEDULE' && renderSchedule()}
          {displayState === 'TIMELINE' && renderTimeline()}
          <Modal
            ariaHideApp={false}
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            contentLabel="Timetable">
            <div
              onClick={() => setModalIsOpen(false)}
              className="ReactModal__Close uil uil-times"></div>
            <h3>{activeEvent?.description?.name}</h3>
            <p>{activeEvent?.description?.description}</p>
          </Modal>
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
