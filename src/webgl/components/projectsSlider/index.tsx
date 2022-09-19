/* eslint-disable no-param-reassign */
/* eslint-disable react/no-array-index-key */
import { useTexture } from '@react-three/drei';
import anime from 'animejs';
import React, { useRef, useState } from 'react';
import {
  Group, Vector3,
} from 'three';
import { useProjectSlider } from '../../../store/reducers/projectSlider';
import { IProjectSlide } from '../../../types/project.types';
import { animateAlpha } from '../../../utils/animateAlpha';
import { PROJECTS_SLIDER_CONFIG, SLIDE_POSITION } from './config';

interface IProjectSliderItem extends IProjectSlide {
  position: SLIDE_POSITION;
  handleClick: () => void
}

interface IClipProps {
  materialOpacity: number,
  radius: number,
  height: number,
}

const ItemClip: React.FC<JSX.IntrinsicElements['mesh'] & IClipProps> = ({
  rotation,
  radius,
  height,
  position,
  materialOpacity,
}) => {
  return (
    <mesh position={position} rotation={rotation}>
      <cylinderGeometry args={[radius, radius, height, 14, 1]} />
      <meshStandardMaterial
        color={0x000000}
        side={2}
        opacity={materialOpacity}
        transparent
      />
    </mesh>
  )
}

const ProjectSliderItem: React.FC<IProjectSliderItem> = ({
  sliderImage,
  id,
  handleClick,
  position,
}) => {
  const [materialOpacity, setMaterialOpacity] = useState(0);
  const _root = useRef<Group>(null);
  const _animation = useRef<anime.AnimeInstance | null>(null);
  const map = useTexture(sliderImage);
  const [prevPosition, setPrevPosition] = useState<SLIDE_POSITION>(position);

  const onPositionChange = () => {
    const { pos, rot } = PROJECTS_SLIDER_CONFIG.position_params[position];
    setPrevPosition(position);
    const root = _root.current!;

    _animation.current?.pause();

    if (position !== SLIDE_POSITION.HIDDEN) {
      root.visible = true;
    }

    if (prevPosition === SLIDE_POSITION.HIDDEN) {
      if (position === SLIDE_POSITION.LEFT) {
        root.rotation.y = -Math.PI / 6
      } else {
        root.rotation.y = Math.PI / 6
      }
    }

    const nextPosition = new Vector3().fromArray(pos);
    const currentPosition = root.position.clone();
    const nextRotation = new Vector3().fromArray(rot);
    const currentRotation = new Vector3().setFromEuler(root.rotation);

    const anim = animateAlpha(
      { easing: 'easeInOutCubic', duration: 1300 },
      (alpha) => {
        const currPos = currentPosition.clone().lerp(nextPosition, alpha);

        root.position.copy(currPos);

        if (position === SLIDE_POSITION.HIDDEN) {
          const _alpha = alpha * 1.5

          setMaterialOpacity(1 - _alpha);
          root.rotation.setFromVector3(
            currentRotation.clone().lerp(nextRotation, _alpha),
          );
        } else {
          root.rotation.setFromVector3(
            currentRotation.clone().lerp(nextRotation, alpha),
          );
          setMaterialOpacity((c) => (c > alpha ? c : alpha));
        }
      },
      () => {
        if (position === SLIDE_POSITION.HIDDEN) {
          root.visible = false;
        }
      },
    );

    _animation.current = anim;
  };

  React.useEffect(() => {
    if (_root.current) {
      onPositionChange();
    }
  }, [_root, position]);

  const onClick = () => {
    if (_animation.current?.completed) {
      if (position !== SLIDE_POSITION.HIDDEN) {
        handleClick();
      }
    }
  };

  return (
    <group ref={_root} name={`project_slider-item-${id}`}>
      <mesh onClick={onClick} name="slide" castShadow>
        <planeGeometry args={[18.10, 19.30]} />
        <meshStandardMaterial
          map={map}
          side={2}
          color={0xffffff}
          transparent
          metalness={0.8}
          roughness={0.25}
          opacity={materialOpacity * 1.5}
          envMapIntensity={1.35}
        />
        {
          PROJECTS_SLIDER_CONFIG.clips.map((clip, index) => (
            <ItemClip
              key={index}
              position={clip}
              radius={0.12}
              height={0.48}
              rotation={[0, 0, Math.PI / 2]}
              materialOpacity={materialOpacity * 1.5}
            />
          ))
        }
        {
          PROJECTS_SLIDER_CONFIG.ropes.map((clip, index) => (
            <ItemClip
              key={index}
              position={clip}
              radius={0.03}
              height={5.4}
              materialOpacity={materialOpacity * 1.5}
            />
          ))
        }
      </mesh>
    </group>
  );
};

const ProjectsSlider: React.FC = () => {
const [items, visibleItemsStart, setVisibleItemsStart] = useProjectSlider(
    (state) => [state.items, state.sliderOffset, state.setSiderOffset],
  );

  const handleProjectClick = (index: number) => () => {
    setVisibleItemsStart(index);
  };

  const renderSlide = (item: IProjectSlide, index: number) => {
    let itemPosition: SLIDE_POSITION = SLIDE_POSITION.HIDDEN;

    if (
      index === visibleItemsStart
      || (items.length - visibleItemsStart === 0 && index === 0)
    ) {
      itemPosition = SLIDE_POSITION.CENTER;
    }

    if (
      (index === items.length - 1 && visibleItemsStart === 0)
      || index + 1 === visibleItemsStart
    ) {
      itemPosition = SLIDE_POSITION.LEFT;
    }

    if (
      (items.length - visibleItemsStart === 1 && index === 0)
      || (items.length - visibleItemsStart === 0 && index === 1)
      || index - 1 === visibleItemsStart
    ) {
      itemPosition = SLIDE_POSITION.RIGHT;
    }

    return (
      <ProjectSliderItem
        handleClick={handleProjectClick(index)}
        {...item}
        position={itemPosition}
        key={item.id}
      />
    );
  };

  return (
    <group name="projects_slider" position={PROJECTS_SLIDER_CONFIG.position}>
      <React.Suspense fallback={null}>
        {items.map(renderSlide)}
      </React.Suspense>
    </group>
  );
};

export default ProjectsSlider;
