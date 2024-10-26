import { revalidateTag } from 'next/cache';
import { NextRequest } from 'next/server';
import { z } from 'zod';

import { env } from '@/env';

const validContentTypeIds = new Set([
  env.CMS_CONTENT_TYPE_EVENT,
  env.CMS_CONTENT_TYPE_NEWS_ITEM,
]);

// also contains the whole content including id and language, which we could use
// to refine the cache invalidation, but we don't use that
const payloadSchema = z.object({
  contentTypeId: z
    .string()
    .refine(
      (contentTypeId) => validContentTypeIds.has(contentTypeId),
      'content type value not supported',
    ),
});

function error(status: number, msg: string, detail?: unknown): Response {
  console.error('webhook API error:', msg, detail ?? '');
  const detailField = detail !== undefined ? { detail } : undefined;
  return Response.json({ error: msg, ...detailField }, { status });
}

export async function POST(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token');
  // no need to use secure comparison: security requirement is not high
  if (token !== env.CMS_WEBHOOK_SECRET_TOKEN) {
    return error(401, 'incorrect token');
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return error(400, 'expected json payload');
  }

  const parsed = payloadSchema.safeParse(payload);
  if (!parsed.success) {
    return error(
      400,
      'payload does not satisfy schema',
      parsed.error.flatten(),
    );
  }

  const contentTypeId = parsed.data.contentTypeId;
  revalidateTag(`cms.${contentTypeId}`);

  return new Response();
}
