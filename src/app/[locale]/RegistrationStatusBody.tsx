'use client';

import { DateTimeFormatOptions, useTranslations } from 'next-intl';
import * as R from 'remeda';

import { Link } from '@/helpers/navigation';
import {
  RegistrationState,
  RegistrationStatus,
} from '@/services/reg/registrationStatus';

interface RegistrationStatusBodyProps {
  status: RegistrationStatus;
}

const formats = {
  dateTime: {
    registration: {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      hour: 'numeric',
      minute: '2-digit',
      timeZoneName: 'short',
    },
    registrationShort: {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    },
  } satisfies Record<string, DateTimeFormatOptions>,
};

function TicketsLink({ children }: React.PropsWithChildren) {
  return (
    <div className="u-margin-bottom-sm">
      <Link className="a-button a-button--big" href="/tickets">
        {children}
      </Link>
    </div>
  );
}

const byKey = R.fromKeys(
  // available translation keys
  [
    'REGISTRATION_NOT_STARTED',
    'REGISTRATION_IS_OVER',
    'REGISTRATION_IS_DONE',
    'REGISTRATION_IS_CLOSE',
    'PREREGISTRATION_IS_OPEN',
    'REGISTRATION_IS_OPEN',
    'REGISTRATION_ACCOUNT_OPEN',
    'REGISTRATION_ACCOUNT_CREATION_ONLY',
  ] as const,
  (key) => {
    const RegistrationStatusBody = function ({
      status,
    }: RegistrationStatusBodyProps) {
      const t = useTranslations('general.registration');

      return (
        <>
          {t.rich(
            key,
            {
              opening: status.opening,
              closing: status.closing,
              pricing: (children) => <TicketsLink>{children}</TicketsLink>,
            },
            formats,
          )}
        </>
      );
    };
    RegistrationStatusBody.displayName = 'RegistrationStatusBody_' + key;

    return RegistrationStatusBody;
  },
);

function selectComponent(state: RegistrationState) {
  switch (state) {
    case RegistrationState.REGISTRATION_IS_OPEN_STAFF:
      return byKey[RegistrationState.REGISTRATION_IS_OPEN];
    default:
      return byKey[state];
  }
}

export function RegistrationStatusBody(props: RegistrationStatusBodyProps) {
  const Comp = selectComponent(props.status.state);
  return <Comp {...props} />;
}
