import { getSchedule } from '@/services/cms/schedule';
import { toIcal } from '@/services/cms/schedule/exportIcal';

export async function GET() {
  const icalData = toIcal(await getSchedule('en'));

  return new Response(icalData, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'attachment; filename="fluufff-schedule.ics"',
    },
  });
}
