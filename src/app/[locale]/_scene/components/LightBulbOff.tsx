import React, { FC, useRef } from 'react';

export const LightBulbOff: FC<
  JSX.IntrinsicElements['group'] & { on?: boolean; color?: string }
> = (props = { color: '#FFFFFF' }) => {
  const group = useRef();

  return (
    <group ref={group} {...props}>
      <mesh>
        <sphereGeometry attach="geometry" args={[0.05, 16, 16]} />
        <meshStandardMaterial color={props.color} attach="material" />
      </mesh>
    </group>
  );
};
