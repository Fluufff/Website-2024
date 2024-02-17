import * as z from 'zod';

import { env } from '@/env';

const cmsRoot = env.CMS_API_ROOT;
const cmsSite = env.CMS_SITE_ID;

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

export const contentWithFields = <T extends z.ZodRawShape>(fields: T) =>
  z.object({
    id: z.string(),
    slug: z.string(),
    name: z.string(),
    fields: z.object(fields),
  });

class CmsApiError extends Error {
  constructor(public response: Response) {
    super(`${response.status} ${response.statusText} (${response.url})`);
    this.name = this.constructor.name;
  }
}

export function fetchCmsSiteData(path: string, requestInit?: RequestInit) {
  return fetch(`${cmsRoot}/sites/${cmsSite}/${path}`, requestInit).then(
    (response) => {
      if (response.ok) {
        return response;
      } else {
        throw new CmsApiError(response);
      }
    },
  );
}
