import { useControls } from 'leva'
import * as React from 'react'
import { IMWConfig } from '../types'

const envTypes = [
  'sunset',
  'dawn',
  'night',
  'warehouse',
  'forest',
  'apartment',
  'studio',
  'city',
  'park',
  'lobby',
]

interface IProps {
  config: IMWConfig,
  setConfig: React.Dispatch<React.SetStateAction<IMWConfig>>
}

const MWGUIControls: React.FC<IProps> = ({ config, setConfig }) => {
  const dColor = config.background?.match(/#[0-9a-fA-F]{8}$|#[0-9a-fA-F]{6}$|#[0-9a-fA-F]{4}$|#[0-9a-fA-F]{6}/gm)

  const { environment, color1, color2 } = useControls('ModelsViewer', {
    environment: {
      options: envTypes,
      value: config.environment || 'studio',
    },
    color1: {
      value: dColor?.[0] || '#434343',
    },
    color2: {
      value: dColor?.[1] || '#000000',
    },
  })

  React.useEffect(() => {
    setConfig((c) => ({ ...c, environment: environment as any }))
  }, [environment])

  React.useEffect(() => {
    setConfig((c) => ({ ...c, background: `radial-gradient(circle, ${color1} 5%, ${color2} 75%)` }))
  }, [color1, color2])

  return (
    null
  )
}

export default MWGUIControls;
