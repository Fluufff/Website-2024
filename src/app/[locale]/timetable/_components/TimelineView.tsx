'use client';

import classNames from 'classnames';
import {
  addHours,
  differenceInSeconds,
  format,
  getHours,
  Locale,
} from 'date-fns';
import { useTranslations } from 'next-intl';
import { forwardRef } from 'react';

import { ScheduleEvent, ScheduleLocation } from '@/services/cms/schedule';

interface TimelineViewProps {
  events: ScheduleEvent[];
  locations: ScheduleLocation[];
  conHours: number[];
  firstEventTimestamp: Date;
  dateLocale: Locale;
  scale: number;
  isCurrentTimeInSchedule: boolean | undefined;
  currentTimeIndicatorPosition: number;
  showModal: (event: ScheduleEvent) => void;
}

export const TimelineView = forwardRef<HTMLDivElement, TimelineViewProps>(
  function TimelineView(
    {
      events,
      locations,
      conHours,
      firstEventTimestamp,
      dateLocale,
      scale,
      isCurrentTimeInSchedule,
      currentTimeIndicatorPosition,
      showModal,
    },
    scheduleRef,
  ) {
    const t = useTranslations('Timetable');

    return (
      <div className="m-schedule">
        {!events.length ? (
          <div className="m-schedule__empty">
            <p>{t('schedule.not_available')}</p>
          </div>
        ) : (
          <>
            <div className="m-schedule__locations">
              {locations.map((location) => (
                <div key={location.locationId} className="m-schedule__location">
                  <p>{location.name}</p>
                </div>
              ))}
            </div>
            <div className="m-schedule__events-box">
              <div
                className="m-schedule__events"
                id="m-schedule__events"
                ref={scheduleRef}>
                <div className="m-schedule__hour-indicators">
                  {conHours.map((hour) => {
                    const time = addHours(firstEventTimestamp, hour);
                    const firstHour = getHours(time) === 0;
                    return (
                      <div
                        id={`p_${+time}`}
                        key={hour}
                        className={classNames({
                          'm-schedule__hour-indicator': true,
                          'm-schedule__hour-indicator--daybreak': firstHour,
                        })}
                        style={{ left: hour * scale }}>
                        <p className="m-schedule__hour-indicator__time">
                          {format(time, 'HH:mm')}
                        </p>
                        <p className="m-schedule__hour-indicator__day">
                          {firstHour &&
                            format(time, 'eeee', { locale: dateLocale })}
                        </p>
                      </div>
                    );
                  })}
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
                {events.map((event, i) => (
                  <div
                    key={i}
                    className="m-schedule__event"
                    onClick={() => showModal(event)}
                    style={{
                      left:
                        (differenceInSeconds(
                          event.startTime,
                          firstEventTimestamp,
                        ) /
                          3600) *
                        scale,
                      top:
                        locations.findIndex(
                          (location) =>
                            location.locationId === event.locationId,
                        ) *
                          86 +
                        30,
                      width:
                        (differenceInSeconds(event.endTime, event.startTime) /
                          3600) *
                        scale,
                    }}>
                    <p className="m-schedule__event__name">{event.name}</p>
                    <p className="m-schedule__event__time">
                      {format(event.startTime, 'HH:mm')} -{' '}
                      {format(event.endTime, 'HH:mm')}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    );
  },
);
