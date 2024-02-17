// @ts-check

import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

/** Interprets an empty string as undefined
 *
 * This allows discarding variables set in .env by setting them to the empty
 * string.
 */
const stringOrEmpty = z.string().transform((s) => s || undefined);

export const env = createEnv({
  // schema
  server: {
    ASSET_PREFIX: stringOrEmpty.pipe(z.string().url().optional()),

    /** beware: anything not empty is considered true */
    STANDALONE_OUTPUT: z.string().optional().pipe(z.coerce.boolean()),

    CMS_API_ROOT: z.string().url(),
    CMS_SITE_ID: z.string().nonempty(),

    CMS_CONTENT_TYPE_NEWS_ITEM: z.string().nonempty(),
    CMS_CONTENT_TYPE_EVENT: z.string().nonempty(),
  },

  // value
  experimental__runtimeEnv: {},
});
