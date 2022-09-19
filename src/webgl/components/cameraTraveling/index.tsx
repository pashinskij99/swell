import * as THREE from 'three';
import { useAnimations, useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { NextRouter, useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { OrbitControls } from 'three-stdlib';
import { useControls } from 'leva';
import { easings } from 'animejs';
import { ROUTES } from '../../../constants/pages.constants';
import { useOrbitControls } from '../../../store/reducers/orbitControls';
import { IDecorateConfig, useModelDecorator } from '../../../utils/modelDecorator';
import { useModelsSlider } from '../../../store/reducers/modelsSlider';
import { animateAlpha } from '../../../utils/animateAlpha';
import { useViewerState } from '../../../store/reducers/viewer.reducer';

const EASING_OPTIONS = [
  'linear',
  'easeInQuad',
  'easeInCubic',
  'easeInQuart',
  'easeInQuint',
  'easeInSine',
  'easeInExpo',
  'easeInCirc',
  'easeInBack',
  'easeInElastic',
  'easeInBounce',
  'easeOutQuad',
  'easeOutCubic',
  'easeOutQuart',
  'easeOutQuint',
  'easeOutSine',
  'easeOutExpo',
  'easeOutCirc',
  'easeOutBack',
  'easeOutElastic',
  'easeOutBounce',
  'easeInOutQuad',
  'easeInOutCubic',
  'easeInOutQuart',
  'easeInOutQuint',
  'easeInOutSine',
  'easeInOutExpo',
  'easeInOutCirc',
  'easeInOutBack',
  'easeInOutElastic',
  'easeInOutBounce',
]

const ACTIONS_DICT = [
  {
    name: 'Action.012',
    mesh: 'Cube003',
    path: [ROUTES.HOME, ROUTES.CONTACTS],
  },
  {
    name: 'Action',
    mesh: 'Cube001',
    path: [ROUTES.HOME, ROUTES.ABOUT],
  },
  {
    name: 'Action.009',
    mesh: 'Cube0011',
    path: [ROUTES.HOME, ROUTES.PORTFOLIO],
    duration: 1.5,
  },
  {
    name: 'Action.001',
    mesh: 'Cube002',
    path: [ROUTES.HOME, ROUTES.PROJECTS],
  },
  // ---------------PROJECTS------------------------
  {
    name: 'Action.006',
    mesh: 'Cube007',
    path: [ROUTES.PROJECTS, ROUTES.CONTACTS],
  },
  {
    name: 'Action.005',
    mesh: 'Cube006',
    path: [ROUTES.PROJECTS, ROUTES.ABOUT],
  },
  {
    name: 'Action.002',
    mesh: 'Cube0010',
    path: [ROUTES.PROJECTS, ROUTES.PORTFOLIO],
    duration: 2,
  },
  // ---------------ABOUT------------------------
  {
    name: 'Action.004',
    mesh: 'Cube005',
    path: [ROUTES.ABOUT, ROUTES.CONTACTS],
  },
  {
    name: 'Action.010',
    mesh: 'Cube0012',
    path: [ROUTES.ABOUT, ROUTES.PORTFOLIO],
    duration: 2,
  },
  {
    name: 'Action.003',
    mesh: 'Cube004',
    path: [ROUTES.ABOUT, ROUTES.PROJECTS],
  },
  // ---------------CONTACTS------------------------
  {
    name: 'Action.011',
    mesh: 'Cube0013',
    path: [ROUTES.CONTACTS, ROUTES.PORTFOLIO],
    duration: 2,
  },
  {
    name: 'Action.008',
    mesh: 'Cube009',
    path: [ROUTES.CONTACTS, ROUTES.ABOUT],
  },
  {
    name: 'Action.007',
    mesh: 'Cube008',
    path: [ROUTES.CONTACTS, ROUTES.PROJECTS],
  },

  // ---------------PORTFOLIO------------------------
  //
];

interface ICamTravelingProps {
  modelRef: React.MutableRefObject<THREE.Group | undefined | null>;
  animations: THREE.AnimationClip[];
  route: string;
}

const trackMeshByCamera = (
  mesh: THREE.Object3D,
  camera: THREE.PerspectiveCamera,
  controls?: OrbitControls,
) => {
  const pos = mesh.position.clone();
  mesh.parent?.localToWorld(pos);

  camera.position.copy(pos);
  camera.rotation.copy(mesh.rotation);

  const direction = camera.getWorldDirection(new THREE.Vector3());

  controls?.target.copy(pos.add(direction));
  controls?.update();
  camera.updateProjectionMatrix()
}

const AnimationsController: React.FC<ICamTravelingProps> = ({
  modelRef,
  animations,
  route,
}) => {
  const { actions, mixer } = useAnimations(animations, modelRef);
  const { camera } = useThree();
  const { controls } = useOrbitControls();
  const [prevRoute, setPrevRoute] = useState<null | string>(null);

  const { setCameraTraveling, setCurrentScene } = useViewerState()
  const [selectedAnimation, setSelectedAnimation] = useState<
    null | { anim: typeof ACTIONS_DICT[0], skip: boolean, reverse: boolean }
  >(
    null,
  );

  const params = useControls('Camera animation', {
    duration: {
      value: 3000,
      min: 1,
      max: 3000,
      step: 10,
    },
    easing: {
      options: EASING_OPTIONS,
      value: 'easeInOutSine',
    },
  })

  useEffect(() => {
    let nextSelected;
    let reverse = false
    if (prevRoute) {
      nextSelected = ACTIONS_DICT.find(
        (action) => action.path[0] === prevRoute && action.path[1] === route,
      );
      if (!nextSelected) {
        nextSelected = ACTIONS_DICT.find(
          (action) => action.path[1] === prevRoute && action.path[0] === route,
        );
        reverse = true
      }
    } else {
      nextSelected = ACTIONS_DICT.find(
        (action) => action.path[1] === route,
      );
      if (!nextSelected) {
        nextSelected = ACTIONS_DICT.find(
          (action) => action.path[0] === route,
        );
        reverse = true
      }
    }

    if (nextSelected) {
      setSelectedAnimation({ anim: nextSelected || null, skip: !prevRoute, reverse });
    }
  }, [route, prevRoute])

  const action = selectedAnimation && actions[selectedAnimation.anim.name];
  const mesh = modelRef.current?.getObjectByName(selectedAnimation?.anim.mesh || 'never');

  useEffect(() => {
    setPrevRoute(route);
  }, [route]);

  useEffect(() => {
    if (action && mesh) {
      action.play().paused = true;
      action.play().clampWhenFinished = true;

      if (selectedAnimation) {
        let calls = 0;
        setCameraTraveling(true)
        const anim = animateAlpha({
          duration: params.duration * (selectedAnimation.anim.duration || 1),
          easing: params.easing,
        }, (alpha) => {
          calls += 1;

          if (selectedAnimation.reverse) {
            action.time = action.getClip().duration - (alpha * action.getClip().duration);
          } else {
            action.time = alpha * action.getClip().duration;
          }

          const cam = () => trackMeshByCamera(mesh, camera as THREE.PerspectiveCamera, controls);

          if (calls > 1) {
            cam();
          }
        }, () => {
          setCameraTraveling(false)
          setCurrentScene(route)
        })

        return () => {
          anim.pause();
        }
      }
    }

    return undefined;
  }, [actions, selectedAnimation, action, mesh]);

  return null;
};

interface ICameraTravelingProps {
  router: NextRouter;
}

const DECORATION: IDecorateConfig = [
  {
    mesh: 'any',
    mesh_properties: {
      visible: false,
    },
  },
]

const CameraTraveling: React.FC<ICameraTravelingProps> = ({ router }) => {
  const gltf = useGLTF('/models/camera/camera.glb');
  const _model = useRef<THREE.Group | null>(null);
  const { route } = router;
  const { camera } = useThree()
  const { controls } = useOrbitControls()
  useModelDecorator(DECORATION, gltf.scene)

  const fixedRoute = route.match(/\/[a-z]+/)?.[0] || '/';

  useEffect(() => {
    // camera.position.set(27.19, 13.17, 39.63);
    // controls?.target.set(47.94, 4.74, 44.13)
  }, [route, controls])

  return (
    <group scale={100}>
      <AnimationsController
        modelRef={_model}
        route={fixedRoute}
        animations={gltf.animations}
      />
      <primitive object={gltf.scene} ref={_model} />
    </group>
  );
};

export default CameraTraveling;
