/* eslint-disable @typescript-eslint/no-var-requires */
import { useControls } from 'leva';
import _ from 'lodash';
import * as React from 'react'
import { Float32BufferAttribute, Vector3 } from 'three';
import GrassDecorator from '../../materials/grassDecorator';

const Perlin = require('perlin.js')

interface IGrassProps {
  base: THREE.Mesh,
  count: number,
  width?: number,
  height?: number,
}

const EnvironmentGrass: React.FC<IGrassProps> = ({
  base,
  width = 2,
  height = 15,
  count = 2000,
}) => {
  const _mesh = React.useRef<THREE.Mesh | null>(null);

  const controls = useControls('Grass', {
    baseColor: '#5c020c',
  })

  const config = {
    baseColor: controls.baseColor,
  }

  return (
    <group position={base.position}>
      <GrassDecorator width={width} height={height} strands={count}>
        <mesh scale={1} geometry={base.geometry} ref={_mesh} key="grassmesh">
          {/* <sphereGeometry args={[128, 64, 64]} /> */}
          <meshStandardMaterial roughness={0.5} color={config.baseColor} />
        </mesh>
      </GrassDecorator>
    </group>
  )
}

const areEqual = (prevProps: IGrassProps, nextGrassProps: IGrassProps) => {
  return _.isEqual(prevProps, nextGrassProps)
}

export default React.memo(EnvironmentGrass, areEqual);
