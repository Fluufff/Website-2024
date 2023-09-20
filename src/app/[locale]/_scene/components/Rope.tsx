import { useGLTF } from '@react-three/drei';
import React, { FC, useRef } from 'react';

import { DRACO_FOLDER, ASSET_FOLDER } from '../constants';

export const Rope: FC<JSX.IntrinsicElements['group']> = (props) => {
  const group = useRef();
  const { nodes, materials } = useGLTF(
    `${ASSET_FOLDER}/rope_out/rope.gltf`,
    DRACO_FOLDER,
  ) as any;

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.rope.geometry}
        material={materials.Rope}
        position={[-3.86, 4.84, 1.07]}
        rotation={[Math.PI, 1.44, Math.PI / 2]}
        scale={[212.2, 174.93, 174.93]}
      />
    </group>
  );
};
