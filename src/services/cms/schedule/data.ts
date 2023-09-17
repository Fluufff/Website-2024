import * as z from 'zod';

const eventDtoSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  fields: z.object({
    description: z.string(),
    name: z.string(),
    location: z.object({
      contentId: z.string(),
      fields: z.object({
        name: z.string(),
      }),
    }),
    'start-time': z.coerce.date(),
    'end-time': z.coerce.date(),
  }),
});

type EventDto = z.infer<typeof eventDtoSchema>;

export interface ScheduleEvent {
  name: string;
  description: string;
  startTime: Date;
  endTime: Date;
  locationId: string;
}

export interface ScheduleLocation {
  locationId: string;
  name: string;
}

export interface Schedule {
  events: Array<ScheduleEvent>;
  locationById: Record<string, ScheduleLocation>;
}

function mapSchedule(scheduleDto: EventDto[]): Schedule {
  return scheduleDto.reduce<Schedule>(
    (schedule, eventDto) => {
      const { fields } = eventDto;
      const { location: locationDto } = fields;

      schedule.events.push({
        name: fields.name,
        description: fields.description,
        startTime: fields['start-time'],
        endTime: fields['end-time'],
        locationId: fields.location.contentId,
      });

      schedule.locationById[locationDto.contentId] ??= {
        locationId: locationDto.contentId,
        name: locationDto.fields.name,
      };

      return schedule;
    },
    {
      events: [],
      locationById: {},
    },
  );
}

export const parseSchedule = (data: unknown) =>
  z.array(eventDtoSchema).transform(mapSchedule).parse(data);
