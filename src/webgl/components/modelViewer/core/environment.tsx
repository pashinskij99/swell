import { Environment } from '@react-three/drei'
import { PresetsType } from '@react-three/drei/helpers/environment-assets'
import React from 'react'

type Presets = PresetsType

interface IMWEnvProps {
  preset?: Presets
}

const MWEnv: React.FC<IMWEnvProps> = ({ preset = 'studio' }) => {
  return (
    <Environment preset={preset} />
  )
}

export default MWEnv;
