'use client';

import { RegistrationStatusBody } from './RegistrationStatusBody';

import { useRegistrationStatus } from '@/services/reg/registrationStatus';

export function RegistrationStatus() {
  const { data, error, isLoading } = useRegistrationStatus();

  if (data) return <RegistrationStatusBody status={data} />;
  else if (error) return 'Error loading registration status...';
  else if (isLoading) return '...';
}
