/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useCallback } from 'react';
import { Canvas, Props as CanvasProps, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { AdaptiveDpr, AdaptiveEvents, OrbitControls } from '@react-three/drei';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { Controls, withControls } from 'react-three-gui';
import { useOrbitControls } from '../../../store/reducers/orbitControls';

interface IMainSceneProps extends CanvasProps {
  cameraFov?: number
  cameraPosition?: THREE.Vector3
}

const MainScene: React.FC<IMainSceneProps> = ({
  cameraFov = 50,
  cameraPosition = new THREE.Vector3(344.27, 4.88, 86.01),
  children,
  ...restProps
}) => {
  const [setOrbitControls] = useOrbitControls((state) => [state.set]);

  return (
    <Canvas
      shadows
      // dpr={1.7}
      dpr={1.7}
      camera={{ fov: cameraFov, far: 2500 }}
      gl={{
        outputEncoding: THREE.sRGBEncoding,
        alpha: false,
        toneMapping: THREE.NoToneMapping,
      }}
      {...restProps}
    >
      <OrbitControls ref={setOrbitControls} />
      {children}
    </Canvas>
  );
};

export default MainScene;
