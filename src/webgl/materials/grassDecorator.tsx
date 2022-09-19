/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { extend, useFrame } from '@react-three/fiber'
import { Depth, LayerMaterial } from 'lamina'
import { Sampler } from '@react-three/drei'
import { useControls } from 'leva'
import WindLayer from './wind.layer'
// import { ShaderLib } from 'three/src/renderers/shaders/ShaderChunk/lightmap_fragment.glsl'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Perlin = require('perlin.js')

Perlin.seed(Math.random())
extend({ WindLayer })

interface IGrassProps {
  children: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
  strands?: number,
  width?: number,
  height?: number,
}

const Grass: React.FC<IGrassProps> = ({
  children,
  width = 0.3,
  height = 15,
  strands = 50000,
}) => {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const windLayer = useRef<any>(null)

  useEffect(() => {
    meshRef.current?.geometry.applyMatrix4(new THREE.Matrix4().makeRotationX(Math.PI / 2))
    meshRef.current?.geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 0, 0.5))
  }, [])

  const geomRef = useRef<any>()
  useFrame(({ clock }) => {
    if (windLayer.current) {
      windLayer.current.time = clock.getElapsedTime() * 0.35
    }
  })

  const controls = useControls('Grass', {
    noiseScale: {
      value: 5,
      min: 0,
      max: 5,
      step: 0.1,
    },
    noiseStrength: {
      value: 3,
      min: 0,
      max: 5,
      step: 0.1,
    },
    sway: {
      value: 0.1,
      min: 0,
      max: 2,
      step: 0.001,
    },
    length: {
      value: 17,
      min: 0,
      max: 17,
      step: 0.01,
    },
  })

  return (
    <>
      {React.cloneElement(children, { ref: geomRef })}
      <instancedMesh ref={meshRef} args={[undefined, undefined, strands]}>
        <coneGeometry args={[width, height, 2, 20, false, 0, Math.PI]} />
        <LayerMaterial side={THREE.DoubleSide} lighting="standard" envMapIntensity={1}>
          <Depth colorA="#221600" colorB="#f07b9c" near={0.25} far={10} mapping="world" />
          {
            React.createElement('windLayer', {
              args: [{ mode: 'multiply' }],
              colorA: '#ffffff',
              colorB: '#acf5ce',
              noiseScale: controls.noiseScale,
              noiseStrength: controls.noiseStrength,
              length: controls.length,
              sway: controls.sway,
              ref: windLayer,
              isCurl: true,
            })
          }
        </LayerMaterial>
      </instancedMesh>
      <group>
        <Sampler
          transform={({ position, normal, dummy: object }) => {
            const p = position.clone().multiplyScalar(15)
            const n = Perlin.simplex3(...p.toArray())
            // object.scale.setScalar(0.5 * 0.1)
            object.scale.setScalar(THREE.MathUtils.mapLinear(n, -1, 1, 0.5, 1.25) * 0.1)
            object.position.copy(position)
            object.lookAt(normal.add(position))
            // object.rotation.y += Math.random() - 0.5 * (Math.PI * 0.01)
            // object.rotation.z += Math.random() - 0.5 * (Math.PI * 0.01)
            // object.rotation.x += Math.random() - 0.5 * (Math.PI * 0.01)
            object.updateMatrix()
            return object
          }}
          mesh={geomRef}
          instances={meshRef}
        />
      </group>
    </>
  )
}

// const areEqual = (prevProps: IGrassProps, nextGrassProps: IGrassProps) => {
//   if (prevProps.height !== nextGrassProps.height) {
//     return false
//   }

//   if (prevProps.width !== nextGrassProps.width) {
//     return false
//   }

//   if (prevProps.children.key !== nextGrassProps.children.key) {
//     return false
//   }

//   return true
// }

// export default React.memo(Grass, areEqual);
export default Grass
