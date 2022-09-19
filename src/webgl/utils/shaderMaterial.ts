/* eslint-disable no-param-reassign */
import * as THREE from 'three'

const shaderMaterial = (
  base: typeof THREE.MeshBasicMaterial
| typeof THREE.MeshStandardMaterial = THREE.MeshStandardMaterial,
  ) => (
  uniforms: Record<string, any>,
  vertexShaderOrOnBeforeCompile: (((arg: any) => void) | string),
  fragmentShader: string,
) => {
  return class MyMaterial extends base {
    uniforms: any

    constructor(params: any) {
      super(params);

      (this as any).setValues(params)

      const keys = Object.keys(uniforms)

      const _uniforms = keys.reduce<Record<string, any>>((acc, key) => {
        acc[key] = new THREE.Uniform(uniforms[key])

        return acc
      }, {})

      this.uniforms = THREE.UniformsUtils.clone(_uniforms)

      type PropType = Record<string, {
        get: () => any
        set: (v: any) => void
      }>

      const properties = keys.reduce<PropType>((acc, key) => {
        acc[key] = {
          get: () => this.uniforms[key].value,
          set: (newValue) => {
            this.uniforms[key].value = newValue
          },
        }

        return acc
      }, {})

      Object.defineProperties(this, properties)
    }

    onBeforeCompile = (shader: any) => {
      Object.assign(shader.uniforms, this.uniforms)

      if (typeof vertexShaderOrOnBeforeCompile === 'function') {
        vertexShaderOrOnBeforeCompile(shader)
      } else {
        shader.vertexShader = vertexShaderOrOnBeforeCompile
        shader.fragmentShader = fragmentShader
      }
    }
  }
}

export default shaderMaterial
