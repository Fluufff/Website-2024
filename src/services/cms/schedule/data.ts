import * as z from 'zod';

const eventDtoSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  fields: z.object({
    description: z.string(),
    name: z.string(),
    room: z.object({
      contentId: z.string(),
      fields: z.object({
        name: z.string(),
      }),
    }),
    'start-time': z.string(),
    'end-time': z.string(),
  }),
});

type EventDto = z.infer<typeof eventDtoSchema>;

export interface Schedule {
  events: Array<{
    name: string;
    description: string;
    startTime: string;
    endTime: string;
    roomId: string;
  }>;
  roomById: Record<
    string,
    {
      name: string;
    }
  >;
}

function mapSchedule(scheduleDto: EventDto[]): Schedule {
  return scheduleDto.reduce<Schedule>(
    (schedule, eventDto) => {
      const { fields } = eventDto;
      const { room: roomDto } = fields;

      schedule.events.push({
        name: fields.name,
        description: fields.description,
        startTime: fields['start-time'],
        endTime: fields['end-time'],
        roomId: fields.room.contentId,
      });

      schedule.roomById[roomDto.contentId] ??= { name: roomDto.fields.name };

      return schedule;
    },
    {
      events: [],
      roomById: {},
    },
  );
}

export const parseSchedule = (data: unknown) =>
  z.array(eventDtoSchema).transform(mapSchedule).parse(data);
