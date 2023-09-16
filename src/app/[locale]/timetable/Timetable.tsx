'use client';

import { addDays, format, parseISO, set } from 'date-fns';
import { enGB, fr, nlBE } from 'date-fns/locale';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useMemo, useRef, useState } from 'react';
import Modal from 'react-modal';
import Scroll from 'react-scroll';

import { ScheduleEvent, ScheduleLocation } from '@/services/cms/schedule';

import { ScheduleView } from './_components/ScheduleView';
import { TimelineView } from './_components/TimelineView';

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
  // Lower = W I D E R
  // Higher = tighter
  const scale = 20;
  const oneHourHeightInPx = 100;

  const t = useTranslations('Timetable');

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

  const language = useLocale();
  const locale = language === 'nl' ? nlBE : language === 'fr' ? fr : enGB;

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
        ...events.map((x) => Number(parseISO(x.startTime).getTime() / 1000)),
      ) %
        (60 * 60)) /
      60;

    const firstEventTimestamp =
      Math.min(
        ...events.map((x) => Number(parseISO(x.startTime).getTime() / 1000)),
      ) -
      (60 - differenceFromFlatHour) * 60;

    const lastEventTimestamp = Math.max(
      ...events.map((x) => Number(parseISO(x.endTime).getTime() / 1000)),
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
        locale,
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
  }, [events, locale]);

  useEffect(
    () => {
      if (
        firstEventTimestamp < new Date().getTime() / 1000 &&
        new Date().getTime() / 1000 < lastEventTimestamp &&
        timelineRef.current
      ) {
        timelineRef.current!.scrollLeft =
          (new Date().getTime() / 1000 - firstEventTimestamp) / scale - 100;
      }
    },
    // these only update once
    [firstEventTimestamp, lastEventTimestamp],
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
      oneHourHeightInPx={oneHourHeightInPx}
      locale={locale}
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
      scale={scale}
      locale={locale}
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
        <h3>{activeEvent?.name}</h3>
        <p>{activeEvent?.description}</p>
      </Modal>
    </>
  );
}
