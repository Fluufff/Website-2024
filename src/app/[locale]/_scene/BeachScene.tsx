import React, { FC, useCallback, useEffect, useRef } from 'react';
import * as THREE from 'three';
import {
  ContactShadows,
  Environment,
  PresentationControls,
  Sky,
} from '@react-three/drei';
import { EffectComposer, SSAO } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { useThree } from '@react-three/fiber';

import { Sand } from './components/Sand';
import { Water } from './components/Water';
import { Rocks } from './components/Rocks';
import { Rope } from './components/Rope';
import { ErodedLightString } from './ErodedLightString';
import { Furry } from './components/Furry';
import { ErodedTrees } from './components/ErodedTrees';
import { Barrels } from './components/Barrels';
import { ASSET_FOLDER } from './constants';

export const BeachScene = () => {
  const ref = useRef<any>();
  const { invalidate: invalidateInner } = useThree();
  const invalidate = useCallback(() => {
    invalidateInner();
  }, [invalidateInner]);

  useEffect(() => {
    // Dirty hack to fadeout loading screen
    // TODO: find a better way to sort this.
    setTimeout(
      () =>
        document.querySelector('.m-loading')?.classList.add('m-loading--done'),
      1000,
    );
  }, []);

  const endMove = (intervalId: any) => {
    const canvas = document.querySelector('.o-canvas__element')!;

    clearInterval(intervalId);
    canvas.removeEventListener('mousemove', invalidate);
    canvas.removeEventListener('mouseup', endMove);
  };

  useEffect(() => {
    const canvas = document.querySelector('.o-canvas__element')!;

    canvas.addEventListener('mousedown', () => {
      canvas.addEventListener('mousemove', invalidate);
      canvas.addEventListener('mouseup', () => {
        const intervalId = setInterval(invalidate, 30);
        setTimeout(() => endMove(intervalId), 5000);
      });
    });
  }, []);

  return (
    <>
      <EffectComposer>
        <SSAO
          blendFunction={BlendFunction.MULTIPLY}
          distanceThreshold={1}
          bias={0}
          radius={0.01}
          intensity={2}
          distanceFalloff={0}
          luminanceInfluence={0}
          // bug workaround: those are really optional according to docs
          // @ts-expect-error
          worldDistanceThreshold={undefined}
          // @ts-expect-error
          worldDistanceFalloff={undefined}
          // @ts-expect-error
          worldProximityThreshold={undefined}
          // @ts-expect-error
          worldProximityFalloff={undefined}
        />
      </EffectComposer>
      <Environment
        files={`${ASSET_FOLDER}/san_giuseppe_bridge_1k.hdr`}
        background={false}
      />
      <Sky
        distance={100}
        turbidity={0}
        rayleigh={20}
        mieCoefficient={0.005}
        mieDirectionalG={0.8}
        inclination={0.492}
        azimuth={0.26}
      />
      <group
        rotation={[
          THREE.MathUtils.degToRad(20),
          THREE.MathUtils.degToRad(225),
          0,
        ]}
        position={[3.5, -1, 0]}>
        <ContactShadows
          opacity={1}
          scale={50}
          blur={4}
          far={50}
          resolution={256}
        />
      </group>
      <PresentationControls
        global={false} // Spin globally or by dragging the model
        cursor={true} // Whether to toggle cursor style on drag
        snap={true} // Snap-back to center (can also be a spring config)
        rotation={[0, 0, 0]} // Default rotation
        polar={[-(Math.PI / 32), Math.PI / 32]} // Vertical limits
        azimuth={[-(Math.PI / 8), Math.PI / 8]} // Horizontal limits
        config={{ mass: 10, tension: 170, friction: 26 }} // Spring config
      >
        <group
          rotation={[
            THREE.MathUtils.degToRad(20),
            THREE.MathUtils.degToRad(225),
            0,
          ]}
          ref={ref}>
          <Sand />
          <Water />
          <ErodedTrees />
          <Rocks />
          <Rope />
          <Barrels />
          <Furry />
          <ErodedLightString />
        </group>
      </PresentationControls>
    </>
  );
};
