/* eslint-disable no-return-assign */
import React, { useRef, useMemo } from 'react';
import {
 extend, useThree, useLoader, useFrame,
} from '@react-three/fiber';
import * as THREE from 'three';
import { Water } from 'three-stdlib';
import { useControls } from 'leva';

extend({ Water });

const Ocean: React.FC = () => {
  const ref = useRef<null | Water>(null!);
  const waterNormals = useLoader(THREE.TextureLoader, 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/waternormals.jpg');

  waterNormals.wrapS = THREE.RepeatWrapping;
  waterNormals.wrapT = THREE.RepeatWrapping;

  const params = useControls('Waterp params', {
    color: {
      value: '#eab9ef',
    },
    speed: {
      min: 0,
      max: 1,
      value: 0.2,
      step: 0.01,
    },
  })

  const geom = useMemo(() => new THREE.PlaneGeometry(2000, 1500), []);
  const config = useMemo(
    () => ({
      textureWidth: 512,
      textureHeight: 512,
      waterNormals,
      sunDirection: new THREE.Vector3(0, 0, 0),
      sunColor: 'pink',
      waterColor: params.color,
      distortionScale: 1,
      // fog: true,
      format: THREE.sRGBEncoding,
    }),
    [waterNormals, params.color],
  );
  useFrame(
    ({ clock }) => {
      if (ref.current) {
        ref.current.material.uniforms.time.value = clock.getElapsedTime() * params.speed;
      }
    },
  );

  return React.createElement('water', {
    ref,
    args: [geom, config],
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -0.3, 0],
  });
}

export default Ocean;
