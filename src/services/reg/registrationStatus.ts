import { cache } from 'react';
import * as z from 'zod';

import { ApiError } from '../ApiError';

import { env } from '@/env';

/**
 * @see https://github.com/Fluufff/Platyplus-endpoints-documentation?tab=readme-ov-file#registration-stats
 * @see https://github.com/Fluufff/Platyplus-endpoints-documentation/issues/1
 */
export enum RegistrationState {
  /** "the registration is open and selling tickets" */
  OPEN = 'REGISTRATION_IS_OPEN',

  /** "only registered accounts can buy tickets" */
  OPEN_FOR_ACCOUNTS = 'REGISTRATION_ACCOUNT_OPEN',
  /** "only staff with the secret link can register" */
  OPEN_FOR_STAFF = 'REGISTRATION_IS_OPEN_STAFF',

  /** "only accounts creation is possible" */
  PREREGISTRATION_IS_OPEN = 'PREREGISTRATION_IS_OPEN',
  /** "registration is closed, only accounts creation is possible" */
  REGISTRATION_ACCOUNT_CREATION_ONLY = 'REGISTRATION_ACCOUNT_CREATION_ONLY',

  /** "registration period is over" */
  OVER = 'REGISTRATION_IS_OVER',
  /** "registration is closed (past closing time)" or
   *  "registration has been closed manually by the registration team (tickets are sold out for example)" */
  CLOSED = 'REGISTRATION_IS_CLOSE',

  /** "the attendee registered (if they want more, they will have to contact the registration team)" */
  DONE = 'REGISTRATION_IS_DONE',
}

const schema = z.object({
  _embedded: z.object({
    state: z.nativeEnum(RegistrationState),
    preopening: z.coerce.date(),
    opening: z.coerce.date(),
    closing: z.coerce.date(),
  }),
});

export interface RegistrationStatus {
  state: RegistrationState;
  preopening: Date;
  opening: Date;
  closing: Date;
}

function map(raw: z.infer<typeof schema>): RegistrationStatus {
  return raw._embedded;
}

export const getRegistrationStatus = cache(
  async function getRegistrationStatus(): Promise<RegistrationStatus> {
    const response = await fetch(env.REG_API_ROOT + '/state', {
      // Next.js 14 only offers stale-while-revalidate caching so we disable
      // that. Otherwise we would serve stale data to the first user after the
      // response changes. Not OK at our small scale.
      cache: 'no-store',
    });

    if (!response.ok) throw new ApiError(response);

    return schema.transform(map).parse(await response.json());
  },
);
