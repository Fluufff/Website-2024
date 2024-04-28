'use client';

import { DateTimeFormatOptions, useTranslations } from 'next-intl';

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

function interpolations(status: RegistrationStatus) {
  return {
    opening: status.opening,
    closing: status.closing,
    pricing: (children: React.ReactNode) => (
      <TicketsLink>{children}</TicketsLink>
    ),
  };
}

function TicketsLink({ children }: React.PropsWithChildren) {
  return (
    <div className="u-margin-bottom-sm">
      <Link className="a-button a-button--big" href="/tickets">
        {children}
      </Link>
    </div>
  );
}

function mkSimple(
  useTranslationFunction: () => (
    k: 'body',
    i: ReturnType<typeof interpolations>,
    f: typeof formats,
  ) => React.ReactNode,
): React.FC<RegistrationStatusBodyProps> {
  return ({ status }) =>
    useTranslationFunction()('body', interpolations(status), formats);
}

const NotStarted = mkSimple(
  () => useTranslations('general.registration.REGISTRATION_NOT_STARTED').rich,
);
const Open = mkSimple(
  () => useTranslations('general.registration.REGISTRATION_IS_OPEN').rich,
);
const AccountCreationOnly = mkSimple(
  () =>
    useTranslations('general.registration.REGISTRATION_ACCOUNT_CREATION_ONLY')
      .rich,
);
const AccountOpen = mkSimple(
  () => useTranslations('general.registration.REGISTRATION_ACCOUNT_OPEN').rich,
);
const Over = mkSimple(
  () => useTranslations('general.registration.REGISTRATION_IS_OVER').rich,
);
const Done = mkSimple(
  () => useTranslations('general.registration.REGISTRATION_IS_DONE').rich,
);
const Close = mkSimple(
  () => useTranslations('general.registration.REGISTRATION_IS_CLOSE').rich,
);
const Prereg = mkSimple(
  () => useTranslations('general.registration.PREREGISTRATION_IS_OPEN').rich,
);

const byKey: Record<
  RegistrationState,
  React.ComponentType<RegistrationStatusBodyProps>
> = {
  [RegistrationState.REGISTRATION_NOT_STARTED]: NotStarted,
  [RegistrationState.REGISTRATION_IS_OPEN]: Open,
  [RegistrationState.REGISTRATION_ACCOUNT_OPEN]: AccountOpen,
  [RegistrationState.REGISTRATION_IS_OPEN_STAFF]: Open, // same display as regular open
  [RegistrationState.PREREGISTRATION_IS_OPEN]: Prereg,
  [RegistrationState.REGISTRATION_ACCOUNT_CREATION_ONLY]: AccountCreationOnly,
  [RegistrationState.REGISTRATION_IS_OVER]: Over,
  [RegistrationState.REGISTRATION_IS_CLOSE]: Close,
  [RegistrationState.REGISTRATION_IS_DONE]: Done,
};

export function RegistrationStatusBody(props: RegistrationStatusBodyProps) {
  const Comp = byKey[props.status.state];
  return <Comp {...props} />;
}
