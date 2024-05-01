'use client';

import IframeResizer from 'iframe-resizer-react';

import { env } from '@/env';

export function ContactFrame() {
  return (
    <div className="m-registration-frame">
      <IframeResizer
        // initial height
        height={500}
        title="Contact us"
        width="100%"
        src={env.NEXT_PUBLIC_REG_ROOT + '/contact?iframe'}
      />
    </div>
  );
}
