import { useGLTF } from '@react-three/drei';
import React, { FC, useRef } from 'react';

import { DRACO_FOLDER, ASSET_FOLDER } from '../constants';

export const Trees: FC<JSX.IntrinsicElements['group']> = (props) => {
  const group = useRef<THREE.Group>(null);
  const { nodes } = useGLTF(
    `${ASSET_FOLDER}/trees_out/trees.gltf`,
    DRACO_FOLDER,
  ) as any;

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        geometry={nodes.Circle.geometry}
        material={nodes.Circle.material}
        position={[-3.56, 1.16, 3.15]}
        rotation={[-Math.PI / 2, 0, 1.61]}
        scale={22.88}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.Circle001.geometry}
        material={nodes.Circle001.material}
        position={[-3.58, 3.92, 1.49]}
        rotation={[-1.81, -0.01, 1.61]}
        scale={[22.48, 22.48, 22.48]}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.Circle002.geometry}
        material={nodes.Circle002.material}
        position={[-4.27, 3.99, 1.88]}
        rotation={[-1.67, -0.14, 2.55]}
        scale={[21.43, 21.43, 21.43]}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.Circle003.geometry}
        material={nodes.Circle003.material}
        position={[-4.33, 4, 2.52]}
        rotation={[-1.53, -0.17, -2.9]}
        scale={[19.31, 19.31, 19.31]}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.Circle004.geometry}
        material={nodes.Circle004.material}
        position={[-3.99, 3.83, 3.27]}
        rotation={[-1.31, -0.18, -1.95]}
        castShadow
        receiveShadow
        scale={25.61}
      />
      <mesh
        geometry={nodes.Circle005.geometry}
        material={nodes.Circle005.material}
        position={[-3.18, 4.11, 3.08]}
        rotation={[-1.58, 0.08, -1.03]}
        scale={[20.26, 20.26, 20.26]}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.Circle006.geometry}
        material={nodes.Circle006.material}
        position={[-2.81, 4.02, 2.12]}
        rotation={[-1.62, 0.13, 0.35]}
        scale={20.16}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.Circle026.geometry}
        material={nodes.Circle026.material}
        position={[-3.32, 3.93, 1.85]}
        rotation={[-1.95, -0.04, 1.16]}
        scale={[15.27, 15.27, 15.27]}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.Circle027.geometry}
        material={nodes.Circle027.material}
        position={[-4.24, 3.76, 2.7]}
        rotation={[-1.48, -0.48, -2.66]}
        scale={[20.38, 20.38, 20.38]}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.Circle007.geometry}
        material={nodes.Circle007.material}
        position={[-3.32, 1.16, 3.35]}
        rotation={[-1.48, 0.12, -0.83]}
        scale={[15.05, 15.05, 15.05]}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.Circle008.geometry}
        material={nodes.Circle008.material}
        position={[-2.37, 2.76, 4.32]}
        rotation={[-1.29, 0.32, -0.88]}
        scale={[14.78, 14.78, 14.78]}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.Circle009.geometry}
        material={nodes.Circle009.material}
        position={[-2.18, 2.82, 3.83]}
        rotation={[-1.5, 0.33, 0.12]}
        scale={[14.1, 14.1, 14.1]}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.Circle010.geometry}
        material={nodes.Circle010.material}
        position={[-2.42, 2.9, 3.49]}
        rotation={[-1.62, 0.26, 0.96]}
        scale={[12.7, 12.7, 12.7]}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.Circle011.geometry}
        material={nodes.Circle011.material}
        position={[-2.92, 2.89, 3.25]}
        rotation={[-1.79, 0.12, 1.91]}
        scale={[16.84, 16.84, 16.84]}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.Circle012.geometry}
        material={nodes.Circle012.material}
        position={[-3.21, 3.08, 3.71]}
        rotation={[-1.42, 0.1, 2.8]}
        scale={[13.32, 13.32, 13.32]}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.Circle013.geometry}
        material={nodes.Circle013.material}
        position={[-3.01, 2.93, 4.33]}
        rotation={[-1.36, 0.09, -2.11]}
        scale={[13.26, 13.26, 13.26]}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.Circle014.geometry}
        material={nodes.Circle014.material}
        position={[-3.53, 1.34, 0.09]}
        rotation={[-1.62, -0.15, 2.64]}
        scale={[18.53, 18.53, 18.53]}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.Circle015.geometry}
        material={nodes.Circle015.material}
        position={[-4.99, 3.31, -0.67]}
        rotation={[-1.74, -0.4, 2.6]}
        scale={[18.21, 18.21, 18.21]}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.Circle016.geometry}
        material={nodes.Circle016.material}
        position={[-5.02, 3.39, -0.04]}
        rotation={[-1.54, -0.35, -2.68]}
        scale={[17.36, 17.36, 17.36]}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.Circle017.geometry}
        material={nodes.Circle017.material}
        position={[-4.61, 3.49, 0.27]}
        rotation={[-1.45, -0.24, -1.84]}
        scale={[15.64, 15.64, 15.64]}
      />
      <mesh
        geometry={nodes.Circle018.geometry}
        material={nodes.Circle018.material}
        position={[-4.04, 3.51, 0.21]}
        rotation={[-1.33, -0.06, -0.91]}
        scale={16.32}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.Circle019.geometry}
        material={nodes.Circle019.material}
        position={[-3.77, 3.66, -0.4]}
        rotation={[-1.73, -0.09, 0.14]}
        scale={[16.41, 16.41, 16.41]}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.Circle020.geometry}
        material={nodes.Circle020.material}
        position={[-4.26, 3.53, -0.95]}
        rotation={[-1.75, -0.16, 1.35]}
        scale={[16.33, 16.33, 16.33]}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.Circle023.geometry}
        material={nodes.Circle023.material}
        position={[-4.71, 3.59, 0.02]}
        rotation={[-1.52, -0.02, -2.25]}
        scale={[10.93, 10.93, 10.93]}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.Circle024.geometry}
        material={nodes.Circle024.material}
        position={[-4.49, 3.58, -0.8]}
        rotation={[-1.62, -0.11, 1.73]}
        scale={12.39}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.Circle025.geometry}
        material={nodes.Circle025.material}
        position={[-4.07, 3.7, -0.65]}
        rotation={[-1.56, -0.24, 0.79]}
        scale={12.39}
        castShadow
        receiveShadow
      />
    </group>
  );
};
