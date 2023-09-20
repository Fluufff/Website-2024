import React, { FC, useRef } from 'react';
import { useGLTF } from '@react-three/drei';

import { DRACO_FOLDER, ASSET_FOLDER } from '../constants';

export const Rocks: FC<JSX.IntrinsicElements['group']> = (props) => {
  const group = useRef();
  const { nodes } = useGLTF(
    `${ASSET_FOLDER}/rocks_out/rocks.gltf`,
    DRACO_FOLDER,
  ) as any;

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        geometry={nodes.Cube.geometry}
        material={nodes.Cube.material}
        position={[-3.24, 1.26, 1.08]}
        rotation={[-2.21, 0.27, -0.44]}
        scale={[65.83, 65.83, 65.83]}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.Cube.geometry}
        material={nodes.Cube001.material}
        position={[-2.83, 1.26, 1.15]}
        rotation={[0.66, 1.09, 0.92]}
        scale={[35.96, 35.96, 35.96]}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.Cube002.geometry}
        material={nodes.Cube002.material}
        position={[-3.14, 1.26, 1.53]}
        rotation={[-0.64, 0.17, 0.68]}
        scale={[50.74, 50.74, 50.74]}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.Cube003.geometry}
        material={nodes.Cube003.material}
        position={[3.48, 1.22, 3.42]}
        rotation={[-2.16, -0.31, -1.29]}
        scale={[40.62, 40.62, 40.62]}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.Cube004.geometry}
        material={nodes.Cube004.material}
        position={[3.28, 1.26, 3.07]}
        rotation={[-2.48, 0.62, 2.87]}
        scale={[-51.05, -51.05, -51.05]}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.Cube005.geometry}
        material={nodes.Cube005.material}
        position={[3.05, 1.27, 3.37]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={28.06}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.Cube006.geometry}
        material={nodes.Cube006.material}
        position={[3.37, 1.12, 0.81]}
        rotation={[-1.04, 1.09, 1.33]}
        scale={[27.06, 27.06, 27.06]}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.Cube007.geometry}
        material={nodes.Cube007.material}
        position={[0.66, 0.73, -0.39]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={39.18}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.Cube008.geometry}
        material={nodes.Cube008.material}
        position={[-0.24, 0.65, -0.62]}
        rotation={[-1.49, 0.25, 0.85]}
        scale={[50.74, 50.74, 50.74]}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.Cube009.geometry}
        material={nodes.Cube009.material}
        position={[-3.56, 0.53, -2.39]}
        rotation={[-1.96, 1.09, 1.23]}
        scale={[50.74, 50.74, 50.74]}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.Cube010.geometry}
        material={nodes.Cube010.material}
        position={[-1.99, 1.18, 3.39]}
        rotation={[0.36, 0.92, 1.01]}
        scale={[50.74, 50.74, 50.74]}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.Cube011.geometry}
        material={nodes.Cube011.material}
        position={[-2.32, 1.22, 3.25]}
        rotation={[-2.48, -0.55, -2.99]}
        scale={[37.47, 37.47, 37.47]}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.Cube012.geometry}
        material={nodes.Cube012.material}
        position={[0.02, 0.97, -0.35]}
        rotation={[-2.78, 1.2, -2.53]}
        scale={[26.21, 26.21, 26.21]}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.Cube013.geometry}
        material={nodes.Cube013.material}
        position={[0.28, 0.8, -0.67]}
        rotation={[-1.11, 1.17, 1.5]}
        scale={[21.78, 21.78, 21.78]}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.Cube014.geometry}
        material={nodes.Cube014.material}
        position={[0.39, 0.86, -0.43]}
        rotation={[-2.83, 0.07, -0.96]}
        scale={[30.83, 30.83, 30.83]}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.Cube016.geometry}
        material={nodes.Cube016.material}
        position={[3.76, 0.81, -0.31]}
        rotation={[-2.89, 0.42, -2.54]}
        scale={27.06}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.Cube017.geometry}
        material={nodes.Cube017.material}
        position={[3.48, 0.92, -0.06]}
        rotation={[-2.89, 0.42, -2.54]}
        scale={[40.77, 40.77, 40.77]}
        castShadow
        receiveShadow
      />
    </group>
  );
};
