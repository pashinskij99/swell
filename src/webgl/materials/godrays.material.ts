/* eslint-disable @typescript-eslint/no-shadow */
import { shaderMaterial, useFBO, useTexture } from '@react-three/drei'
import { extend, useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import * as React from 'react'
import useVideoTexture from '../utils/useVideoTexture'

// declare module JSX {
//   interface IntrinsicElements {
//     godraysMaterial: any
//   }
// }
const GodraysMaterial = shaderMaterial(
  {
    u_map: null,
    u_resolution: null,
    u_time: null,
  },
  /* glsl */ `
  void main() {
    gl_Position = vec4(position, 1.);
  }
`,
  /* glsl */ `
    uniform sampler2D u_map;
    uniform vec2 u_resolution;
    uniform float u_time;
    
  
    void main() {
      vec2 uv = gl_FragCoord.xy/u_resolution;
      float col = texture2D(u_map, uv).r;

      gl_FragColor = vec4(vec3(1.), col * 0.35);
    }
  `,
)

extend({ GodraysMaterial })

export default function GodraysMaterialImpl() {
  const videoTexture = useVideoTexture('/textures/godrays.mp4')
  // const map = useTexture('./c.png')

  const size = useThree(({ size }) => size)
  const dpr = useThree(({ viewport }) => viewport.dpr)

  const mat = useRef<THREE.ShaderMaterial>()
  useFrame(({ clock }) => {
    if (mat.current) {
      mat.current.uniforms.u_time.value = clock.getElapsedTime()
    }
  })

  return React.createElement('godraysMaterial', {
    ref: mat,
    depthWrite: false,
    transparent: true,
    u_resolution: [size.width * dpr, size.height * dpr],
    u_map: videoTexture,
  })

  // return (
  //   <godraysMaterial
  //     ref={mat}
  //     depthWrite={false}
  //     transparent
  //     u_resolution={[size.width, size.height]}
  //     u_map={videoTexture}
  //   />
  // )
}
