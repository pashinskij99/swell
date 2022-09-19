// import { Environment, Stats } from '@react-three/drei';
import { useControls } from 'leva';
import { useRouter } from 'next/router';
import React from 'react';
import CameraTraveling from '../cameraTraveling';
import EnvironmentModel from '../environmentModel';
import ViewerGUI from '../gui';
import MainScene from '../mainScene';
import ProjectsSlider from '../projectsSlider';
import styles from './styles.module.scss';

const SceneViewer: React.FC = () => {
  const router = useRouter();

  const controls = useControls('viewer', {
    'Hide interface': {
      value: false,
    },
  })

  console.log(router.pathname)

  React.useEffect(() => {
    const val = controls['Hide interface']

    const domEl = document.getElementById('page_content')

    if (domEl) {
      domEl.style.display = val ? 'none' : 'block'
    }
  }, [controls['Hide interface']])

  return (
    <div data-page={router.pathname} id="3d_viewer" className={styles.root}>
      <React.Suspense fallback={null}>
        <MainScene>
          <CameraTraveling router={router} />
          <ViewerGUI />
          <EnvironmentModel />
          <ProjectsSlider />
          {/* <ModelsSlider router={router} /> */}
        </MainScene>
        {/* <Stats /> */}
      </React.Suspense>
    </div>
  );
};

export default SceneViewer;
