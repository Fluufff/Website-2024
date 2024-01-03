import { useGLTF } from '@react-three/drei';
import React, { FC, useRef } from 'react';

import { DRACO_FOLDER, ASSET_FOLDER } from '../constants';

export const Bottles: FC<JSX.IntrinsicElements['group']> = (props) => {
  const group = useRef<THREE.Group>(null);
  const { nodes } = useGLTF(
    `${ASSET_FOLDER}/bottles_out/bottles.gltf`,
    DRACO_FOLDER,
  ) as any;

  return (
    <group ref={group} {...props} dispose={null}>
      <group
        position={[3.31, 1.05, 1.28]}
        rotation={[-1.71, -0.1, -0.54]}
        scale={[4.72, 3.32, 4.72]}>
        <mesh
          castShadow
          geometry={nodes.Plane002_1.geometry}
          material={nodes.Plane002_1.material}
        />
        <mesh
          castShadow
          geometry={nodes.Plane002_2.geometry}
          material={nodes.Plane002_2.material}
        />
        <mesh
          castShadow
          geometry={nodes.Plane002_3.geometry}
          material={nodes.Plane002_3.material}
        />
      </group>
      <group
        position={[3.58, 1.04, 1.22]}
        rotation={[-1.67, -0.12, -0.39]}
        scale={[4.54, 4.54, 4.54]}>
        <mesh
          castShadow
          geometry={nodes.Circle021_1.geometry}
          material={nodes.Circle021_1.material}
        />
        <mesh
          castShadow
          geometry={nodes.Circle021_2.geometry}
          material={nodes.Circle021_2.material}
        />
        <mesh
          castShadow
          geometry={nodes.Circle021_3.geometry}
          material={nodes.Circle021_3.material}
        />
      </group>
      <group
        position={[3.51, 1.03, 1.39]}
        rotation={[-1.52, -0.06, -0.43]}
        scale={4.83}>
        <mesh
          castShadow
          geometry={nodes.Circle022_1.geometry}
          material={nodes.Circle022_1.material}
        />
        <mesh
          castShadow
          geometry={nodes.Circle022_2.geometry}
          material={nodes.Circle022_2.material}
        />
        <mesh
          castShadow
          geometry={nodes.Circle022_3.geometry}
          material={nodes.Circle022_3.material}
        />
      </group>
      <group
        position={[-1.22, 1.19, 3.43]}
        rotation={[-1.45, -0.13, 1.19]}
        scale={[4.72, 3.32, 4.72]}>
        <mesh
          castShadow
          geometry={nodes.Plane001_1.geometry}
          material={nodes.Plane001_1.material}
        />
        <mesh
          castShadow
          geometry={nodes.Plane001_2.geometry}
          material={nodes.Plane001_2.material}
        />
        <mesh
          castShadow
          geometry={nodes.Plane001_3.geometry}
          material={nodes.Plane001_3.material}
        />
      </group>
      <group
        position={[-1.33, 1.25, 3.17]}
        rotation={[-1.4, 0.2, 1.45]}
        scale={4.54}>
        <mesh
          castShadow
          geometry={nodes.Circle028_1.geometry}
          material={nodes.Circle028_1.material}
        />
        <mesh
          castShadow
          geometry={nodes.Circle028_2.geometry}
          material={nodes.Circle028_2.material}
        />
        <mesh
          castShadow
          geometry={nodes.Circle028_3.geometry}
          material={nodes.Circle028_3.material}
        />
      </group>
      <group
        position={[-3.11, 1.45, 0.54]}
        rotation={[-1.56, -0.1, -0.11]}
        scale={[4.83, 4.83, 4.83]}>
        <mesh
          castShadow
          geometry={nodes.Circle029_1.geometry}
          material={nodes.Circle029_1.material}
        />
        <mesh
          castShadow
          geometry={nodes.Circle029_2.geometry}
          material={nodes.Circle029_2.material}
        />
        <mesh
          castShadow
          geometry={nodes.Circle029_3.geometry}
          material={nodes.Circle029_3.material}
        />
      </group>
    </group>
  );
};
