import {
  ContactShadows,
  Environment,
  PresentationControls,
  Sky,
} from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { EffectComposer, SSAO } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

import { LightString as LightString } from './LightString';
import { Bottles } from './components/Bottles';
import { Crates } from './components/Crates';
import { Furry } from './components/Furry';
import { Rocks } from './components/Rocks';
import { Rope } from './components/Rope';
import { Sand } from './components/Sand';
import { Trees } from './components/Trees';
import { Water } from './components/Water';

/** Sets up event listeners for manual invalidation with PresentationControls.
 *
 * Workaround for https://github.com/pmndrs/drei/issues/1529. Unlike other
 * controls, PresentationControls does not call `invalidate` and is therefore
 * not compatible with `frameloop="demand"` out of the box.
 *
 * @returns a cleanup function that does not interrupt the current interaction
 */
function setupDragWorkaround(
  element: Element,
  invalidate: () => void,
): () => void {
  function onStartDrag() {
    element.addEventListener('mousemove', invalidate);
  }

  function onEndDrag() {
    element.removeEventListener('mousemove', invalidate);

    // give the spring animation time to finish
    const intervalId = setInterval(invalidate, 30);
    setTimeout(() => clearInterval(intervalId), 5000);
  }

  element.addEventListener('mousedown', onStartDrag);
  element.addEventListener('mouseup', onEndDrag);

  return () => {
    element.removeEventListener('mousedown', onStartDrag);
    element.removeEventListener('mouseup', onEndDrag);
  };
}

export const BeachScene = () => {
  const ref = useRef<any>();
  const { invalidate } = useThree();

  useEffect(() => {
    const canvas = document.querySelector('.o-canvas__element');
    return canvas ? setupDragWorkaround(canvas, () => invalidate()) : undefined;
  }, [invalidate]);

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
        files={require('@/assets/3d/venice_sunset_tiny.hdr?raw')}
        background={false}
      />
      <Sky
        distance={100}
        turbidity={12}
        rayleigh={6}
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
          <Trees />
          <Rocks />
          <Rope />
          <Bottles />
          <Crates />
          <Furry />
          <LightString />
        </group>
      </PresentationControls>
    </>
  );
};
