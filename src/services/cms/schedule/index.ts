import * as R from 'remeda';

import { fetchCmsSiteData, optionalCms } from '../util';

import { parseSchedule, Schedule } from './data';

import { env } from '@/env';

const contentType = env.CMS_CONTENT_TYPE_EVENT!;

export type { Schedule, ScheduleEvent, ScheduleLocation } from './data';

/** Fetches and parses the schedule data for one given language. */
async function getScheduleForLanguage(language: string): Promise<Schedule> {
  const queryString = new URLSearchParams({
    lang: language,
    pagesize: '-1',
    contentTypes: contentType,
    populate: 'true',
  });

  // TODO: cache invalidation
  const res = await fetchCmsSiteData('content?' + queryString, {
    next: { tags: ['cms', 'cms.schedule', `cms.${contentType}`] },
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

  const events = R.pipe(
    schedules,
    R.flatMap((schedule) => schedule.events),
    R.uniqBy((event) => event.slug),
  );

  const locationById = R.pipe(
    schedules,
    R.flatMap((schedule) => R.values(schedule.locationById)),
    R.indexBy((location) => location.locationId),
  );

  return {
    locationById,
    events,
  };
}

/** Fetches and parses the schedule data, using English as fallback. */
export const getSchedule = optionalCms(
  { events: [], locationById: {} },
  function getSchedule(language: string): Promise<Schedule> {
    return getScheduleWithFallbackLanguages([language, 'en']);
  },
);

export async function getHasSchedule(locale: string): Promise<boolean> {
  const schedule = await getSchedule(locale);
  return !!schedule.events.length;
}
