import * as R from 'remeda';

import { fetchCmsSiteData } from '../util';

import {
  parseSchedule,
  Schedule,
  ScheduleEvent,
  ScheduleLocation,
} from './data';

// TODO: move and assert
const contentTypes = process.env.CMS_CONTENT_TYPE_EVENT!;

export type { Schedule, ScheduleEvent, ScheduleLocation } from './data';

/** Fetches and parses the schedule data for one given language. */
async function getScheduleForLanguage(language: string): Promise<Schedule> {
  const queryString = new URLSearchParams({
    lang: language,
    pagesize: '-1',
    contentTypes,
    populate: 'true',
  });

  // TODO: cache invalidation
  const res = await fetchCmsSiteData('content?' + queryString, {
    next: { tags: ['cms', 'cms.schedule'] },
  });
  return parseSchedule(await res.json());
}

/** Fetches and parses the schedule data with language fallback.
 *
 * @param languages The list of languages to query events for. When an event is
 * available in multiple languages, only the first entry is kept, according to
 * the order of languages provided.
 */
async function getScheduleWithFallbackLanguages(
  languages: string[],
): Promise<Schedule> {
  const schedules = await Promise.all(
    R.uniq(languages).map(getScheduleForLanguage),
  );

  const locationById: Record<string, ScheduleLocation> = schedules.reduceRight(
    (acc, schedule) => Object.assign(acc, schedule.locationById),
    {},
  );

  const eventBySlug: Record<string, ScheduleEvent> = schedules.reduceRight(
    (acc, schedule) =>
      Object.assign(
        acc,
        Object.fromEntries(schedule.events.map((event) => [event.slug, event])),
      ),
    {},
  );

  return {
    locationById,
    events: Object.values(eventBySlug),
  };
}

/** Fetches and parses the schedule data, using English as fallback. */
export function getSchedule(language: string): Promise<Schedule> {
  return getScheduleWithFallbackLanguages([language, 'en']);
}
