'use client';

import IframeResizer from 'iframe-resizer-react';

import { env } from '@/env';
import { useRegistrationLang } from '@/services/reg/useRegistrationLang';

export function ContactFrame() {
  const langParam = useRegistrationLang().toString();

  return (
    <div className="m-registration-frame">
      <IframeResizer
        // initial height
        height={500}
        title="Contact us"
        width="100%"
        src={`${env.NEXT_PUBLIC_REG_ROOT}/contact?iframe${
          langParam && '&' + langParam
        }`}
      />
    </div>
  );
}
