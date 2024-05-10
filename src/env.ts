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
    APP_ENV: z.enum(['development', 'staging', 'production']),

    /** beware: anything not empty is considered true */
    STANDALONE_OUTPUT: z.string().optional().pipe(z.coerce.boolean()),

    /** when left empty, simulates an empty CMS */
    CMS_API_ROOT: stringOrEmpty.pipe(z.string().url().optional()),
    CMS_SITE_ID: z.string().nonempty(),

    CMS_CONTENT_TYPE_NEWS_ITEM: z.string().nonempty(),
    CMS_CONTENT_TYPE_EVENT: z.string().nonempty(),
  },

  client: {
    NEXT_PUBLIC_ASSET_PREFIX: stringOrEmpty.pipe(z.string().url().optional()),
    NEXT_PUBLIC_REG_ROOT: z.string().url(),
    NEXT_PUBLIC_REG_API_ROOT: z.string().url(),
  },

  // value
  experimental__runtimeEnv: {
    NEXT_PUBLIC_ASSET_PREFIX: process.env.NEXT_PUBLIC_ASSET_PREFIX,
    NEXT_PUBLIC_REG_API_ROOT: process.env.NEXT_PUBLIC_REG_API_ROOT,
    NEXT_PUBLIC_REG_ROOT: process.env.NEXT_PUBLIC_REG_ROOT,
  },
});
