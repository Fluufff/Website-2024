import { useGLTF } from '@react-three/drei';
import React, { FC } from 'react';

import { DRACO_FOLDER, ASSET_FOLDER } from '../constants';

export const MainScene: FC<JSX.IntrinsicElements['mesh']> = (props) => {
  const gltf = useGLTF(`${ASSET_FOLDER}/scene_out/scene.gltf`, DRACO_FOLDER);

  return (
    <mesh {...props} receiveShadow={true} castShadow={true}>
      <primitive object={gltf.scene}></primitive>
    </mesh>
  );
};
