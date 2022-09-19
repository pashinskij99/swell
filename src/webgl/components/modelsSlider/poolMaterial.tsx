/* eslint-disable no-param-reassign */
import { useTexture } from '@react-three/drei'
import { useControls } from 'leva';
import { RepeatWrapping } from 'three';
import CausticsMaterialImpl from '../../materials/caustic.material'

interface IProps {
}

const PoolMaterial: React.FC<IProps> = () => {
  // const [aoMap, map, displacementMap, normalMap] = useTexture([
  //   '/textures/pool/ao.jpg',
  //   '/textures/pool/color.jpg',
  //   '/textures/pool/displacement.jpg',
  //   '/textures/pool/normal.jpg',
  // ]).map((el) => {
  //   el.repeat.set(15, 15);
  //   el.wrapS = RepeatWrapping;
  //   el.wrapT = RepeatWrapping;
  //   el.needsUpdate = true;

  //   return el;
  // })

  const [roughnessMap, map, normalMap] = useTexture([
    '/textures/pool/diff1.jpg',
    '/textures/pool/color1.jpg',
    '/textures/pool/normal1.jpg',
  ]).map((el) => {
    el.repeat.set(15, 15);
    el.wrapS = RepeatWrapping;
    el.wrapT = RepeatWrapping;
    el.needsUpdate = true;

    return el;
  })

  const { groundColor, groundSpeed, groundScale } = useControls('Portfolio', {
    groundColor: {
      value: '#fcff00',
    },
    groundSpeed: {
      min: 0,
      max: 1,
      step: 0.001,
      value: 0.06,
    },
    groundScale: {
      min: 0,
      max: 1,
      step: 0.001,
      value: 0.1,
    },
  })

  return (
    <CausticsMaterialImpl
      causticScale={groundScale}
      side={2}
      // displacementMap={displacementMap}
      roughnessMap={roughnessMap}
      // normalMap={normalMap}
      causticSpeed={groundSpeed}
      causticIntensity={2}
      // aoMap={aoMap}
      map={map}
      color={groundColor}
      // specularMap={specularMap}
    />
  )
}

export default PoolMaterial