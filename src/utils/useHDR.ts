import * as THREE from 'three';
import { useLoader, useThree } from '@react-three/fiber';
import { RGBELoader } from 'three-stdlib';
import { TextureLoader } from 'three';

const useEquirectangularHDR = (url: string) => {
  const { gl } = useThree();
  const pmremGenerator = new THREE.PMREMGenerator(gl);
  pmremGenerator.compileEquirectangularShader();

  const hdrEquirect = useLoader(RGBELoader as any, url) as THREE.Texture;

  const hdrCubeRenderTarget = pmremGenerator.fromEquirectangular(hdrEquirect);
  hdrEquirect.dispose();
  pmremGenerator.dispose();

  return hdrCubeRenderTarget.texture;
};

const useEqTexture = (url: string) => {
  const { gl } = useThree();
  const pmremGenerator = new THREE.PMREMGenerator(gl);
  pmremGenerator.compileEquirectangularShader();

  const texture = useLoader(TextureLoader as any, url) as THREE.Texture;

  texture.encoding = THREE.LinearEncoding;

  texture.needsUpdate = true;
  texture.mapping = THREE.EquirectangularReflectionMapping;
  // const pngCubeRenderTarget = pmremGenerator.fromEquirectangular(
  //   texture,
  // );

  return texture;
};

export {
  useEquirectangularHDR,
  useEqTexture,
};
