import { extend, useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import shaderMaterial from '../utils/shaderMaterial'
import curlNoiseSnippet from './noise.snippet'

const ParticlesMaterial = shaderMaterial(THREE.MeshBasicMaterial)(
  {
    u_time: 0,
    u_velocities: new THREE.DataTexture(),
    u_positions: new THREE.DataTexture(),
    u_map: null,
    fogColor: new THREE.Color('red'),
    fogDensity: 0,
  },
  /* glsl */ ` #include <fog_pars_vertex>
  
  uniform float u_time;
  
  ${curlNoiseSnippet}

  attribute float instanceIndex;
  flat varying float vInstanceIndex;

  uniform sampler2D u_velocities;
  uniform sampler2D u_positions;

  varying vec2 vUv;
  
  void main() {

    float width = float(WIDTH);

    float x = mod(instanceIndex, width); 
    float y = floor(instanceIndex / width);
    
    vec2 dataUv = vec2(x/width, y/width);

    // sample from positions buffer
    vec3 pos = texture2D(
      u_positions, 
      dataUv
    ).xyz;

    // sample from velocities
    vec3 velocity = texture2D(
      u_velocities, 
      dataUv
    ).xyz;
    
    vec3 curl = curlNoise(pos + u_time * 0.005) * 2.;

    vec4 worldPosition = vec4( 
      pos + 
      position + 
      // to add some subtle randomness
      curl + 
      // invert velocity with a long period, so the scene stays kinda filled with particles
      (velocity * sin(u_time * 0.025))
    , 1.0 );

    vInstanceIndex = instanceIndex;

    vUv = uv;

    vec4 mvPosition = viewMatrix * worldPosition;

    gl_Position = projectionMatrix * mvPosition;
    #include <fog_vertex>

  }
`,
  /* glsl */ `
uniform vec3 diffuse;
uniform float opacity;

flat varying float vInstanceIndex;
uniform float u_time;

#ifndef FLAT_SHADED
  varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
  #include <clipping_planes_fragment>
  vec4 diffuseColor = vec4( diffuse, opacity );
  #include <logdepthbuf_fragment>
  #include <map_fragment>
  #include <color_fragment>
  #include <alphamap_fragment>
  #include <alphatest_fragment>
  #include <specularmap_fragment>


  gl_FragColor = vec4( diffuseColor.rgb, diffuseColor.a );

  #include <tonemapping_fragment>
  #include <encodings_fragment>
  #include <fog_fragment>
  #include <premultiplied_alpha_fragment>

  #include <dithering_fragment>
}
`,
)

extend({ ParticlesMaterial })

interface IProps {
  number: number
  map: THREE.Texture
  positions: any
  velocities: any
}

const ParticlesMaterialImpl: React.FC<IProps> = ({
  number,
  map,
  positions,
  velocities,
}) => {
  const mat = useRef<any>()

  useFrame(({ clock }) => {
    mat.current.u_time = clock.getElapsedTime()
  })

  return React.createElement('particlesMaterial', {
    toneMapped: false,
    ref: mat,
    map,
    u_positions: positions,
    u_velocities: velocities,
    defines: {
      WIDTH: number,
    },
    opacity: 0.5,
    side: 2,
    transparent: true,
  }, null)
}

export default ParticlesMaterialImpl
