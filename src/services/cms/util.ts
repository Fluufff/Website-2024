import * as z from 'zod';

import { ApiError } from '../ApiError';

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

export const contentWithFields = <T extends z.ZodTypeAny>(fields: T) =>
  z.object({
    id: z.string(),
    slug: z.string(),
    name: z.string(),
    fields,
  });

export function fetchCmsSiteData(path: string, requestInit?: RequestInit) {
  return fetch(`${cmsRoot}/sites/${cmsSite}/${path}`, requestInit).then(
    (response) => {
      if (response.ok) {
        return response;
      } else {
        throw new ApiError(response);
      }
    },
  );
}

/** Wraps a function that depends on the CMS to return a fallback value if the
 * CMS is not configured. */
export function optionalCms<F extends (...args: any[]) => Promise<any>>(
  fallback: Awaited<ReturnType<F>>,
  fun: F,
): F {
  if (!cmsRoot) {
    return (() => Promise.resolve(fallback)) as F;
  } else return fun;
}
