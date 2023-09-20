'use client';

import isMobile from 'is-mobile';
import dynamic from 'next/dynamic';
import React from 'react';

import CanvasPrerendered from './CanvasPrerendered';

export const mobile = isMobile();

/** Renders blank canvas in SSR, then lazy-loads 3D render on the client if not
 * mobile. */
const CanvasDispatch = dynamic(
  () =>
    mobile ? Promise.resolve(CanvasPrerendered) : import('./CanvasInteractive'),
  {
    ssr: false,
    /* Multiple reasons to avoid using the prerendered view in SSR:
     * - It forces the client to load the prerendered scene even when we end up
     *   rendering the scene.
     * - The position and size of the prerendered and browser-rendered scenes
     *   won't match.
     * - While the browser-rendered scene loads, react-three-fiber flickers to a
     *   black screen.
     */
    // loading: CanvasPrerendered,
  },
);

export default function HomepageScene() {
  return (
    <div className="o-canvas">
      <CanvasDispatch />
    </div>
  );
}
