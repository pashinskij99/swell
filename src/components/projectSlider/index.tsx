/* eslint-disable react-hooks/exhaustive-deps */
import clsx from 'clsx';
import { throttle } from 'lodash';
import { motion } from 'framer-motion';
import React, { useMemo } from 'react';
import { ROUTES } from '../../constants/pages.constants';
import { useProjectSlider } from '../../store/reducers/projectSlider';
import { useViewerState } from '../../store/reducers/viewer.reducer';
import { Button } from '../button';
import styles from './styles.module.scss';

const currentIndex = { value: 0, itemsCount: 0 }

const textAnimation = {
  hidden: {
    y: 100,
    opacity: 0,
  },
  visible: (custom: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: custom * 0.25,
      duration: 1,
    },
  }),
};

const ProjectSliderUI: React.FC = () => {
  const { items, sliderOffset, setSiderOffset } = useProjectSlider();
  const activeItem = items[sliderOffset];
  const { currentScene, isCameraTraveling } = useViewerState()
  const isHidden = currentScene !== ROUTES.PROJECTS || isCameraTraveling

  currentIndex.value = sliderOffset;
  currentIndex.itemsCount = items.length - 1;

  const nextItem = items[sliderOffset + 1] || items[0];
  const prevItem = items[sliderOffset - 1] || items[items.length - 1];

  const handleButton = (dir: 1 | -1) => {
    let next = currentIndex.value + dir;

    if (next < 0) {
      next = currentIndex.itemsCount;
    }

    if (next > currentIndex.itemsCount) {
      next = 0;
    }

    setSiderOffset(next);
  };

  const throttledHandleButton = useMemo(
    () => throttle(handleButton, 1300),
    [],
  )

  return (
    <motion.div
      viewport={{ once: true }}
      initial="hidden"
      whileInView={!isHidden ? 'visible' : ''}
      className={clsx(styles.root, isHidden && styles.hidden)}
    >
      <div className={styles.wrapper}>
        <motion.div
          variants={textAnimation}
          className={styles.title}
        >
          { activeItem?.title }
        </motion.div>
        <motion.div
          variants={textAnimation}
          className={styles.content}
        >
          <div className={styles.content_view}>
            <div className={styles.button_desktop}>
              <Button
                type="view"
                disabled={false}
                name="View"
                theme="light"
                href={ROUTES.PROJECT.replace(':slug', activeItem?.slug)}
              />
            </div>
            <div className={styles.button_mobile}>
              <Button
                type="start"
                disabled={false}
                name="View"
                theme="light"
                href={ROUTES.PROJECT.replace(':slug', activeItem?.slug)}
              />
            </div>
          </div>
          <div className={styles.content_controls}>
            <Button
              type="prev_slider"
              theme="light"
              name={prevItem?.title}
              onClick={() => throttledHandleButton(-1)}
            />
            <div className={styles.dots}>
              {items.map((item, i) => (
                <div
                  className={clsx(
                    styles.dot,
                    i === sliderOffset && styles.dot_active,
                  )}
                  key={item.id}
                />
              ))}
            </div>
            <Button
              type="next_slider"
              theme="light"
              name={nextItem?.title}
              onClick={() => throttledHandleButton(1)}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProjectSliderUI;
