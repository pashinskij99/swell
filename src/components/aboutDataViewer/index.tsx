import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import styles from './styles.module.scss';
import { IAbout } from '../../types/common.types';
import { Footer } from '../footer';

interface Props {
  data: IAbout
  isHidden: boolean
}

const textAnimation = {
  hidden: {
    x: 100,
    opacity: 0,
  },
  visible: (custom: number) => ({
    x: 0,
    opacity: 1,
    transition: {
      delay: custom * 0.25,
      duration: 1,
    },
  }),
};

const AboutDataViewer: React.FC<Props> = (props: Props) => {
  const { data, isHidden } = props;

  const [heightImage, setHeightImage] = useState<number>(0);
  const [heightImage_2, setHeightImage_2] = useState<number>(0);
  const imageRef = useRef<HTMLDivElement>(null);
  const imageRef_2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const resizeHandler = () => {
      if (imageRef.current && imageRef_2.current) {
        setHeightImage(imageRef.current.offsetHeight);
        setHeightImage_2(imageRef_2.current.offsetHeight);
      }
    };

    setTimeout(() => {
      resizeHandler();
    }, 500);

    window.addEventListener('resize', resizeHandler);
    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, [imageRef.current, imageRef_2.current]);

  return (
    <motion.div
      viewport={{ once: true }}
      initial="hidden"
      whileInView={!isHidden ? 'visible' : ''}
      className={clsx(styles.container, 'container', isHidden && styles.opacity)}
    >
      <div className={styles.wrapper}>
        <motion.div
          variants={textAnimation}
          className={styles.background_content}
        >
        </motion.div>
        <div className={styles.three}></div>
        <motion.div
          variants={textAnimation}
          className={clsx(styles.content)}
        >
          <div className={styles.inner_content}>
            <h2>{data.title}</h2>
            <div className={styles.descr_1}>
              <div className={styles.descr}>
                <p className="text-2">{data.description.descr_1.texts[0]}</p>
                <p className="text-2">
                  {data.description.descr_1.texts[1]}
                  <br />
                  <br />
                  {data.description.descr_1.texts[2]}
                </p>
              </div>
              <ul className={styles.images_wrapper}>
                {data.description.descr_1.images.map((item) => {
                  return (
                    <li key={item} className={styles.image}>
                      <img src={item} alt="img" />
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className={styles.descr_2}>
              <div className={styles.descr}>
                <p className="text-2">{data.description.descr_2.texts[0]}</p>
                <p className="text-2">{data.description.descr_2.texts[1]}</p>
              </div>
              <div
                style={{ height: `${heightImage}px` }}
                className={styles.image_block}
              >
                <div ref={imageRef} className={styles.images_wrapper_full}>
                  <img src={data.description.descr_2.images} alt="img" />
                </div>
              </div>
            </div>
            <div className={styles.descr_3}>
              <div className={styles.descr}>
                <p className="text-2">{data.description.descr_3.texts}</p>
              </div>
              <div
                style={{ height: `${heightImage_2}px` }}
                className={styles.image_block}
              >
                <div
                  ref={imageRef_2}
                  className={clsx(
                    styles.images_wrapper_full,
                    styles.images_wrapper_padding,
                  )}
                >
                  <img src={data.description.descr_3.images} alt="img" />
                </div>
              </div>
            </div>
            <div className={styles.descr_4}>
              <div className={styles.descr}>
                <p className={clsx(styles.text_1, 'text-2')}>
                  {data.description.descr_4.texts}
                </p>
                <div className={styles.descr_list}>
                  <div className={styles.title_list}>
                    {data.description.descr_4.title}
                  </div>
                  <ul>
                    {data.description.descr_4.list.map((item) => {
                      return (
                        <li key={item} className={styles.list_item}>
                          <span></span>
                          {item}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <ul className={styles.images_wrapper}>
                {data.description.descr_4.images.map((item) => {
                  return (
                    <li key={item} className={styles.image}>
                      <img src={item} alt="img" />
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className={styles.descr_5}>
              <div className={styles.descr}>
                <p className={clsx(styles.text_1, 'text-2')}>
                  {data.description.descr_5.texts}
                </p>
                <div className={styles.descr_list}>
                  <div className={styles.title_list}>
                    {data.description.descr_5.title}
                  </div>
                  <ul>
                    {data.description.descr_5.list.map((item) => {
                      return (
                        <li key={item} className={styles.list_item}>
                          <span></span>
                          {item}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
            <Footer page="/about" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AboutDataViewer;
