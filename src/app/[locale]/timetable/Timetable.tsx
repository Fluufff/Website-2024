'use client';

import classNames from 'classnames';
import {
  addDays,
  differenceInHours,
  differenceInSeconds,
  format,
  isAfter,
  isBefore,
  set,
  startOfHour,
  sub,
} from 'date-fns';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useMemo, useRef, useState } from 'react';
import Modal from 'react-modal';
import Scroll from 'react-scroll';

import { ScheduleView } from './_components/ScheduleView';
import { TimelineView } from './_components/TimelineView';
import { isKnownLabel, knownLabels } from './knownLabels';

import CmsRichText from '@/helpers/CmsRichText';
import { getDateLocale } from '@/helpers/localization';
import { ScheduleEvent, ScheduleLocation } from '@/services/cms/schedule';

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
  events: ScheduleEvent[];
  locations: ScheduleLocation[];
}) {
  /** pixels per hour */
  const timelineScale = 180;
  /** pixels per hour */
  const scheduleScale = 100;

  const [displayState, setDisplayState] = useState<'SCHEDULE' | 'TIMELINE'>(
    'SCHEDULE',
  );
  const [mobileDaysVisible, setMobileDaysVisible] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [activeEvent, setActiveEvent] = useState<ScheduleEvent>();
  const [scrollLeft, setScrollLeft] = useState<number>(0);

  const timelineRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  // 	const timer = setTimeout(() => {
  // 		setCurrentTimeIndicatorPosition((new Date().getTime() / 1000 - firstEventTimestamp) / scale);
  // 	}, 1000);

  // 	return () => clearTimeout(timer);
  // }, [currentTimeIndicatorPosition]);

  const updateScroll = (direction: 'left' | 'right'): void => {
    const containerWidth = document.getElementById(
      'm-timetable__locations',
    )!.offsetWidth;
    const newScrollLeft =
      direction === 'left'
        ? scrollLeft - containerWidth
        : scrollLeft + containerWidth;
    setScrollLeft(newScrollLeft);

    ['m-timetable__locations', 'm-timetable__blocks'].forEach((containerId) =>
      Scroll.animateScroll.scrollTo(newScrollLeft, {
        containerId,
        horizontal: true,
        duration: 500,
        ignoreCancelEvents: true,
      }),
    );
  };

  const dateLocale = getDateLocale(useLocale());

  const {
    firstEventTimestamp = new Date(0),
    lastEventTimestamp = new Date(0),
    days = [],
    isCurrentTimeInSchedule = undefined,
    currentTimeIndicatorPosition = 0,
    conHours = [],
  } = useMemo(() => {
    if (!events.length) return {};

    /** origin timestamp for the view, on the hour and with at least 10 minutes
     * padding relative to first event */
    const firstEventTimestamp = startOfHour(
      sub(Math.min(...events.map((x) => +x.startTime)), { minutes: 10 }),
    );

    const lastEventTimestamp = new Date(
      Math.max(...events.map((x) => +x.endTime.getTime())),
    );

    /**
     * list enumerating hours of the con relative to first hour, starting with 0
     */
    const conHours = Array.from(
      Array(differenceInHours(lastEventTimestamp, firstEventTimestamp)).keys(),
    );

    const now = new Date();

    const currentTimeIndicatorPosition =
      (differenceInSeconds(now, firstEventTimestamp, {}) / 3600) *
      timelineScale;

    const isCurrentTimeInSchedule =
      isBefore(now, lastEventTimestamp) && isAfter(now, firstEventTimestamp);

    const days = [
      ...new Array(
        getDaysBetweenDates(firstEventTimestamp, lastEventTimestamp),
      ),
    ].map((_, i) => ({
      name: format(addDays(firstEventTimestamp, i), 'EEEE', {
        locale: dateLocale,
      }),
      key:
        i !== 0
          ? addDays(
              set(firstEventTimestamp, {
                hours: 7,
                minutes: 0,
                seconds: 0,
              }),
              i,
            ).getTime()
          : +firstEventTimestamp,
    }));

    return {
      firstEventTimestamp,
      lastEventTimestamp,
      days,
      isCurrentTimeInSchedule,
      currentTimeIndicatorPosition,
      conHours,
    };
  }, [events, dateLocale]);

  useEffect(
    () => {
      if (isCurrentTimeInSchedule && timelineRef.current) {
        timelineRef.current!.scrollLeft = currentTimeIndicatorPosition - 100;
      }
    },
    // these only update once
    [
      isCurrentTimeInSchedule,
      firstEventTimestamp,
      lastEventTimestamp,
      currentTimeIndicatorPosition,
    ],
  );

  const showModal = (event: ScheduleEvent) => {
    setModalIsOpen(true);
    setActiveEvent(event);
  };

  const scheduleView = (
    <ScheduleView
      events={events}
      locations={locations}
      conHours={conHours}
      firstEventTimestamp={firstEventTimestamp}
      scale={scheduleScale}
      dateLocale={dateLocale}
      updateScroll={updateScroll}
      showModal={showModal}
    />
  );

  const timelineView = (
    <TimelineView
      ref={timelineRef}
      events={events}
      locations={locations}
      conHours={conHours}
      firstEventTimestamp={firstEventTimestamp}
      scale={timelineScale}
      dateLocale={dateLocale}
      isCurrentTimeInSchedule={isCurrentTimeInSchedule}
      currentTimeIndicatorPosition={currentTimeIndicatorPosition}
      showModal={showModal}
    />
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
              Scroll.animateScroll.scrollTo(300);
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
              Scroll.animateScroll.scrollTo(300);
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
            <Scroll.Link
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
            </Scroll.Link>
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
            <Scroll.Link
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
            </Scroll.Link>
          ))}
        </div>
      </div>
      {displayState === 'SCHEDULE' && scheduleView}
      {displayState === 'TIMELINE' && timelineView}

      <Modal
        ariaHideApp={false}
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Timetable">
        <div
          onClick={() => setModalIsOpen(false)}
          className="ReactModal__Close uil uil-times"></div>
        <EventModalBody event={activeEvent} />
      </Modal>
    </>
  );
}

