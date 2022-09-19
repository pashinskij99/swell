import {
 softShadows,
} from '@react-three/drei';
import anime from 'animejs';
import { useControls } from 'leva';
import { NextRouter, useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Group, Object3D } from 'three';
import { ROUTES } from '../../../constants/pages.constants';
import { useModelsSlider } from '../../../store/reducers/modelsSlider';
import { animateAlpha } from '../../../utils/animateAlpha';
import CausticsMaterial from '../../materials/caustic.material';
import GodraysMaterial from '../../materials/godrays.material';
import Effects from './effects';
import ModelsSliderModel from './model';
import Particles from './particles';
import PoolMaterial from './poolMaterial';
import WaterTube from './waterTube';

softShadows();

const indexToAlpha = [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875];

interface IProps {
  router: NextRouter
}

const ModelsSlider: React.FC<IProps> = ({ router }) => {
  const { activeItem, setActiveItem, items } = useModelsSlider()
  const [itemAlpha, setItemAlpha] = useState(0)
  const targetAlphaValue = indexToAlpha[activeItem] || 0
  const isActive = router.route === ROUTES.PORTFOLIO

  const gui = useControls('Portfolio', {
    'Active Model Slide': {
      value: activeItem,
      min: 0,
      max: items.length - 1,
      step: 1,
    },
    'top water color': {
      value: '#1975ff',
    },
    // 'Active Model Slide': {
    //   value: activeItem,
    //   min: 0,
    //   max: items.length - 1,
    //   step: 1,
    // },
  })

  useEffect(() => {
    setActiveItem(gui['Active Model Slide']);
  }, [gui]);

  useEffect(() => {
    const currAlpha = { value: itemAlpha }

    // const a = currAlpha.value + 1
    // const b = targetAlphaValue + 1

    const duration = 2000 // * (Math.min(a, b) / Math.max(b, a))

    // const anim = anime({
    //   duration,
    //   targets: currAlpha,
    //   value: targetAlphaValue,
    //   easing: 'easeOutQuad',
    //   change: () => {
    //     setItemAlpha(currAlpha.value)
    //   },
    // })
    setItemAlpha(targetAlphaValue)

    return () => {
      requestAnimationFrame(() => {
        // anim.pause()
      })
    }
  }, [targetAlphaValue])

  const renderEffects = () => {
    if (!isActive) {
      return null
    }

    return (
      <Effects />
    );
  }

  const renderLight = () => {
    if (!isActive) {
      return null;
    }

    return (
      <directionalLight
        position={[0, 50, -10]}
        intensity={0.25}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={120}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
      />
    )
    // return null
  }

  return (
    <>
      {renderEffects()}
      <group position={[0, 0, 0]}>
        {renderLight()}
          <mesh rotation-x={-Math.PI / 2} position-y={-3.5}>
            <planeGeometry args={[100, 100, 1, 1]} />
            <PoolMaterial />
          </mesh>

          <mesh rotation-x={-Math.PI / 2} receiveShadow position-y={-3.48}>
            <planeGeometry args={[40, 40, 1, 1]} />
            <shadowMaterial opacity={0.5} />
          </mesh>

          <mesh position-y={3.5} rotation-x={-Math.PI / 2}>
            <planeGeometry args={[100, 100, 1, 1]} />
            <CausticsMaterial side={1} emissive={gui['top water color']} />
          </mesh>

        {/* <ModelsSliderModel active={isActive} alpha={itemAlpha} /> */}
        <WaterTube />
      </group>
      {/* <Particles count={64} /> */}
    </>
  );
}

export default ModelsSlider;
