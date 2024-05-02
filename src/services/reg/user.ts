import { cache } from 'react';
import useSWR from 'swr';
import * as z from 'zod';

import { ApiError } from '../ApiError';

import { env } from '@/env';

/**
 * Partial schema of the user response, with just the bits that matter to us.
 *
 * @see https://github.com/Fluufff/Platyplus-endpoints-documentation/?tab=readme-ov-file#user
 */
const schema = z.object({
  _embedded: z.object({
    profile: z.object({
      nick: z.string(),
      avatar: z.object({
        thumbnail: z.string(),
      }),
    }),
  }),
});

export interface User {
  name: string;
  avatarThumbnail: string;
}

function map(raw: z.infer<typeof schema>): User {
  return {
    name: raw._embedded.profile.nick,
    avatarThumbnail: raw._embedded.profile.avatar.thumbnail,
  };
}

export const getCurrentUser = cache(
  async function getCurrentUser(): Promise<User> {
    const response = await fetch(env.NEXT_PUBLIC_REG_API_ROOT + '/user', {
      cache: 'no-store',
      credentials: 'include',
    });

    if (!response.ok) throw new ApiError(response);

    return schema.transform(map).parse(await response.json());
  },
);

// client-side fetcher
export function useCurrentUser() {
  return useSWR('registration/user', () => getCurrentUser(), {
    onError(err) {
      console.error(err);
    },
  });
}
