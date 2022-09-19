import { OrbitControls } from '@react-three/drei'
import React from 'react'
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three'
import { useMWState } from '../state';

const MWControls: React.FC = () => {
  const [box] = React.useState(new THREE.Box3())
  const [delta] = React.useState(new THREE.Vector3())
  const [sphere] = React.useState(new THREE.Sphere())
  const [center] = React.useState(new THREE.Vector3())

  const _controls = React.useRef<OrbitControlsImpl | null>(null);
  const { setControls, focusObject, controls } = useMWState();

  React.useEffect(() => {
    if (_controls.current) {
      setControls(_controls.current);
    }
  }, [_controls, setControls]);

  React.useEffect(() => {
    if (controls && focusObject) {
      box.setFromObject(focusObject);
      box.getCenter(center);
      controls.target.copy(center)
      const distance = box.getBoundingSphere(sphere).radius;

      delta.set(0, 0, 1);
      delta.applyQuaternion(controls.object.quaternion);
      delta.multiplyScalar(distance * 2.5);

      controls.object.position.copy(center).add(delta);
    }
  }, [controls, focusObject])

  return (
    <OrbitControls ref={_controls} />
  )
}

export default MWControls;
