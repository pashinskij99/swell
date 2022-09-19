import { useGLTF } from '@react-three/drei'
import React from 'react'
import { useMWState } from '../state'
import { IMWModelConfig } from '../types'

type IModelProps = {
  config: IMWModelConfig
}

const MWModel: React.FC<IModelProps> = ({ config }) => {
  const model = useGLTF(config.url, true);
  const _object = React.useRef<THREE.Group>(null!);
  const { setControlsFocus } = useMWState()

  React.useEffect(() => {
    if (_object.current) {
      setControlsFocus(_object.current);
    }
  }, [_object])

  return (
    <group rotation={config.rotation} scale={config.scale} ref={_object}>
      <group>
        <primitive object={model.scene} />
      </group>
    </group>
  )
}

export default MWModel;
