'use client';

import useSWR from 'swr';

import { RegistrationStatusBody } from './RegistrationStatusBody';

import { getRegistrationStatus } from '@/services/reg/registrationStatus';

export function RegistrationStatus() {
  const { data, error, isLoading } = useSWR(
    'RegistrationStatus',
    getRegistrationStatus,
  );

  if (data) return <RegistrationStatusBody status={data} />;
  else if (error) return 'Error loading registration status...';
  else if (isLoading) return '...';
}
