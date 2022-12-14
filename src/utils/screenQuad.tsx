/* eslint-disable react/display-name */
// reference: https://medium.com/@luruke/simple-postprocessing-in-three-js-91936ecadfb7
// and @gsimone ;)
import * as THREE from 'three'
import * as React from 'react'

export function createScreenQuadGeometry() {
  const geometry = new THREE.BufferGeometry()
  const vertices = new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0])
  const uvs = new Float32Array([0, 0, 2, 0, 0, 2])

  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
  geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2))
  geometry.computeVertexNormals()

  return geometry
}

interface IProps {
  children: React.ReactNode,
}

const ScreenQuad = React.forwardRef<THREE.Mesh, IProps>(({ children, ...restProps }, ref) => {
  const geometry = React.useMemo(createScreenQuadGeometry, [])

  return (
    <mesh ref={ref} geometry={geometry} frustumCulled={false} {...restProps}>
      {children}
    </mesh>
  )
})

export default ScreenQuad;
