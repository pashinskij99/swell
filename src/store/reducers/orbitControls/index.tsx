import { OrbitControls } from 'three-stdlib';
import create from 'zustand';

interface IOrbitControlsState {
  controls?: OrbitControls,
  set: (s: OrbitControls) => void,
}

const useOrbitControls = create<IOrbitControlsState>((set) => ({
  set(controls: OrbitControls) {
    set({ controls });
  },
  controls: undefined,
}));

export { useOrbitControls };
