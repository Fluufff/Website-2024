import { useFrame } from '@react-three/fiber';
import React, { useState } from 'react';
import * as THREE from 'three';

export const FrameLimiter = (props: any) => {
	const [clock] = useState(new THREE.Clock());

	useFrame((state: any) => {
		state.ready = false;
		const timeUntilNextFrame = 1000 / props.fps - clock.getDelta();

		setTimeout(() => {
			state.ready = true;
			state.invalidate();
		}, Math.max(0, timeUntilNextFrame));
	});

	return <></>;
};
