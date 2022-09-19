/* eslint-disable @typescript-eslint/no-shadow */
import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { useTexture } from '@react-three/drei'
import ParticlesMaterialImpl from '../../materials/particles.material'

interface IProps {
  count: number
}

function random() {
  return (Math.random() * 2 - 1);
}
// const random = () => {
//   return THREE.MathUtils.randFloat(-0.001, 0.001)
// }

const Particles: React.FC<IProps> = ({ count = 64 }) => {
  const _instance = useRef<THREE.InstancedMesh | null>(null!)

  const w = count
  const h = count

  const size = w * h
  const [objects] = useState(() => [...new Array(size)].map(() => new THREE.Object3D()))

  const [[positions, velocities]] = useState(() => {
    const positionData = new Float32Array(3 * size)
    const velocityData = new Float32Array(3 * size)

    for (let i = 0; i < size; i += 1) {
      const stride = i * 3
      positionData[stride] = random() * 2
      velocityData[stride] = random()

      positionData[stride + 1] = random() * 2
      velocityData[stride + 1] = random()

      positionData[stride + 2] = random() * 2
      velocityData[stride + 2] = random()
    }

    const positions = new THREE.DataTexture(positionData, w, h, THREE.RGBFormat, THREE.FloatType)
    positions.minFilter = THREE.NearestFilter
    positions.magFilter = THREE.NearestFilter
    positions.generateMipmaps = false

    const velocities = new THREE.DataTexture(velocityData, w, h, THREE.RGBFormat, THREE.FloatType)

    return [positions, velocities]
  })

  useEffect(() => {
    if (_instance.current) {
      _instance.current.geometry.setAttribute(
        'instanceIndex',
        new THREE.InstancedBufferAttribute(new Float32Array(objects.map((_, i) => i)), 1),
      )
    }
  }, [_instance.current])

  const sprite = useTexture('/textures/particle.png')
  // sprite.encoding = THREE.sRGBEncoding

  return (
    <group>
      <instancedMesh
      castShadow
      ref={_instance}
      args={[undefined, undefined, size]}
      >
        <planeGeometry args={[0.2, 0.2]} />
        <ParticlesMaterialImpl
          number={count}
          map={sprite}
          positions={positions}
          velocities={velocities}
        />
      </instancedMesh>
    </group>
  )
}

export default Particles