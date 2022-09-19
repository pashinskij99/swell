import { OrbitControls } from 'three-stdlib';
import * as THREE from 'three'
import create from 'zustand';
import { IMWConfig } from './types';

interface IViewerState {
  modelRef?: React.RefObject<any>,
  setModelRef: (obj: any) => void,
  controls?: OrbitControls,
  setControls: (v: OrbitControls) => void,
  setControlsFocus: (v: THREE.Object3D) => void,
  focusObject?: THREE.Object3D,
}

const useMWState = create<IViewerState>((set, state) => ({
  modelRef: undefined,
  setModelRef: (modelRef) => set({ modelRef }),
  setControls: (controls) => set({ controls }),
  setControlsFocus: (focusObject) => set({ focusObject }),
}));

export { useMWState };
