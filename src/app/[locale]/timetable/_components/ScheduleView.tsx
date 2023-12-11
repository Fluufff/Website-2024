'use client';

import classNames from 'classnames';
import {
  addHours,
  differenceInSeconds,
  format,
  getHours,
  Locale,
} from 'date-fns';

import { ScheduleEvent, ScheduleLocation } from '@/services/cms/schedule';

interface ScheduleViewProps {
  events: ScheduleEvent[];
  locations: ScheduleLocation[];
  conHours: number[];
  firstEventTimestamp: Date;
  scale: number;
  dateLocale: Locale;
  updateScroll: (direction: 'left' | 'right') => void;
  showModal: (event: ScheduleEvent) => void;
}
export function ScheduleView({
  events,
  locations,
  conHours,
  firstEventTimestamp,
  scale,
  dateLocale,
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
          {conHours.map((hour) => {
            const time = addHours(firstEventTimestamp, hour);
            const firstHour = getHours(time) === 0;
            const lastHour = getHours(time) === 23;
            return (
              <div
                id={`p_${+time}`}
                key={hour}
                style={{
                  height: `${scale}px`,
                }}
                className={classNames({
                  'm-timetable__hour-indicator': true,
                  'm-timetable__hour-indicator--daybreak': firstHour,
                  'm-timetable__hour-indicator--before-daybreak': lastHour,
                })}>
                <p className="m-timetable__hour-indicator__time">
                  {format(time, 'HH:mm')}
                </p>
                <p className="m-timetable__hour-indicator__day">
                  {firstHour && format(time, 'eeee', { locale: dateLocale })}
                </p>
                <p className="m-timetable__hour-indicator__day m-timetable__hour-indicator__day--mobile">
                  {firstHour && format(time, 'dd/MM', { locale: dateLocale })}
                </p>
              </div>
            );
          })}
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
                        (differenceInSeconds(
                          event.startTime,
                          firstEventTimestamp,
                        ) /
                          3600) *
                        scale,
                      height:
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
          ))}
        </div>
      </div>
    </div>
  );
}
