'use client';

import { DateTimeFormatOptions, useTranslations } from 'next-intl';

import { env } from '@/env';
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
      day: 'numeric',
      month: 'long',
      hour: 'numeric',
      minute: '2-digit',
      timeZoneName: 'short',
    },
    registrationShort: {
      day: 'numeric',
      month: 'long',
      hour: 'numeric',
      minute: '2-digit',
    },
  } satisfies Record<string, DateTimeFormatOptions>,
};

function interpolations(status: RegistrationStatus) {
  return {
    opening: status.opening,
    closing: status.closing,
  };
}

function CreateAccountCta({ children }: React.PropsWithChildren) {
  return (
    <div className="u-margin-bottom-sm">
      <Link
        className="a-button a-button--big"
        href={env.NEXT_PUBLIC_REG_ROOT + '/register'}>
        {children}
      </Link>
    </div>
  );
}

function TicketsCta({ children }: React.PropsWithChildren) {
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
  // eslint-disable-next-line react/display-name
  return ({ status }) => (
    <p>{useTranslationFunction()('body', interpolations(status), formats)}</p>
  );
}

function mkWithCta(
  Cta: React.ComponentType<React.PropsWithChildren>,
  useTranslationFunction: () => (
    k: 'body' | 'button',
    i: ReturnType<typeof interpolations>,
    f: typeof formats,
  ) => React.ReactNode,
): React.FC<RegistrationStatusBodyProps> {
  // eslint-disable-next-line react/display-name
  return ({ status }) => {
    const t = useTranslationFunction();

    return (
      <>
        <div>
          <Cta>{t('button', interpolations(status), formats)}</Cta>
        </div>
        <p>{t('body', interpolations(status), formats)}</p>
      </>
    );
  };
}

const NotStarted = mkSimple(() =>
  useTranslations('general.registration.REGISTRATION_NOT_STARTED'),
);
const Open = mkWithCta(TicketsCta, () =>
  useTranslations('general.registration.REGISTRATION_IS_OPEN'),
);
const AccountCreationOnly = mkWithCta(CreateAccountCta, () =>
  useTranslations('general.registration.REGISTRATION_ACCOUNT_CREATION_ONLY'),
);
const AccountOpen = mkWithCta(TicketsCta, () =>
  useTranslations('general.registration.REGISTRATION_ACCOUNT_OPEN'),
);
const Over = mkSimple(() =>
  useTranslations('general.registration.REGISTRATION_IS_OVER'),
);
const Done = mkSimple(() =>
  useTranslations('general.registration.REGISTRATION_IS_DONE'),
);
const Close = mkSimple(() =>
  useTranslations('general.registration.REGISTRATION_IS_CLOSE'),
);
const Prereg = mkSimple(() =>
  useTranslations('general.registration.PREREGISTRATION_IS_OPEN'),
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
