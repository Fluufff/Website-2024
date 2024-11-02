import * as z from 'zod';

import { extractLabelsField } from '../labels';
import { contentPage, contentWithFields } from '../util';

const fieldsSchema = z.object({
  // DCM quirk: when not interacted with, description is null rather than blank
  // HTML tags
  description: z.string().nullable(),
  name: z.string(),
  location: z.object({
    contentId: z.string(),
    fields: z.object({
      name: z.string(),
      position: z.preprocess(
        /** (Taiga #29) DCM outputs its number fields as strings in the API.
         * This is a pre-emptive fix for that, until actually fixed in DCM
         * itself.
         */
        function preprocessQuirkyNumberField(val) {
          if (typeof val !== 'string') return val;
          else if (val === '') return null;
          else return Number(val);
        },
        z.number().nullable(),
      ),
    }),
  }),
  'start-time': z.coerce.date(),
  'end-time': z.coerce.date(),
  'host-name': z.string().optional(),
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
  hostName: string | undefined;
  labels: string[];
}

export interface ScheduleLocation {
  locationId: string;
  name: string;
  /** determines the ordering of the schedule columns */
  position: number;
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
        htmlDescription: fields.description ?? '',
        startTime: fields['start-time'],
        endTime: fields['end-time'],
        locationId: fields.location.contentId,
        hostName: fields['host-name'] || undefined,
        labels: fields.labels,
      });

      schedule.locationById[locationDto.contentId] ??= {
        locationId: locationDto.contentId,
        name: locationDto.fields.name,
        position: locationDto.fields.position ?? 99999,
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
    .safeParse(data);
