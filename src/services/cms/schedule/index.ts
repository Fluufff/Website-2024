import { fetchCmsSiteData } from '../util';

import { parseSchedule, Schedule } from './data';

// TODO: move and assert
const contentTypes = process.env.CMS_CONTENT_TYPE_EVENT!;

export type { Schedule, ScheduleEvent, ScheduleLocation } from './data';

export async function getSchedule(lang: string): Promise<Schedule> {
  const queryString = new URLSearchParams({
    lang,
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
