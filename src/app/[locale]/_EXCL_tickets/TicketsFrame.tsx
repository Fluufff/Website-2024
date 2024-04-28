'use client';

import { useIframeAutoHeightProps } from '../../../helpers/useIframeAutoHeightProps';
import { RegistrationStatusBody } from '../RegistrationStatusBody';

import { env } from '@/env';
import {
  RegistrationState,
  useRegistrationStatus,
} from '@/services/reg/registrationStatus';

const isClosed: Partial<Record<RegistrationState, true>> = {
  [RegistrationState.REGISTRATION_NOT_STARTED]: true,
  [RegistrationState.REGISTRATION_IS_OVER]: true,
  [RegistrationState.REGISTRATION_IS_DONE]: true,
  [RegistrationState.REGISTRATION_IS_CLOSE]: true,
};

export function TicketsFrame() {
  const { data, isLoading, error } = useRegistrationStatus();

  const iframeHeightProps = useIframeAutoHeightProps();

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
      <div className="m-registration-frame">
        <iframe
          title="Registration"
          width="100%"
          src={env.NEXT_PUBLIC_REG_ROOT + '/register?iframe'}
          {...iframeHeightProps}
        />
      </div>
    );
}
