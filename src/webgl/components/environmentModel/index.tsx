/* eslint-disable max-len */
/* eslint-disable react/jsx-no-useless-fragment */
import {
  Environment, EnvironmentMap, useGLTF, useTexture,
} from '@react-three/drei';
import { useEffect, useRef } from 'react';
import { Float32BufferAttribute, Vector3 } from 'three';
import { useModelDecorator } from '../../../utils/modelDecorator';
import { useEqTexture } from '../../../utils/useHDR';
import WindLayer from '../../materials/wind.layer';
import ENV_CONFIG from './config';
import Ocean from './water';
import EnvironmentGrass from './grass';
import CubeFlaffy from './cube';

interface GLTFResult {
  nodes: Record<string, THREE.Mesh<THREE.BufferGeometry, THREE.MeshStandardMaterial>>,
  scene: THREE.Object3D
}

const EnvironmentModel: React.FC = () => {
  const _envGroup = useRef<THREE.Group | null>(null);
  const gltf = useGLTF('/models/scene/scene.glb') as unknown as GLTFResult;
  const background = useEqTexture('/models/scene/textures/env.jpeg');

  useModelDecorator(ENV_CONFIG.decoration, gltf.scene);

  return (
    <>
      {/* <Environment
        background="only"
        map={background}
      /> */}
      <Environment
        background
        map={background}
      />
      <group scale={0.1}>
        {/* <group scale={10}>
          <CubeFlaffy position={[5, 20, 0]} />

          <CubeFlaffy position={[-15, 20, 0]} />

          <CubeFlaffy position={[30, 20, 0]} />
        </group> */}

        <EnvironmentGrass count={3500} width={2} height={22} base={gltf.nodes.SM_Sand_03} />
        <EnvironmentGrass count={9000} width={2.2} height={30} base={gltf.nodes.SM_Sand_01} />
        <EnvironmentGrass count={2500} width={1.8} height={20} base={gltf.nodes.SM_Sand_02} />

        {/* <EnvironmentGrass count={40000} width={6} height={20} base={gltf.nodes.SM_Swell_01} />
        <EnvironmentGrass count={40000} width={6} height={20} base={gltf.nodes.SM_Swell_02} />
        <EnvironmentGrass count={40000} width={6} height={20} base={gltf.nodes.SM_Swell_03} />
        <EnvironmentGrass count={40000} width={6} height={20} base={gltf.nodes.SM_Swell_04} />
        <EnvironmentGrass count={40000} width={6} height={20} base={gltf.nodes.SM_Swell_05} /> */}
      </group>
      <group scale={100} name="environment_model" ref={_envGroup}>
        <primitive object={gltf.scene} />
      </group>
      <Ocean />
    </>
  );
};

export default EnvironmentModel;
