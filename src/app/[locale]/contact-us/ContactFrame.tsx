'use client';

import { env } from '@/env';
import { useIframeAutoHeightProps } from '@/helpers/useIframeAutoHeightProps';

export function ContactFrame() {
  const iframeHeightProps = useIframeAutoHeightProps(500);

  return (
    <div className="m-registration-frame">
      <iframe
        title="Contact us"
        width="100%"
        src={env.NEXT_PUBLIC_REG_ROOT + '/contact?iframe'}
        {...iframeHeightProps}
      />
    </div>
  );
}
