// @ts-check

import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  // schema
  server: {
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
