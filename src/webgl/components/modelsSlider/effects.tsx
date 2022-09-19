import { ScreenQuad } from '@react-three/drei'
import { useControls } from 'leva'
import React from 'react'
import { useEqTexture } from '../../../utils/useHDR'
import GodraysMaterialImpl from '../../materials/godrays.material'

const Effects: React.FC = () => {
  const envMap = useEqTexture('/textures/underwater.png');

  const fogColor = useControls('Portfolio', {
    'Fog color': '#afeaff',
    'Fog density': {
      // value: 0.1,
      value: 0,
      min: 0,
      max: 1,
      step: 0.005,
    },
  })

  return (
    <>
      <fogExp2 attach="fog" density={fogColor['Fog density']} color={fogColor['Fog color']} />
      <color args={[fogColor['Fog color']]} attach="background" />
      <ScreenQuad>
        <GodraysMaterialImpl />
      </ScreenQuad>

      {/* <Environment preset="night" /> */}
      {/* <Environment
        map={envMap}
      /> */}
    </>
  )
}

export default Effects;
