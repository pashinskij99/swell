import React from 'react';
import clsx from 'clsx';
// import { motion } from 'framer-motion';
import styles from './styles.module.scss';
import { IProjectData } from '../../types/project.types';

type IProjectDataViewerProps = {
  data: IProjectData;
};

const ProjectDataViewer: React.FC<IProjectDataViewerProps> = (props) => {
  const { data } = props;

  return (
    <div
      // viewport={{ once: true }}
      // initial="hidden"
      // whileInView={!isHidden ? 'visible' : ''}
      className={styles.wrapper}
    >
      <section className={clsx(styles.main, 'container')}>
        <h2>{data.name}</h2>
      </section>
      <section className={styles.main_image_wrapper}>
        <img
          className={styles.main_image}
          src={data.previewImage}
          alt="mainImage"
        />
      </section>
      <section className={styles.about}>
        <div className={clsx(styles.container, 'container')}>
          <div className={styles.about_main}>
            <h2>{data.title}</h2>
            <p className="text-1">About</p>
            <p className="text-1">{data.description}</p>
          </div>
          <ul className={styles.about_list}>
            {data.rows.map(({ title, type }) => (
              <li key={type}>
                <span className="text-2">{type}</span>
                <h2>{title}</h2>
              </li>
            ))}
          </ul>
          <ul className={styles.about_list_screens}>
            {data.screens.map(({ title, image }) => (
              <li key={title}>
                <img src={image} alt={title} />
                <p className="text-1">{title}</p>
              </li>
            ))}
          </ul>
          <div className={styles.desc_wrapper}>
            <p className="text-1">{data.article.text}</p>
            {/* <p className="text-1">{data.about.text}</p> */}
          </div>
          <ul className={styles.image_wrapper}>
            {data.images.map((image) => (
              <li key={image} className={styles.image_item}>
                <img className={styles.image} src={image} alt="img" />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default ProjectDataViewer;
