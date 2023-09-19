'use client';

import React, { Suspense } from 'react';

import { OrthographicCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import { BeachScene } from './BeachScene';

export default function CanvasInteractive() {
  return (
    <>
      {/* <Loading /> */}
      <Suspense fallback={null}>
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
