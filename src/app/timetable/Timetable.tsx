'use client';

import classNames from 'classnames';
import { addDays, format, parseISO, set } from 'date-fns';
import { enGB, fr, nlBE } from 'date-fns/locale';
import { useEffect, useMemo, useRef, useState } from 'react';
import { getLanguage } from '@/helpers/language';
import { IEvent, ILocation, IUser, getUser } from './data.tmp';

// TODO
const useTranslation = () => [
  function t(key: string) {
    return key;
  },
];

// TODO
const animateScroll = { scrollTo: (pos: unknown) => {} };
const gsap = { to(x: unknown, y: unknown) {} };

// TODO
const LinkFix = ({ className, children }: any) => (
  <a href="#" className={className}>
    {children}
  </a>
);
const Modal = (props: any) => (props.isOpen ? props.children : 'no modal');

const convertMsToDays = (ms: number) => {
  const msInOneSecond = 1000;
  const secondsInOneMinute = 60;
  const minutesInOneHour = 60;
  const hoursInOneDay = 24;

  const minutesInOneDay = hoursInOneDay * minutesInOneHour;
  const secondsInOneDay = secondsInOneMinute * minutesInOneDay;
  const msInOneDay = msInOneSecond * secondsInOneDay;

  return Math.ceil(ms / msInOneDay);
};

const getDaysBetweenDates = (dateOne: Date, dateTwo: Date) => {
  let differenceInMs = dateTwo.getTime() - dateOne.getTime();

  if (differenceInMs < 0) {
    differenceInMs = dateOne.getTime() - dateTwo.getTime();
  }

  return convertMsToDays(differenceInMs);
};

export default function Timetable({
  events,
  locations,
}: {
  events: IEvent[];
  locations: ILocation[];
}) {
  // Lower = W I D E R
  // Higher = tighter
  const scale = 20;
  const oneHourHeightInPx = 100;

  const [t] = useTranslation();

  const [user, setUser] = useState<IUser>();

  const [displayState, setDisplayState] = useState<'SCHEDULE' | 'TIMELINE'>(
    'SCHEDULE',
  );
  const [mobileDaysVisible, setMobileDaysVisible] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [activeEvent, setActiveEvent] = useState<IEvent>();
  const [scrollLeft, setScrollLeft] = useState<number>(0);

  const scheduleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getUser().then((response) => {
      setUser(response);
    });
  }, []);

  // useEffect(() => {
  // 	const timer = setTimeout(() => {
  // 		setCurrentTimeIndicatorPosition((new Date().getTime() / 1000 - firstEventTimestamp) / scale);
  // 	}, 1000);

  // 	return () => clearTimeout(timer);
  // }, [currentTimeIndicatorPosition]);

  const updateScroll = (direction: 'left' | 'right'): void => {
    const containerWidth = (document.querySelector(
      '.m-timetable__locations',
    ) as any)!.offsetWidth;
    const newScrollLeft =
      direction === 'left'
        ? scrollLeft - containerWidth
        : scrollLeft + containerWidth;
    setScrollLeft(newScrollLeft);

    gsap.to('.m-timetable__locations', { scrollTo: { x: newScrollLeft } });
    gsap.to('.m-timetable__blocks', { scrollTo: { x: newScrollLeft } });
  };

  const {
    firstEventTimestamp = 0,
    lastEventTimestamp = 0,
    days = [],
    isCurrentTimeInSchedule = undefined,
    currentTimeIndicatorPosition = 0,
    conHours = [],
  } = useMemo(() => {
    if (!events.length) return {};

    const differenceFromFlatHour =
      (Math.min(
        ...events.map((x: IEvent) =>
          Number(parseISO(x.begin).getTime() / 1000),
        ),
      ) %
        (60 * 60)) /
      60;

    const firstEventTimestamp =
      Math.min(
        ...events.map((x: IEvent) =>
          Number(parseISO(x.begin).getTime() / 1000),
        ),
      ) -
      (60 - differenceFromFlatHour) * 60;

    const lastEventTimestamp = Math.max(
      ...events.map((x: IEvent) => Number(parseISO(x.end).getTime() / 1000)),
    );

    const conHours = Array.from(
      Array(
        Math.ceil((lastEventTimestamp - firstEventTimestamp) / (60 * 60)),
      ).keys(),
    );

    const currentTimeIndicatorPosition =
      (new Date().getTime() / 1000 - firstEventTimestamp) / scale;

    const isCurrentTimeInSchedule =
      firstEventTimestamp < new Date().getTime() / 1000 &&
      new Date().getTime() / 1000 < lastEventTimestamp;

    const days = [
      ...new Array(
        getDaysBetweenDates(
          new Date(firstEventTimestamp * 1000),
          new Date(lastEventTimestamp * 1000),
        ),
      ),
    ].map((_, i) => ({
      name: format(addDays(new Date(firstEventTimestamp * 1000), i), 'EEEE', {
        locale:
          getLanguage() === 'nl_BE'
            ? nlBE
            : getLanguage() === 'fr_FR'
            ? fr
            : enGB,
      }),
      key:
        i !== 0
          ? addDays(
              set(new Date(firstEventTimestamp * 1000), {
                hours: 7,
                minutes: 0,
                seconds: 0,
              }),
              i,
            ).getTime() / 1000
          : firstEventTimestamp,
    }));

    return {
      firstEventTimestamp,
      lastEventTimestamp,
      days,
      isCurrentTimeInSchedule,
      currentTimeIndicatorPosition,
      conHours,
    };
  }, [events]);

  useEffect(
    () => {
      if (
        firstEventTimestamp < new Date().getTime() / 1000 &&
        new Date().getTime() / 1000 < lastEventTimestamp &&
        scheduleRef.current
      ) {
        scheduleRef.current!.scrollLeft =
          (new Date().getTime() / 1000 - firstEventTimestamp) / scale - 100;
      }
    },
    // these only update once
    [firstEventTimestamp, lastEventTimestamp],
  );

  const showModal = (event: IEvent) => {
    setModalIsOpen(true);
    setActiveEvent(event);
  };

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
      {/* <div className="o-section__image o-section__image--top">
          <img src={accentImage} />
      </div> */}
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
                displayState === 'TIMELINE' ? 'm-schedule__events' : undefined
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
                displayState === 'TIMELINE' ? 'm-schedule__events' : undefined
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
    </>
  );
}
