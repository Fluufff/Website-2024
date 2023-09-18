import { fetchCmsSiteData } from '../util';
import { parseSchedule, Schedule } from './data';

export type { Schedule, ScheduleEvent, ScheduleLocation } from './data';

export async function getSchedule(lang: string): Promise<Schedule> {
  const queryString = new URLSearchParams({ lang, pagesize: '-1' });

  // TODO: cache invalidation
  const res = await fetchCmsSiteData('content?' + queryString, {
    next: { tags: ['cms', 'cms.schedule'] },
  });
  return parseSchedule(await res.json());
}
