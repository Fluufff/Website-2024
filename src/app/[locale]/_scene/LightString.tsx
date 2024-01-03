import React, { FC, useEffect, useState } from 'react';

import { LightBulbOff } from './components/LightBulbOff';
import { LightBulbOn } from './components/LightBulbOn';

export const LightString: FC = () => {
  const [lightStatus, setLightStatus] = useState<number>(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setLightStatus((lights) => (lights > 20 ? 10 : lights + 10));
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <group>
      {lightStatus - 10 === 0 ? (
        <LightBulbOff position={[-3.59, 3.52, 2.4]} color="#500000" />
      ) : (
        <LightBulbOn position={[-3.59, 3.52, 2.4]} color="#EA2027" />
      )}

      {lightStatus - 20 === 0 ? (
        <LightBulbOff position={[-3.61, 3.32, 2.27]} color="#006300" />
      ) : (
        <LightBulbOn position={[-3.61, 3.32, 2.27]} color="#A3CB38" />
      )}

      {lightStatus - 30 === 0 ? (
        <LightBulbOff position={[-3.65, 3.13, 2.13]} color="#00005a" />
      ) : (
        <LightBulbOn position={[-3.65, 3.13, 2.13]} color="#0652DD" />
      )}

      {lightStatus - 10 === 0 ? (
        <LightBulbOff position={[-3.69, 2.95, 1.95]} color="#500000" />
      ) : (
        <LightBulbOn position={[-3.69, 2.95, 1.95]} color="#EA2027" />
      )}

      {lightStatus - 20 === 0 ? (
        <LightBulbOff position={[-3.74, 2.81, 1.74]} color="#006300" />
      ) : (
        <LightBulbOn position={[-3.74, 2.81, 1.74]} color="#A3CB38" />
      )}

      {lightStatus - 30 === 0 ? (
        <LightBulbOff position={[-3.79, 2.71, 1.5]} color="#00005a" />
      ) : (
        <LightBulbOn position={[-3.79, 2.71, 1.5]} color="#0652DD" />
      )}

      {lightStatus - 10 === 0 ? (
        <LightBulbOff position={[-3.84, 2.65, 1.25]} color="#500000" />
      ) : (
        <LightBulbOn position={[-3.84, 2.65, 1.25]} color="#EA2027" />
      )}

      {lightStatus - 20 === 0 ? (
        <LightBulbOff position={[-3.88, 2.62, 1]} color="#006300" />
      ) : (
        <LightBulbOn position={[-3.88, 2.62, 1]} color="#A3CB38" />
      )}

      {lightStatus - 30 === 0 ? (
        <LightBulbOff position={[-3.94, 2.62, 0.75]} color="#00005a" />
      ) : (
        <LightBulbOn position={[-3.94, 2.62, 0.75]} color="#0652DD" />
      )}

      {lightStatus - 10 === 0 ? (
        <LightBulbOff position={[-3.97, 2.69, 0.5]} color="#500000" />
      ) : (
        <LightBulbOn position={[-3.97, 2.69, 0.5]} color="#EA2027" />
      )}

      {lightStatus - 20 === 0 ? (
        <LightBulbOff position={[-4.02, 2.8, 0.25]} color="#006300" />
      ) : (
        <LightBulbOn position={[-4.02, 2.8, 0.25]} color="#A3CB38" />
      )}
    </group>
  );
};
