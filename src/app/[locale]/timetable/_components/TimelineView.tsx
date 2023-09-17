'use client';

import classNames from 'classnames';
import { format } from 'date-fns';
import { useTranslations } from 'next-intl';
import { forwardRef } from 'react';

import { ScheduleEvent, ScheduleLocation } from '@/services/cms/schedule';

interface TimelineViewProps {
  events: ScheduleEvent[];
  locations: ScheduleLocation[];
  conHours: number[];
  firstEventTimestamp: number;
  locale: Locale;
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
      locale,
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
            <p>{t('PAGES.SCHEDULE.SCHEDULE.NOT_AVAILABLE')}</p>
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
                          { locale },
                        ) === '00',
                    })}
                    style={{ left: hour * scale }}>
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
                          { locale },
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
              {events.map((event, i) => (
                <div
                  key={i}
                  className="m-schedule__event"
                  onClick={() => showModal(event)}
                  style={{
                    left:
                      ((event.startTime.getTime() / 1000 -
                        firstEventTimestamp) /
                        (60 * 60)) *
                      scale,
                    top:
                      locations.findIndex(
                        (location) => location.locationId === event.locationId,
                      ) *
                        86 +
                      30,
                    width:
                      ((event.endTime.getTime() - event.startTime.getTime()) /
                        (60 * 60 * 1000)) *
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
          </>
        )}
      </div>
    );
  },
);