function EventModalBody({ event }: { event: ScheduleEvent | undefined }) {
  if (!event) return;

  const labelBadges = event.labels.map((label, i) => (
    <EventLabel label={label} key={i} />
  ));

  return (
    <>
      <h3>
        {event.name}
        {
          // important space to allow breaking the line, do not remove
          labelBadges.map((badge) => [' ', badge])
        }
      </h3>

      {event.hostName && <span className="u-text-light">{event.hostName}</span>}
      <CmsRichText dirtyHtml={event.htmlDescription ?? ''} />

      <EventLabelHelp labels={event.labels} />
    </>
  );
}

function EventLabel({ label }: { label: string }) {
  const t = useTranslations('Timetable.labels');

  const texts = isKnownLabel(label)
    ? {
        name: t(`${label}.name`),
        description: t(`${label}.description`),
      }
    : undefined;

  const knownLabel = knownLabels[label];

  return (
    <span
      className={classNames(
        'a-badge',
        knownLabel && `a-badge--color-${knownLabel.color}`,
      )}
      title={texts?.description}>
      {texts?.name ?? label}
    </span>
  );
}

function EventLabelHelp({ labels }: { labels: string[] }) {
  const t = useTranslations('Timetable');

  const knownSubset = labels.filter(isKnownLabel);

  return (
    knownSubset.length > 0 && (
      <details>
        <summary>{t('label_help')}</summary>
        <ul>
          {knownSubset.map((label, i) => {
            const name = t(`labels.${label}.name`);
            const description = t(`labels.${label}.description`);
            const knownLabel = knownLabels[label];

            return (
              <li key={i}>
                <span className={`a-badge a-badge--color-${knownLabel.color}`}>
                  {name}
                </span>{' '}
                {description}
              </li>
            );
          })}
        </ul>
      </details>
    )
  );
}
