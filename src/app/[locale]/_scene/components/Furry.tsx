import React, { FC, useRef } from 'react';
import { useGLTF } from '@react-three/drei';

import { DRACO_FOLDER, ASSET_FOLDER } from '../constants';

export const Furry: FC<JSX.IntrinsicElements['group']> = (props) => {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials } = useGLTF(
    `${ASSET_FOLDER}/furry_out/furry.gltf`,
    DRACO_FOLDER,
  ) as any;

  return (
    <group ref={group} {...props} dispose={null}>
      <group
        position={[-1.67, 0.85, 2.31]}
        rotation={[-0.3, 0.31, -3.05]}
        scale={[4.01, 4.6, 5.15]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Body_1.geometry}
          material={materials['Black.002']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Body_2.geometry}
          material={materials['Yellow.002']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Body_3.geometry}
          material={materials['White.002']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Body_4.geometry}
          material={materials['Grey.002']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Body_5.geometry}
          material={materials['Yellow.001']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Body_6.geometry}
          material={materials['White.001']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Body_7.geometry}
          material={materials['Black.001']}
        />
      </group>
    </group>
  );
};
