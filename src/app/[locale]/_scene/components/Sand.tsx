import { useGLTF } from '@react-three/drei';
import React, { FC, useRef } from 'react';

import { DRACO_FOLDER, ASSET_FOLDER } from '../constants';

export const Sand: FC<JSX.IntrinsicElements['group']> = (props) => {
  const group = useRef<THREE.Group>(null);
  // TODO: we previously used nodes from 2022 for some reason?
  const { nodes, materials } = useGLTF(
    `${ASSET_FOLDER}/sand_out/sand.gltf`,
    DRACO_FOLDER,
  ) as any;

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.sand.geometry}
        material={materials.Beach}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
    </group>
  );
};
