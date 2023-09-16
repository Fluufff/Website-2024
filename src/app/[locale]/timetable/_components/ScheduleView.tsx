'use client';

import classNames from 'classnames';
import { format, parseISO } from 'date-fns';

import { ScheduleEvent, ScheduleLocation } from '@/services/cms/schedule';

interface ScheduleViewProps {
  events: ScheduleEvent[];
  locations: ScheduleLocation[];
  conHours: number[];
  firstEventTimestamp: number;
  oneHourHeightInPx: number;
  locale: Locale;
  updateScroll: (direction: 'left' | 'right') => void;
  showModal: (event: ScheduleEvent) => void;
}
export function ScheduleView({
  events,
  locations,
  conHours,
  firstEventTimestamp,
  oneHourHeightInPx,
  locale,
  updateScroll,
  showModal,
}: ScheduleViewProps) {
  return (
    <div className="m-timetable">
      <div id="m-timetable__locations" className="m-timetable__locations">
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
                    { locale },
                  ) === '00',
                'm-timetable__hour-indicator--before-daybreak':
                  format(
                    firstEventTimestamp * 1000 + hour * 60 * 60 * 1000,
                    'HH',
                    { locale },
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
                    { locale },
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
                    { locale },
                  )}
              </p>
            </div>
          ))}
        </div>
        <div id="m-timetable__blocks" className="m-timetable__blocks">
          {locations.map((location) => (
            <div className="m-timetable__blocks-block" key={location.name}>
              {events
                .filter((event) => event.locationId === location.locationId)
                .map((event, i) => (
                  <div
                    key={i}
                    onClick={() => showModal(event)}
                    className="m-timetable__event"
                    style={{
                      top:
                        ((parseISO(event.startTime).getTime() / 1000 -
                          firstEventTimestamp) /
                          3600) *
                        oneHourHeightInPx,
                      height:
                        ((parseISO(event.endTime).getTime() / 1000 -
                          parseISO(event.startTime).getTime() / 1000) /
                          3600) *
                        oneHourHeightInPx,
                    }}>
                    <p className="m-schedule__event__name">{event.name}</p>
                    <p className="m-schedule__event__time">
                      {format(parseISO(event.startTime), 'HH:mm')} -{' '}
                      {format(parseISO(event.endTime), 'HH:mm')}
                    </p>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
