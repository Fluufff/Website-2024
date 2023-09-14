import { fetchCmsSiteData } from '../util';
import { parseSchedule, Schedule } from './data';

export type { Schedule } from './data';

export async function getSchedule(lang: string): Promise<Schedule> {
  // TODO: cache invalidation
  const res = await fetchCmsSiteData('content');
  return parseSchedule(await res.json());
}
