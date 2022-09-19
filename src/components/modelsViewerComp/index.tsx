import { Suspense } from 'react';
import { TEST_WMMODELS } from '../../constants/dummyData.constants';
import { ModelsViewer } from '../../webgl/components/modelViewer';
import styles from './styles.module.scss';

interface IModelsViewerCompProps {
  item: typeof TEST_WMMODELS[0]
}

const Loader = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.loader_text}>
        loading
      </div>
    </div>
  )
}

const ModelsViewerComp: React.FC<IModelsViewerCompProps> = ({ item }) => {
  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <Suspense fallback={<Loader />}>
          <ModelsViewer
            config={item.scene}
            model={item.model}
          />
        </Suspense>
      </div>
    </div>
  );
};
export default ModelsViewerComp;
