import { RegistrationStatusBody } from './RegistrationStatusBody';

import { getRegistrationStatus } from '@/services/reg/registrationStatus';

export async function RegistrationStatus() {
  const status = await getRegistrationStatus();
  return <RegistrationStatusBody status={status} />;
}
