import { useGLTF } from '@react-three/drei';
import React, { FC, useRef } from 'react';

import { DRACO_FOLDER, ASSET_FOLDER } from '../constants';

export const Barrels: FC<JSX.IntrinsicElements['group']> = (props) => {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials } = useGLTF(
    `${ASSET_FOLDER}/barrels_out/barrels.gltf`,
    DRACO_FOLDER,
  ) as any;

  return (
    <group ref={group} {...props} dispose={null}>
      <group
        position={[-1.29, 0.65, -3.15]}
        rotation={[-1.35, -0.15, -0.56]}
        scale={19.53}>
        <mesh geometry={nodes.Circle001_1.geometry} material={materials.BASE} />
        <mesh
          geometry={nodes.Circle001_2.geometry}
          material={materials.ACCENT}
        />
      </group>
      <group
        position={[-3.24, 1.18, 2.37]}
        rotation={[-1.68, -0.03, -2.8]}
        scale={19.53}>
        <mesh
          geometry={nodes.Circle003_1.geometry}
          material={materials.Material}
        />
        <mesh
          geometry={nodes.Circle003_2.geometry}
          material={materials['Material.001']}
        />
      </group>
      <group
        position={[-2.8, 1.15, 2.73]}
        rotation={[-1.31, 0.22, 0.03]}
        scale={23.88}>
        <mesh
          geometry={nodes.Circle004_1.geometry}
          material={materials['Material.004']}
        />
        <mesh
          geometry={nodes.Circle004_2.geometry}
          material={materials['Material.003']}
        />
      </group>
    </group>
  );
};
