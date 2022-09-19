/* eslint-disable no-param-reassign */
import { useTexture } from '@react-three/drei'
import { extend, useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import * as React from 'react'
import shaderMaterial from '../utils/shaderMaterial'
import causticSnippet from './caustic.snippet'

class BublesMaterial extends THREE.ShaderMaterial {
  uniforms = THREE.UniformsUtils.merge([
    THREE.UniformsLib.points,
    THREE.UniformsLib.fog,
    {
      u_time: { value: 0 },
      u_size: { value: 0.0001 },
      u_color1: { value: new THREE.Color(0x1975ff) },
      u_color2: { value: new THREE.Color(0xffffff) },
    },
  ])

  transparent = true

  fragmentShader = `
    uniform vec3 u_color1;
    uniform vec3 u_color2;

    #include <fog_pars_fragment>
    
    varying vec3 vUv;

    varying float vScale;

    void main() {
      // vec3 color = vec3(1., 1., 1.);

      // color = mix(u_color1, u_color2, 1.);

      vec4 outColor = vec4(u_color1, 1.);

      float nextAlpha = distance( vec2(0.5,0.5), gl_PointCoord );

      outColor.a = (  1. - nextAlpha / .2) + 0.3;

      if(outColor.a < 0.3) {
        discard;
      }

      outColor.a = 0.05;
      gl_FragColor = outColor;

      #include <fog_fragment>
    }
  `

  vertexShader = `
    varying vec3 vUv;
    varying float vScale;

    uniform float scale;
    uniform float u_size;
    uniform float tranparency;
    uniform float u_time;

    #include <common>
    #include <morphtarget_pars_vertex>
    #include <fog_pars_vertex>

    void main() {
      #include <begin_vertex>
      #include <morphtarget_vertex>

      vScale = scale;

      float time = u_time * 2.;

      vUv.y = position.y;
      vUv.x = position.x;
      vUv.z = position.z + time;

      vec4 mvPosition = modelViewMatrix * vec4( transformed, 1.0 );

      gl_Position = projectionMatrix * mvPosition;

      gl_PointSize = u_size;

      #include <fog_vertex>
    }
  `
}

extend({ BublesMaterial })

interface IProps {
  size?: number,
}

const BublesMaterialImpl: React.FC<IProps> = ({
  size = 20,
}) => {
  const mat = useRef<BublesMaterial>(null)

  useFrame(({ clock }) => {
    if (mat.current) {
      mat.current.uniforms.u_time.value = clock.getElapsedTime()
    }
  })

  React.useEffect(() => {
    if (mat.current) {
      mat.current.uniforms.u_size.value = size
      mat.current.uniformsNeedUpdate = true
      mat.current.needsUpdate = true
    }
  }, [size, mat])

  // return <causticsMaterial side={side} {...props} ref={mat} u_caustics_map={causticsMap} />
  return React.createElement('bublesMaterial', {
    ref: mat,
    u_size: size,
    fog: true,
    side: THREE.DoubleSide,
    transparent: true,
  })
}

export default BublesMaterialImpl;
