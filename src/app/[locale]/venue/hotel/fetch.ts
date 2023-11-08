import { z } from 'zod';

import { contentWithFields, fetchCmsSiteData } from '@/services/cms/util';

const hotelPageModel = contentWithFields({
  title: z.string(),
  subtitle: z.string(),
  hotel: z.object({
    title: z.string(),
    /** unsanitized HTML */
    body: z.string(),
  }),
  restaurant: z.object({
    title: z.string(),
    /** unsanitized HTML */
    body: z.string(),
  }),
  surroundings: z.object({
    title: z.string(),
    /** unsanitized HTML */
    body: z.string(),
  }),
});

export async function getHotelPage() {
  const res = await fetchCmsSiteData('content/hotel?lang=en', {
    next: { tags: ['cms', 'cms.hotel'] },
  });
  return hotelPageModel
    .transform((data) => data.fields)
    .parse(await res.json());
}
