import React from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import styles from './styles.module.scss';
import { Button } from '../button';

type ICardProps = {
  size: 'small' | 'big';
  image: string;
  name: string;
  description: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  // theme: 'light' | 'dark',
  disabled: boolean;
};

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

const Card: React.FC<ICardProps> = ({
  onClick,
  name,
  size,
  disabled,
  image,
  description,
}) => {
  return (
    <motion.div
      viewport={{ once: true, amount: 1 }}
      initial="hidden"
      whileInView="visible"
      data-size={size}
      data-disabled={disabled}
      className={styles.card_wrapper}
    >
      <div className={styles.card_wrapper_image}>
        <img src={image} alt="img" />
      </div>
      <div className={styles.wrapper}>
        <div className={styles.card_body}>
          <div className={styles.description}>
            <div className={clsx(styles.name, 'name')}>
              <motion.span variants={textAnimation}>{name}</motion.span>
            </div>
            <span className={styles.descr}>
              <motion.span variants={textAnimation}>{description}</motion.span>
            </span>
          </div>
          <div className={styles.card_btn_wrapper}>
            <motion.span variants={textAnimation}>
              <Button
                onClick={onClick}
                type="view"
                theme="light"
                disabled={disabled}
              />
            </motion.span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
