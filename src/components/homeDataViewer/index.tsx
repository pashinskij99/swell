import React from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import styles from './styles.module.scss';
import { Button } from '../button';
import { ROUTES } from '../../constants/pages.constants';

interface Props {
  isHidden: boolean
}

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

const socialList = [
  { id: 1, title: 'Facebook', path: '' },
  { id: 2, title: 'Instagram', path: '' },
  { id: 3, title: 'Linkedin', path: '' },
];

const HomeDataViewer : React.FC<Props> = ({ isHidden }) => {
  const router = useRouter();

  const handleStart = () => {
    router.push(ROUTES.PROJECTS);
  };

  return (
    <motion.div
      viewport={{ once: true }}
      initial="hidden"
      whileInView={!isHidden ? 'visible' : ''}
      className={clsx(styles.wrapper, isHidden && styles.hidden)}
    >
      <div className={clsx(styles.container, 'container')}>
        <div className={styles.wrapper_inner}>
          <div className={styles.title}>
            <motion.h1 custom={1} variants={textAnimation}>
              SWELL INTERACTIVE
            </motion.h1>
            <motion.p custom={2} variants={textAnimation}>
              marketing, communications, web design, and 3D.
            </motion.p>
            <motion.div
              custom={3}
              variants={textAnimation}
              className={styles.btn_wrapper}
            >
              <div className={styles.button_mobile}>
                <Button
                  type="mobile"
                  name="Press to start"
                  theme="light"
                  onClick={handleStart}
                  disabled={false}
                />
              </div>
              <div className={styles.button_desktop}>
                <Button
                  type="start"
                  name="Start"
                  theme="light"
                  onClick={handleStart}
                  disabled={false}
                />
              </div>
            </motion.div>
          </div>
          <motion.div
            custom={4}
            variants={textAnimation}
            className={styles.link_wrapper}
          >
            <ul className={styles.social_list}>
              {socialList.map(({ id, title, path }) => {
                return (
                  <li key={id} className={styles.list_item}>
                    <Button
                      type="soc_link"
                      name={title}
                      theme="light"
                      disabled={false}
                    />
                  </li>
                );
              })}
            </ul>
          </motion.div>
          <motion.div
            custom={5}
            variants={textAnimation}
            className={styles.btn_theme}
          >
            <Button type="theme" theme="dark" disabled={false} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default HomeDataViewer;
