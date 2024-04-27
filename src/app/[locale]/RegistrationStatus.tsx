import { ClientLocalTime } from './ClientLocalTime';

import {
  getRegistrationStatus,
  RegistrationState,
  RegistrationStatus as IRegistrationStatus,
} from '@/services/reg/registrationStatus';

export async function RegistrationStatus({ locale }: { locale: string }) {
  const status = await getRegistrationStatus();

  return <RegistrationStatusBody locale={locale} status={status} />;
}

function RegistrationStatusBody({
  locale,
  status,
}: {
  locale: string;
  status: IRegistrationStatus;
}): React.ReactNode {
  switch (status.state) {
    case RegistrationState.PREREGISTRATION_IS_OPEN:
    case RegistrationState.REGISTRATION_ACCOUNT_CREATION_ONLY:
    case RegistrationState.REGISTRATION_IS_OPEN_STAFF:
      // from public's POV, registration is not open yet
      return (
        <>
          TODO fix copy: {}
          Registration will open{' '}
          <ClientLocalTime
            locale={locale}
            format="PPPPpppp"
            date={+status.opening}
          />
        </>
      );

    case RegistrationState.REGISTRATION_IS_OPEN:
      // go go go!
      return (
        <>
          TODO fix copy: {}
          Registration open until{' '}
          <ClientLocalTime
            locale={locale}
            format="PPPPpppp"
            date={+status.closing}
          />
        </>
      );

    case RegistrationState.REGISTRATION_IS_OVER:
    case RegistrationState.REGISTRATION_IS_CLOSE:
      return (
        <>
          TODO fix copy: {}
          Registration closed{' '}
          <ClientLocalTime
            locale={locale}
            format="PPPPpppp"
            date={+status.closing}
          />
        </>
      );

    case RegistrationState.REGISTRATION_IS_DONE:
    case RegistrationState.REGISTRATION_ACCOUNT_OPEN:
      return status + '???';
  }
}
