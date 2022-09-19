import { OrbitControls } from 'three-stdlib';
import create from 'zustand';
import { ROUTES } from '../../constants/pages.constants';

interface IViewerState {
  setCameraTraveling: (v: boolean) => void,
  isCameraTraveling: boolean,
  currentScene: string,
  setCurrentScene: (v: string) => void
}

const useViewerState = create<IViewerState>((set) => ({
  setCameraTraveling(isCameraTraveling) {
    set({ isCameraTraveling });
  },
  setCurrentScene(currentScene) {
    set({ currentScene });
  },
  currentScene: ROUTES.HOME,
  isCameraTraveling: false,
}));

export { useViewerState };
