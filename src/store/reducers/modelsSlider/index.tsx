import create from 'zustand';
import { TEST_MODELS_SLIDES } from '../../../constants/dummyData.constants';
import { IModelsSliderItem } from '../../../types/models.types';

interface IModelsSliderState {
  items: IModelsSliderItem[],
  setItems: (s: IModelsSliderItem[]) => void;
  setActiveItem: (i: number) => void,
  activeItem: number,
}

const useModelsSlider = create<IModelsSliderState>((set) => ({
  activeItem: 0,
  items: TEST_MODELS_SLIDES,
  setActiveItem(activeItem: number) {
    set({ activeItem });
  },
  setItems(items: IModelsSliderItem[]) {
    set({ items });
  },
}));

export { useModelsSlider };
