import React from 'react'
import { EffectComposer, SSAO, SMAA } from '@react-three/postprocessing'
import { SSAOEffect } from 'postprocessing';
import { Color } from 'three';

interface MWEffectsProps {
}

const MWEffects: React.FC<MWEffectsProps> = () => {
  return (
    <EffectComposer multisampling={0} autoClear={false}>
      <SSAO
        samples={9}
        rings={7}
        distanceThreshold={2}
        distanceFalloff={0.25}// with an additional ~2.5 units of falloff.
        rangeThreshold={0.1}// Occlusion proximity of ~0.3 world units
        rangeFalloff={0.01}// with ~0.1 units of falloff.
        luminanceInfluence={0.7}
        radius={0.01}
        intensity={80}
        bias={0.025}
      />
      <SMAA preset={2} />
    </EffectComposer>
  )
}

export default MWEffects;
