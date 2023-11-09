import React, { FC, useRef } from 'react';
import * as THREE from 'three';

export const LightBulbOn: FC<
  JSX.IntrinsicElements['group'] & { on?: boolean; color?: string }
> = (props = { color: '#FFFFFF' }) => {
  const group = useRef<THREE.Group>(null);

  return (
    <group ref={group} {...props}>
      <mesh>
        <sphereGeometry attach="geometry" args={[0.05, 16, 16]} />
        <meshStandardMaterial
          color={props.color}
          emissive={new THREE.Color(props.color)}
          emissiveIntensity={1}
          attach="material"
        />
        <pointLight color={props.color} intensity={0.07} distance={20} />
      </mesh>
    </group>
  );
};
