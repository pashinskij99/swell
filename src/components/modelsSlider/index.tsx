import clsx from 'clsx';
import { useControls } from 'leva';
import { useEffect } from 'react';
import { useModelsSlider } from '../../store/reducers/modelsSlider';
import { useProjectSlider } from '../../store/reducers/projectSlider';
import styles from './styles.module.scss';

const ModelsSliderUI: React.FC = () => {
  const { items, setActiveItem, activeItem } = useModelsSlider();

  // const gui = useControls('Portfolio', {
  //   'Active Model Slide': {
  //     value: activeItem,
  //     min: 0,
  //     max: items.length - 1,
  //     step: 1,
  //   },
  // })

  // useEffect(() => {
  //   setActiveItem(gui['Active Model Slide']);
  // }, [gui]);

  return (
    null
  );
};

export default ModelsSliderUI;
