import * as z from 'zod';

const cmsRoot = process.env.CMS_API_ROOT;
const cmsSite = process.env.CMS_SITE_ID;

export const contentPage = <T extends z.ZodTypeAny>(contentItem: T) =>
  z.object({
    _links: z.object({
      first: z.object({ href: z.string() }),
      last: z.object({ href: z.string() }),
      next: z.object({ href: z.string() }),
      prev: z.object({ href: z.string() }),
    }),
    _page: z.object({
      size: z.number(),
      totalElements: z.number(),
      totalPages: z.number(),
      number: z.number(),
    }),
    _embedded: z.object({
      content: z.array(contentItem),
    }),
  });

export function fetchCmsSiteData(path: string, requestInit?: RequestInit) {
  return fetch(`${cmsRoot}/sites/${cmsSite}/${path}`, requestInit);
}
