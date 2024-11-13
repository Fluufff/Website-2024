import { cache } from 'react';
import useSWR from 'swr';
import * as z from 'zod';

import { ParsingError } from '../ParsingError';


/**
 * @see https://github.com/Fluufff/Platyplus-endpoints-documentation?tab=readme-ov-file#registration-stats
 * @see https://github.com/Fluufff/Platyplus-endpoints-documentation/issues/1
 */
export enum RegistrationState {
  /** (undocumented) */
  REGISTRATION_NOT_STARTED = 'REGISTRATION_NOT_STARTED',

  /** "the registration is open and selling tickets" */
  REGISTRATION_IS_OPEN = 'REGISTRATION_IS_OPEN',

  /** "only registered accounts can buy tickets" */
  REGISTRATION_ACCOUNT_OPEN = 'REGISTRATION_ACCOUNT_OPEN',
  /** "only staff with the secret link can register" */
  REGISTRATION_IS_OPEN_STAFF = 'REGISTRATION_IS_OPEN_STAFF',

  /** "only accounts creation is possible" */
  PREREGISTRATION_IS_OPEN = 'PREREGISTRATION_IS_OPEN',
  /** "registration is closed, only accounts creation is possible" */
  REGISTRATION_ACCOUNT_CREATION_ONLY = 'REGISTRATION_ACCOUNT_CREATION_ONLY',

  /** "registration period is over" */
  REGISTRATION_IS_OVER = 'REGISTRATION_IS_OVER',
  /** "registration is closed (past closing time)" or
   *  "registration has been closed manually by the registration team (tickets are sold out for example)" */
  REGISTRATION_IS_CLOSE = 'REGISTRATION_IS_CLOSE',

  /** "the attendee registered (if they want more, they will have to contact the registration team)" */
  REGISTRATION_IS_DONE = 'REGISTRATION_IS_DONE',
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
    // static archive
    const responseJson = {
      _links: {
        self: {
          href: '/rest/register/',
        },
      },
      _embedded: {
        state: 'REGISTRATION_ACCOUNT_CREATION_ONLY',
        preopening: '2024-05-17T21:00:00+02:00',
        opening: '2024-07-06T12:00:00+02:00',
        closing: '2024-11-06T00:00:00+01:00',
      },
    };

    const statusOrError = schema.transform(map).safeParse(await responseJson);

    if (statusOrError.success) {
      return statusOrError.data;
    } else {
      throw new ParsingError(statusOrError.error);
    }
  },
);

// client-side fetcher
export function useRegistrationStatus() {
  return useSWR('registration/state', () => getRegistrationStatus(), {
    onError(err) {
      console.error(err);
    },
  });
}
