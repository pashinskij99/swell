import create from 'zustand';
import { IProjectSlide } from '../../../types/project.types';

interface IProjectSliderState {
  sliderOffset: number;
  items: IProjectSlide[],
  setSiderOffset: (s: number) => void;
  setItems: (s: IProjectSlide[]) => void;
}

const useProjectSlider = create<IProjectSliderState>((set) => ({
  sliderOffset: 0,
  items: [],
  setSiderOffset(sliderOffset: number) {
    set({ sliderOffset });
  },
  setItems(items) {
    set({ items });
  },
}));

export { useProjectSlider };
