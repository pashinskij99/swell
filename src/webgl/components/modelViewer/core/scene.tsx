import { Canvas } from '@react-three/fiber'
import React from 'react'
import * as THREE from 'three'
import { IMWConfig } from '../types/viewer.types'

// Light presets
// Auto focus on the center of the model, with an alpha to determine final zoom

interface IMWSceneProps {
  config: IMWConfig,
  children: React.ReactNode
}

const MWScene: React.FC<IMWSceneProps> = ({ config, children }) => {
  const _canvas = React.useRef<HTMLCanvasElement>(null!)

  React.useEffect(() => {
    if (_canvas.current?.parentElement) {
      _canvas.current.parentElement.style.background = config.background || '#000'
    }
  }, [_canvas, config])

  return (
    <Canvas
      ref={_canvas}
      dpr={2}
      camera={{
        fov: 45, position: [0, 0, 1], near: 0.1, far: 10000,
      }}
      gl={{
        outputEncoding: THREE.sRGBEncoding,
        alpha: true,
        toneMapping: THREE.NoToneMapping,
      }}
    >
      {children}
    </Canvas>
  )
}

export { MWScene };
