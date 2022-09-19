/* eslint-disable max-len */
import { Box, useTexture } from '@react-three/drei'
import { Vector3 } from '@react-three/fiber'
import { useControls } from 'leva'
import { RepeatWrapping } from 'three'

interface IProps {
  position: Vector3
}

const CubeFlaffy: React.FC<IProps> = ({ position }) => {
  const t = useTexture('models/scene/9.jpeg')

  t.repeat.set(2, 2)
  t.wrapS = RepeatWrapping
  t.wrapT = RepeatWrapping

  const controls = useControls('Cube', {
    displacement: {
      value: 0.1,
      max: 1,
      min: 0,
      step: 0.01,
    },
    scale: {
      value: 1,
      max: 10,
      min: -10,
      step: 0.5,
    },
  })

  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[10, 10, 10, 200, 200, 200]} />
        <meshPhysicalMaterial metalness={0.7} roughness={0.3} displacementMap={t} map={t} displacementScale={controls.displacement} />
        {/* <LayerMaterial side={2} lighting="physical" >
          <Depth colorA="#221600" colorB="#f07b9c" near={5} far={10} mapping="world" />
          <Displace type="simplex" strength={controls.displacement} scale={controls.scale} mapping="local" offset={[0, 0, 0]} />
        </LayerMaterial> */}
      </mesh>
    </group>
  )
}

export default CubeFlaffy;
