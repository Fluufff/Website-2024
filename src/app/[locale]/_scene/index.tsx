'use client';

import isMobile from 'is-mobile';
import React from 'react';
import NoSSR from 'react-no-ssr';

import CanvasInteractive from './CanvasInteractive';
import CanvasPrerendered from './CanvasPrerendered';

export const mobile = isMobile();

export default function HomepageScene() {
  return (
    <div className="o-canvas">
      <NoSSR onSSR={<CanvasPrerendered />}>
        {mobile ? <CanvasPrerendered /> : <CanvasInteractive />}
      </NoSSR>
    </div>
  );
}
