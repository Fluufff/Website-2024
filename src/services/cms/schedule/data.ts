import * as z from 'zod';

import { extractLabelsField } from '../labels';
import { contentPage, contentWithFields } from '../util';

const fieldsSchema = z.object({
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
  labels: z.array(z.string()),
});

const transformedFieldsSchema = z
  .object({})
  .passthrough()
  .transform(extractLabelsField)
  .pipe(fieldsSchema);

const eventDtoSchema = contentWithFields(transformedFieldsSchema);

type EventDto = z.infer<typeof eventDtoSchema>;

export interface ScheduleEvent {
  slug: string;
  name: string;
  /** unsanitized HTML */
  htmlDescription: string;
  startTime: Date;
  endTime: Date;
  locationId: string;
  labels: string[];
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
      const { slug, fields } = eventDto;
      const { location: locationDto } = fields;

      schedule.events.push({
        slug,
        name: fields.name,
        htmlDescription: fields.description,
        startTime: fields['start-time'],
        endTime: fields['end-time'],
        locationId: fields.location.contentId,
        labels: fields.labels,
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
  contentPage(eventDtoSchema)
    .transform((page) => mapSchedule(page._embedded.content))
    .parse(data);
