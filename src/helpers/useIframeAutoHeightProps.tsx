'use client';

import React, { ReactEventHandler, useCallback, useState } from 'react';

export function useIframeAutoHeightProps(
  defaultHeightPx?: number,
): Pick<React.ComponentProps<'iframe'>, 'height' | 'onLoad'> {
  const [iframeHeight, setIframeHeight] = useState(defaultHeightPx);

  const onIframeLoad: ReactEventHandler<HTMLIFrameElement> = useCallback(
    (e) => {
      const height = e.currentTarget.contentWindow?.document.body.scrollHeight;
      if (height) setIframeHeight(height);
    },
    [setIframeHeight],
  );

  const iframeProps = {
    height: iframeHeight ? `${iframeHeight}px` : undefined,
    onLoad: onIframeLoad,
  };

  return iframeProps;
}
