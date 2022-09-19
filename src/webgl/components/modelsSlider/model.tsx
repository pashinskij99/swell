/* eslint-disable no-param-reassign */
/* eslint-disable react/display-name */
import * as THREE from 'three';
import React, { useEffect, useRef, useState } from 'react';
import { useGLTF, useAnimations, useFBX } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useOrbitControls } from '../../../store/reducers/orbitControls';
import { animateAlpha } from '../../../utils/animateAlpha';
import TriplanarMaterialImpl from '../../materials/triplanar.material';

const OBJECTS_EXTRAS = {
  castShadow: true,
};

interface GLTFResult {
  materials: any,
  nodes: any,
  animations: any[],
}

interface ISliderObjectProps {
  mesh: THREE.Mesh<any, any>
}

const SliderObject: React.FC<ISliderObjectProps> = ({ mesh }) => {
  const _outerMesh = useRef<THREE.Mesh | null>(null!)
  const _innerMesh = useRef<THREE.Mesh | null>(null!)
  const [center, setCenter] = useState<THREE.Vector3 | undefined>()
  const { nodes } = useGLTF('/models/modelsSlider/suzanne.glb') as unknown as GLTFResult

  const renderInnerMesh = () => {
    if (center) {
      return (
        <group
          position={center!}
        >
          <mesh
            scale={10}
            ref={_innerMesh}
            material-envMapIntensity={0.7}
            material-metalness={0.5}
            material-roughness={0.25}
            {...OBJECTS_EXTRAS}
            geometry={nodes.Suzanne.geometry}
          >
            {/* <sphereGeometry args={[0.5, 10]} /> */}
            {/* <boxGeometry args={[6, 6, 6]} /> */}
            <TriplanarMaterialImpl mesh={_innerMesh} />
          </mesh>
        </group>
      )
    }

    return null
  }

  React.useEffect(() => {
    if (_outerMesh.current) {
      setTimeout(() => {
        const box = new THREE.Box3().expandByObject(_outerMesh.current!)
        const _center = box.getCenter(new THREE.Vector3())

        _outerMesh.current!.worldToLocal(_center)
        setCenter(_center)
      }, 1000)
    }
  }, [_outerMesh])

  React.useEffect(() => {
    if (_innerMesh.current) {
      _innerMesh.current!.lookAt(0, 0, 0)
    }
  }, [_innerMesh, center])

  return (
    <mesh
      name={mesh.name}
      ref={_outerMesh}
      geometry={mesh.geometry}
      material={mesh.material}
      material-visible={false}
      // material-transparent
      // material-opacity={0.5}
      position={mesh.position}
      rotation={mesh.rotation}
      // scale={mesh.scale}
    >
      { renderInnerMesh() }
    </mesh>
  );
}

type IProps = JSX.IntrinsicElements['group'] & {
  alpha: number;
  active: boolean,
  children?: React.ReactNode;
};

const ModelsSliderModel = React.forwardRef<THREE.Group, IProps>(
  (props, forwardRef) => {
    const group = useRef<THREE.Group>(null!);
    const { nodes, animations } = useGLTF('/models/modelsSlider/model2.glb') as unknown as GLTFResult;
    const { actions } = useAnimations(animations, group);
    const getCameraActions = () => Object.values(actions)
      .filter((i) => i) as unknown as THREE.AnimationAction[] || [];

    useEffect(() => {
      if (forwardRef) {
        // @ts-ignore
        forwardRef.current = group.current;
      }
      if (group.current) {
        const anims = getCameraActions()
        if (anims) {
          anims.forEach((anim) => { anim.play().paused = true })
        }
      }
    }, [group.current]);

    useFrame((state) => {
      const anims = getCameraActions()

      anims.forEach((action) => {
        if (action) {
          // action.time = action.getClip().duration * props.alpha
          action.time = THREE.MathUtils.lerp(
            action.time,
            action.getClip().duration * props.alpha,
            0.02,
          );
        }
      })

      if (props.active) {
        // const cameraMesh = group.current.getObjectByName('Cube_Camera_01') as THREE.Group;
        // const pos = cameraMesh.position.clone()
        // cameraMesh.parent?.localToWorld(pos);

        // camera.position.copy(pos);
        // camera.rotation.copy(cameraMesh.rotation);
        // camera.rotateY(-Math.PI / 2)

        // const direction = camera.getWorldDirection(new THREE.Vector3());

        // camera.position.add(direction.multiplyScalar(5));

        // controls?.target.copy(camera.position.clone().add(direction));
        // controls?.update();
      }

      if (group) {
        group.current.children.forEach((_child, index) => {
          const child = _child.children[0]?.children[0]

          if (!child) return null

          const et = state.clock.elapsedTime;

          const multiplier = 1000
          child.position.y = Math.sin((et + index * multiplier) * 0.5) * 1;
          // child.rotateZ(Math.sin((et + index * (multiplier / 2))) / 800)
          // child.rotateY(Math.sin((et + index * multiplier) * 0.05) * 0.0009)
          // child.rotateZ(Math.cos((et + index * multiplier) * 0.2) * 0.00009)
          // child.rotation.y = Math.cos((et + index * multiplier) / 2) / 10;
          // child.rotation.z = Math.sin((et + index * multiplier) / 3) / 10;

          return null
        });
      }
    });

    const itemsConfig = [
      nodes.GeoSphere001,
      nodes.GeoSphere002,
      nodes.GeoSphere003,
      nodes.GeoSphere004,
      nodes.GeoSphere005,
      nodes.GeoSphere006,
      nodes.GeoSphere007,
      nodes.GeoSphere008,
    ]

    return (
      <group scale={0.1} ref={group} {...props} dispose={null}>
        {
          itemsConfig.map((el, i) => {
            return (
              <SliderObject
                key={i as number}
                mesh={el}
              />
            );
          })
        }
      </group>
    );
  },
);

export default ModelsSliderModel;
