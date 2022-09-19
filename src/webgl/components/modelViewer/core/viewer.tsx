import React from 'react'
import { IMWModelConfig } from '../types/model.types'
import { IMWConfig } from '../types/viewer.types'
import MWControls from './controls'
import MWEnv from './environment'
import MWGUIControls from './GUIControls'
import MWModel from './model'
import { MWScene } from './scene'

// Light presets
// Auto focus on the center of the model, with an alpha to determine final zoom

interface IModelViewerProps {
  config: IMWConfig,
  model: IMWModelConfig
}

const ModelsViewer: React.FC<IModelViewerProps> = ({ config, model }) => {
  const [sceneConfig, setSceneConfig] = React.useState(config)

  return (
    <MWScene config={sceneConfig || config}>
      <MWEnv preset={sceneConfig.environment} />
      {/* <MWGUIControls config={sceneConfig} setConfig={setSceneConfig} /> */}
      <MWModel config={model} />
      <MWControls />
      {/* <MWEffects /> */}
    </MWScene>
  )
}

export { ModelsViewer };
