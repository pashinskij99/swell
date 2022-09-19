/* eslint-disable no-param-reassign */
import { useTexture } from '@react-three/drei'
import { extend, useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import * as React from 'react'
import shaderMaterial from '../utils/shaderMaterial'
import causticSnippet from './caustic.snippet'

const CausticsMaterial = shaderMaterial()(
  {
    u_time: 0,
    u_caustics_map: null,
    u_causticIntensity: 1,
    u_caustics_scale: 0.25,
    u_caustic_speed: 0.1,
  },
  `#define STANDARD
  varying vec3 vViewPosition;
  #ifndef FLAT_SHADED
    varying vec3 vNormal;
    #ifdef USE_TANGENT
      varying vec3 vTangent;
      varying vec3 vBitangent;
    #endif
  #endif
  
  #ifdef USE_TRANSMISSION
    varying vec4 vWorldPosition;
  #endif
  #include <common>
  #include <uv_pars_vertex>
  #include <uv2_pars_vertex>
  #include <displacementmap_pars_vertex>
  #include <color_pars_vertex>
  #include <fog_pars_vertex>
  #include <morphtarget_pars_vertex>
  #include <skinning_pars_vertex>
  #include <shadowmap_pars_vertex>
  #include <logdepthbuf_pars_vertex>
  #include <clipping_planes_pars_vertex>

  varying vec3 vWorldPosition;
  varying vec3 vWorldNormal;

  uniform mat4 viewMatrixInverse;
  
  void main() {
    #include <uv_vertex>
    #include <uv2_vertex>
    #include <color_vertex>
    #include <beginnormal_vertex>
    #include <morphnormal_vertex>
    #include <skinbase_vertex>
    #include <skinnormal_vertex>
    #include <defaultnormal_vertex>
  #ifndef FLAT_SHADED // Normal computed with derivatives when FLAT_SHADED
    vNormal = normalize( transformedNormal );
    #ifdef USE_TANGENT
      vTangent = normalize( transformedTangent );
      vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
    #endif
  #endif
    #include <begin_vertex>
    #include <morphtarget_vertex>
    #include <skinning_vertex>
    #include <displacementmap_vertex>
    #include <project_vertex>
    #include <logdepthbuf_vertex>
    #include <clipping_planes_vertex>
    vViewPosition = -mvPosition.xyz;
    #include <worldpos_vertex>
    #include <shadowmap_vertex>
    #include <fog_vertex>

    vWorldPosition = worldPosition.xyz;
  }
  `,
  /* glsl */ `
  #define STANDARD
  #ifdef PHYSICAL
    #define REFLECTIVITY
    #define CLEARCOAT
  #endif
  uniform vec3 diffuse;
  uniform vec3 emissive;
  uniform float roughness;
  uniform float metalness;
  uniform float opacity;
  #ifdef USE_TRANSMISSION
    uniform float transmission;
    uniform float thickness;
    uniform vec3 attenuationColor;
    uniform float attenuationDistance;
  #endif
  #ifdef REFLECTIVITY
    uniform float reflectivity;
  #endif
  #ifdef CLEARCOAT
    uniform float clearcoat;
    uniform float clearcoatRoughness;
  #endif
  #ifdef USE_SHEEN
    uniform vec3 sheen;
  #endif
  varying vec3 vViewPosition;
  #ifndef FLAT_SHADED
    varying vec3 vNormal;
    #ifdef USE_TANGENT
      varying vec3 vTangent;
      varying vec3 vBitangent;
    #endif
  #endif
  #include <common>
  #include <packing>
  #include <dithering_pars_fragment>
  #include <color_pars_fragment>
  #include <uv_pars_fragment>
  #include <uv2_pars_fragment>
  #include <map_pars_fragment>
  #include <alphamap_pars_fragment>
  #include <aomap_pars_fragment>
  #include <lightmap_pars_fragment>
  #include <emissivemap_pars_fragment>
  #include <bsdfs>
  #include <transmission_pars_fragment>
  #include <cube_uv_reflection_fragment>
  #include <envmap_common_pars_fragment>
  #include <envmap_physical_pars_fragment>
  #include <fog_pars_fragment>
  #include <lights_pars_begin>
  #include <lights_physical_pars_fragment>
  #include <shadowmap_pars_fragment>
  #include <bumpmap_pars_fragment>
  #include <normalmap_pars_fragment>
  #include <clearcoat_pars_fragment>
  #include <roughnessmap_pars_fragment>
  #include <metalnessmap_pars_fragment>
  #include <logdepthbuf_pars_fragment>
  #include <clipping_planes_pars_fragment>

  ${causticSnippet}

  varying vec3 vWorldPosition;

  void main() {
    #include <clipping_planes_fragment>
    vec4 diffuseColor = vec4( diffuse, opacity );

    ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
    vec3 totalEmissiveRadiance = emissive;
    #ifdef USE_TRANSMISSION
      float totalTransmission = transmission;
      float thicknessFactor = thickness;
    #endif
    #include <logdepthbuf_fragment>
    #include <map_fragment>
    #include <color_fragment>
    #include <alphamap_fragment>
    #include <alphatest_fragment>
    #include <roughnessmap_fragment>
    #include <metalnessmap_fragment>
    #include <normal_fragment_begin>
    #include <normal_fragment_maps>
    #include <clearcoat_normal_fragment_begin>
    #include <clearcoat_normal_fragment_maps>
    #include <emissivemap_fragment>
    vec3 rawDiffuseColor = diffuseColor.rgb;

    #include <transmission_fragment>

    // accumulation
    #include <lights_physical_fragment>
    #include <lights_fragment_begin>
    #include <lights_fragment_maps>
    #include <lights_fragment_end>
    // modulation
    #include <aomap_fragment>

    vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
    gl_FragColor = vec4( outgoingLight, diffuseColor.a );

    #include <tonemapping_fragment>
    #include <encodings_fragment>

    vec2 uv = vWorldPosition.xz;
    gl_FragColor.rgb += getCaustics(uv);
    
    
    #include <fog_fragment>
    #include <premultiplied_alpha_fragment>

    #include <dithering_fragment>
    
  }
`,
)

extend({ CausticsMaterial })

interface IProps {
  side?: THREE.Side,
  color?: THREE.Color | string | number,
  emissive?: THREE.Color | string | number,
  causticIntensity?: number,
  causticScale?: number,
  causticSpeed?: number,

  displacementMap?: THREE.Texture,
  normalMap?: THREE.Texture,
  aoMap?: THREE.Texture,
  map?: THREE.Texture,
  roughnessMap?: THREE.Texture,
}

const CausticsMaterialImpl: React.FC<IProps> = ({
  side = 2,
  color = 0xffffff,
  emissive = 0x000000,
  normalMap,
  displacementMap,
  roughnessMap,
  causticIntensity = 1,
  map,
  aoMap,
  causticScale = 0.25,
  causticSpeed = 0.1,
}) => {
  const mat = useRef<any>(null)

  const causticsMap = useTexture('/textures/caustic.png', (t) => {
    if ('wrapS' in t) {
      t.wrapS = THREE.RepeatWrapping
      t.wrapT = THREE.RepeatWrapping
      t.encoding = THREE.LinearEncoding
      t.needsUpdate = true
    }
  })

  useFrame(({ clock }) => {
    if (mat.current) {
      mat.current.u_time = clock.getElapsedTime()
    }
  })

  // return <causticsMaterial side={side} {...props} ref={mat} u_caustics_map={causticsMap} />
  return React.createElement('causticsMaterial', {
    side,
    ref: mat,
    u_caustics_map: causticsMap,
    // depthWrite: false,
    color,
    u_causticIntensity: causticIntensity,
    map,
    normalMap,
    displacementMap,
    aoMap,
    emissive,
    roughnessMap,
    envMapIntensity: 0,
    displacementScale: 0,
    u_caustics_scale: causticScale,
    u_caustic_speed: causticSpeed,
  })
}

export default CausticsMaterialImpl;
