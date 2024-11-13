'use client';


import { RegistrationStatusBody } from '../RegistrationStatusBody';

import {
  RegistrationState,
  useRegistrationStatus,
} from '@/services/reg/registrationStatus';
import { useRegistrationLang } from '@/services/reg/useRegistrationLang';

const isClosed: Partial<Record<RegistrationState, true>> = {
  [RegistrationState.REGISTRATION_NOT_STARTED]: true,
  [RegistrationState.REGISTRATION_IS_OVER]: true,
  [RegistrationState.REGISTRATION_IS_DONE]: true,
  [RegistrationState.REGISTRATION_IS_CLOSE]: true,
};

export function TicketsFrame() {
  const { data, isLoading, error } = useRegistrationStatus();
  const langParam = useRegistrationLang();

  if (isLoading || error || !data)
    return (
      <div className="m-registration-frame">
        <div className="m-registration-frame__placeholder">
          {isLoading ? '...' : 'Error loading registration status...'}
        </div>
      </div>
    );
  else if (isClosed[data.state])
    return (
      <div className="m-registration-frame">
        <div className="m-registration-frame__placeholder">
          <RegistrationStatusBody status={data} />
        </div>
      </div>
    );
  else
    return (
      <div className="m-registration-frame m-registration-frame__placeholder">
        (registration is closed)
      </div>
    );
}
