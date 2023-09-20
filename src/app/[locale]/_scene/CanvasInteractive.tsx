'use client';


import { OrthographicCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, { Suspense, useEffect } from 'react';

import { BeachScene } from './BeachScene';

const DoneTrigger = ({
  loadingRef,
}: {
  loadingRef: React.RefObject<HTMLDivElement>;
}) => {
  useEffect(() => {
    loadingRef.current?.classList.remove('m-loading--done');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => loadingRef.current?.classList.add('m-loading--done');
  }, [loadingRef]);

  return null;
};

export default function CanvasInteractive() {
  const loadingRef = React.useRef<HTMLDivElement>(null);

  return (
    <>
      <div
        // m-loading--done is removed while loading
        className="m-loading m-loading--done"
        ref={loadingRef}
      />
      <Suspense fallback={<DoneTrigger loadingRef={loadingRef} />}>
        <Canvas className="o-canvas__element" frameloop="demand" shadows={true}>
          {/* <Stats /> */}
          <OrthographicCamera
            makeDefault
            position={[0, 0, 10]}
            zoom={clamp(window.innerWidth / 12, 30, 80)}
          />
          <group position={[3, -1.5, 0]}>
            <BeachScene />
            <directionalLight
              position={[10, 20, -5]}
              intensity={Math.PI}
              castShadow
              color="#e6770f"
            />
          </group>
        </Canvas>
      </Suspense>
    </>
  );
}
function clamp(x: number, min: number, max: number) {
  return Math.max(min, Math.min(x, max));
}
