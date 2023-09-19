import React, { FC, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

import { DRACO_FOLDER, ASSET_FOLDER } from '../constants';

const material = new THREE.MeshPhysicalMaterial({
  color: '#7FC500',
  metalness: 0.2,
  roughness: 0.1,
  ior: 0,
  // alphaMap: texture,
  // envMap: hdrEquirect,
  // envMapIntensity: params.envMapIntensity,
  opacity: 0.75, // use material.transmission for glass materials
  specularIntensity: 0,
  // specularTint: params.specularTint,
  side: THREE.FrontSide,
  transparent: true,
});

export const Water: FC<JSX.IntrinsicElements['group']> = (props) => {
  const group = useRef<THREE.Group>(null);
  const { nodes } = useGLTF(
    `${ASSET_FOLDER}/water_out/water.gltf`,
    DRACO_FOLDER,
  ) as any;

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        geometry={nodes.water.geometry}
        position={[0, 0.06, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={390}
        material={material}
      />
    </group>
  );
};
