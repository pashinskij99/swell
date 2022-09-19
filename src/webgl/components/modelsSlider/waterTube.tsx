import { useFrame } from '@react-three/fiber'
import * as React from 'react'
import * as THREE from 'three'
import { Points, TubeGeometry } from 'three'
import { lerp } from 'three/src/math/MathUtils'
import BublesMaterialImpl from '../../materials/bubles.material'

const points = [
  new THREE.Vector3(0, 0, 10),
  new THREE.Vector3(10, 0, 10),
  new THREE.Vector3(10, 5, 0),
  new THREE.Vector3(-5, 5, 10),
  new THREE.Vector3(-5, 0, 10),
  new THREE.Vector3(0, 0, 10),
  // new THREE.Vector3(-5, 5, 0),
]

const WaterTube: React.FC = () => {
  const [path] = React.useState(new THREE.CatmullRomCurve3(points))
  const _geo = React.useRef<TubeGeometry | null>(null!)
  const _points = React.useRef<Points | null>(null!)

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()

    if (_points.current) {
      // _points.current.geometry?.dispose()

      // _points.current.geometry = new THREE.TubeGeometry(path, 70, 1, 20, true)
    }
  })

  return (
    <group>
      <points ref={_points}>
        {/* <tubeGeometry ref={_geo} args={[path, 70, 1, 20]} /> */}
        <BublesMaterialImpl />
      </points>
    </group>
  )
}

export default WaterTube;
