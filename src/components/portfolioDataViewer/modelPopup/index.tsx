import clsx from 'clsx';
import * as React from 'react'
import { IModelData } from '../../../types/models.types';
import { ModelsViewer } from '../../../webgl/components/modelViewer';
import styles from '../styles.module.scss'

interface IModelPopupProps {
  data: IModelData,
  onClose: () => void,
}

const ModelPopup: React.FC<IModelPopupProps> = ({ data, onClose }) => {
  return (
    <>
    <div data-active className={styles.popup_background}></div>
      <div data-active className={styles.popup}>
        <div className={clsx(styles.container, 'container')}>
          <div className={styles.background}>
            <div className={clsx(styles.container_inner, 'container')}>
              <div className={styles.image_wrapper}>
                <div className={styles.viewer}>
                <React.Suspense fallback={null}>
                  <ModelsViewer
                    config={data.config.viewerConfig}
                    model={data.config.modelConfig}
                  />
                </React.Suspense>
                </div>
                <nav className={styles.navigate_image}>
                  <ul className={styles.navigate_list}>
                    {/* {
                      navigationPopup.map(({ image, id }) => {
                        return (
                          <li key={id}>
                            <img src={image} alt="" />
                          </li>
                        )
                      })
                    } */}
                  </ul>
                </nav>
              </div>
              <div className={styles.body_text}>
                <div className={styles.name}>
                  <span>{data.name}</span>
                  <p>3D Modelling/Characters</p>
                </div>
                <div className={styles.info}>
                  <span>Model information</span>
                  <p>
                    {data.description}
                  </p>
                </div>
              </div>
              <div className={styles.close_btn} onClick={onClose}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};

export default ModelPopup;
