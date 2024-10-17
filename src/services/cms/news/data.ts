import * as z from 'zod';

import { contentPage, contentWithFields } from '../util';

const newsItemDtoSchema = contentWithFields({
  title: z.string(),
  text: z.string(),
  /** prefer over the content item metadata, which is not controlled by the CMS user */
  'creation-date': z.coerce.date(),
});

type NewsItemDto = z.infer<typeof newsItemDtoSchema>;

export interface NewsItem {
  slug: string;
  title: string;
  /** unsanitized HTML */
  text: string;
  creationDate: Date;
}

function mapNewsItems(itemsDto: NewsItemDto[]): NewsItem[] {
  return itemsDto.map((itemDto) => ({
    slug: itemDto.slug,
    title: itemDto.fields.title,
    text: itemDto.fields.text,
    creationDate: itemDto.fields['creation-date'],
  }));
}

export function parseNewsItems(data: unknown) {
  return contentPage(newsItemDtoSchema)
    .transform((page) => mapNewsItems(page._embedded.content))
    .safeParse(data);
}
