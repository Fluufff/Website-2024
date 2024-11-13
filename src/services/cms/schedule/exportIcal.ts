import ical, { ICalEventData } from 'ical-generator';
import sanitize from 'sanitize-html';

import { Schedule, ScheduleEvent, ScheduleLocation } from './data';

/**
 * Turn a Schedule into ical file contents.
 *
 * Does not bother with time zones, uses UTC.
 */
export function toIcal(schedule: Schedule): string {
  const cal = ical({ name: 'Flüüfff events' });

  for (const event of schedule.events) {
    cal.createEvent(
      toEventData(event, schedule.locationById[event.locationId]),
    );
  }

  return cal.toString();
}

function toEventData(
  event: ScheduleEvent,
  location: ScheduleLocation,
): ICalEventData {
  const description = [
    event.hostName && `Presented by ${event.hostName}`,
    noHtml(event.htmlDescription),
  ]
    .filter(Boolean)
    .join('\n\n');

  return {
    summary: event.name,
    location: location.name,
    start: event.startTime,
    end: event.endTime,
    description,
  };
}

/** rudimentary html-to-text conversion */
function noHtml(htmlString: string): string {
  return sanitize(htmlString, {
    allowedTags: [],
    textFilter(text, tagName) {
      if (tagName.match(/br|p|h[1-7]/)) {
        return text + '\n';
      } else return text;
    },
  });
}
