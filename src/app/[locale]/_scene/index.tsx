'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrthographicCamera } from '@react-three/drei';
// import { BeachScene } from '../../scenes/beach.scene';
// import { Loading } from '../../components/loading.component';
import isMobile from 'is-mobile';
import { BeachScene } from './BeachScene';
import NoSSR from 'react-no-ssr';

export const mobile = isMobile();

export default function HomepageScene() {
  return (
    <div className="o-canvas">
      <NoSSR onSSR={<StaticImageScene />}>
        {mobile ? <StaticImageScene /> : <InteractiveScene />}
      </NoSSR>
    </div>
  );
}

function StaticImageScene() {
  return <div className="o-canvas__fallback"></div>;
}

function InteractiveScene() {
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
              intensity={1}
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
