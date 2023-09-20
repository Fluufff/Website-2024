import { useGLTF } from '@react-three/drei';
import React, { FC, useRef } from 'react';

import { DRACO_FOLDER, ASSET_FOLDER } from '../constants';

export const ErodedTrees: FC<JSX.IntrinsicElements['group']> = (props) => {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials } = useGLTF(
    `${ASSET_FOLDER}/eroded-trees_out/eroded-trees.gltf`,
    DRACO_FOLDER,
  ) as any;

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        geometry={nodes.Circle.geometry}
        material={materials.Bark}
        position={[-3.56, 1.16, 3.15]}
        rotation={[-Math.PI / 2, 0, 1.61]}
        scale={22.88}
      />
      <mesh
        geometry={nodes.Circle002.geometry}
        material={materials.Leaf}
        position={[-3.35, 3.29, 2.2]}
        rotation={[-3, 0.05, 1.32]}
        scale={21.43}
      />
      <mesh
        geometry={nodes.Circle027.geometry}
        material={materials.Leaf}
        position={[-3.86, 3.34, 2.19]}
        rotation={[-2.61, -0.83, 2.04]}
        scale={20.38}
      />
      <mesh
        geometry={nodes.Circle007.geometry}
        material={materials.Bark}
        position={[-3.32, 1.16, 3.35]}
        rotation={[-1.48, 0.12, -0.83]}
        scale={15.05}
      />
      <mesh
        geometry={nodes.Circle008.geometry}
        material={materials.Leaf}
        position={[-2.78, 2.41, 4.04]}
        rotation={[-0.14, 0.49, -1.69]}
        scale={14.78}
      />
      <mesh
        geometry={nodes.Circle011.geometry}
        material={materials.Leaf}
        position={[-2.45, 2.38, 3.71]}
        rotation={[-2.46, 0.83, 1.05]}
        scale={16.84}
      />
      <mesh
        geometry={nodes.Circle014.geometry}
        material={materials.Bark}
        position={[-3.53, 1.34, 0.09]}
        rotation={[-1.62, -0.15, 2.64]}
        scale={18.53}
      />
      <mesh
        geometry={nodes.Circle018.geometry}
        material={materials.Leaf}
        position={[-4.66, 2.97, -0.21]}
        rotation={[-0.43, -0.78, -2]}
        scale={16.32}
      />
      <mesh
        geometry={nodes.Circle025.geometry}
        material={materials.Leaf}
        position={[-4.34, 3.07, -0.39]}
        rotation={[-3.14, -0.48, 1.39]}
        scale={12.39}
      />
    </group>
  );
};
