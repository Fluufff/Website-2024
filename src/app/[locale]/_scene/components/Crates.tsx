import { useGLTF } from '@react-three/drei';
import React, { FC, useRef } from 'react';

import { DRACO_FOLDER, ASSET_FOLDER } from '../constants';

export const Crates: FC<JSX.IntrinsicElements['group']> = (props) => {
  const group = useRef<THREE.Group>(null);
  const { nodes } = useGLTF(
    `${ASSET_FOLDER}/crates_out/crates.gltf`,
    DRACO_FOLDER,
  ) as any;

  return (
    <group ref={group} {...props} dispose={null}>
      <group
        position={[-3.38, 1.22, 2.24]}
        rotation={[-2.4, -0.35, 0.34]}
        scale={[18.67, 0.61, 3.62]}>
        <mesh
          receiveShadow
          castShadow
          geometry={nodes.CrateClosed_1.geometry}
          material={nodes.CrateClosed_1.material}
        />
        <mesh
          receiveShadow
          castShadow
          geometry={nodes.CrateClosed_2.geometry}
          material={nodes.CrateClosed_2.material}
        />
      </group>
      <group
        position={[-1.39, 0.62, -3.25]}
        rotation={[-1.78, 0.15, 0.7]}
        scale={[18.67, 0.61, 3.62]}>
        <mesh
          receiveShadow
          castShadow
          geometry={nodes.CrateClosed001_1.geometry}
          material={nodes.CrateClosed001_1.material}
        />
        <mesh
          receiveShadow
          castShadow
          geometry={nodes.CrateClosed001_2.geometry}
          material={nodes.CrateClosed001_2.material}
        />
      </group>
      <group
        position={[-2.95, 1.23, 2.7]}
        rotation={[-1.58, 0.07, 0.98]}
        scale={[17.51, 0.58, 3.4]}>
        <mesh
          receiveShadow
          castShadow
          geometry={nodes.CrateLid_1.geometry}
          material={nodes.CrateLid_1.material}
        />
        <mesh
          receiveShadow
          castShadow
          geometry={nodes.CrateLid_2.geometry}
          material={nodes.CrateLid_2.material}
        />
      </group>
      <group
        position={[-3, 1.27, 2.64]}
        rotation={[-2.13, -0.66, 0.78]}
        scale={[17.51, 0.58, 3.4]}>
        <mesh
          receiveShadow
          castShadow
          geometry={nodes.CreateOpen_1.geometry}
          material={nodes.CreateOpen_1.material}
        />
        <mesh
          receiveShadow
          castShadow
          geometry={nodes.CreateOpen_2.geometry}
          material={nodes.CreateOpen_2.material}
        />
      </group>
    </group>
  );
};
