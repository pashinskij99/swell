/* eslint-disable react/jsx-no-constructed-context-values */
import { useThree } from '@react-three/fiber';
import { useControls } from 'leva';
import _ from 'lodash';
import React from 'react';
import { Vector3Tuple } from 'three';
import { radToDeg } from 'three/src/math/MathUtils';
import { useOrbitControls } from '../../../store/reducers/orbitControls';

interface IViewerGUIProps {
  // children: React.ReactNode
}

const ViewerGUI: React.FC<IViewerGUIProps> = () => {
  const { camera } = useThree();
  const { controls } = useOrbitControls();

  const [, setGuiControls] = useControls('Camera', () => ({
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    target: [0, 0, 0],
  }));

  React.useEffect(() => {
    if (controls) {
      const onControlsChange = _.throttle(() => {
        const rot = [camera.rotation.x, camera.rotation.y, camera.rotation.z].map(radToDeg)

        setGuiControls({
          position: camera.position.toArray(),
          rotation: rot,
          target: controls.target.toArray(),
        });
      }, 100);

      controls.addEventListener('change', onControlsChange);

      return () => {
        controls.removeEventListener('change', onControlsChange);
      };
    }

    return () => {};
  }, [camera.position, controls, setGuiControls]);

  return null;
};

export default ViewerGUI;
