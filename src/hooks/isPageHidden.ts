import { useViewerState } from '../store/reducers/viewer.reducer'

export const usePageIsHidden = (page: string) => {
  const { currentScene, isCameraTraveling } = useViewerState()

  const isHidden = currentScene !== page || isCameraTraveling;

  return isHidden
};
