import React, { useState } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { ROUTES, navigation } from '../../constants/pages.constants';
import styles from './styles.module.scss';
import { Button } from '../button';
// import { BreadCrumbs } from '../bread_crumb';

interface IHeaderProps {
}

const socialList = [
  { id: 1, title: 'Facebook', path: '' },
  { id: 2, title: 'Instagram', path: '' },
  { id: 3, title: 'Linkedin', path: '' },
];

const darkRoutes = [
  ROUTES.ABOUT,
  ROUTES.PORTFOLIO_COLLECTION,
  ROUTES.PROJECT,
]

const Header: React.FC<IHeaderProps> = (props : IHeaderProps) => {
  const { pathname } = useRouter();

  const isHomePage = pathname === ROUTES.HOME;
  const isDark = darkRoutes.some((el) => el === pathname)
  const isLogoWhite = !isDark || pathname === ROUTES.ABOUT

  const textAnimation = {
    hidden: {
      y: -100,
      opacity: 0,
    },
    visible: (custom : number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: isHomePage ? custom * 0.2 : 0,
        type: 'spring',
        bounce: 0.4,
        duration: isHomePage ? 1.1 : 0,
      },
    }),
  }

  const [hamburgerActive, setHamburgerActive] = useState<boolean>(false);

  const hamburgerClick = () : void => {
    setHamburgerActive(!hamburgerActive);
  };

  return (
    <motion.div
      viewport={{ amount: 0.2, once: true }}
      initial="hidden"
      whileInView="visible"
      data-page={pathname}
      // TODO refractor css
      className={clsx(styles.root, 'header', isDark && styles.dark, isLogoWhite && styles.logoWhite)}
    >
      <div className={clsx(styles.container, 'container')}>
        <div className={styles.wrapper}>
          <motion.div
            variants={textAnimation}
            custom={1}
            className={styles.logo}
          >
            <Link href={ROUTES.HOME}>
              <a className={styles.logo_img}> </a>
            </Link>
          </motion.div>
          <div data-active={hamburgerActive} onClick={hamburgerClick} className={styles.hamburger}>
            <span>close</span>
            <div> </div>
            <div> </div>
            <div> </div>
          </div>
          <nav data-active={hamburgerActive} className={styles.links}>
            <ul className={styles.links_list}>
              {
                navigation.map(({ id, title, path }, i) => (
                  <motion.li
                    custom={i + 2}
                    variants={textAnimation}
                    data-aos="bounce"
                    key={id}
                  >
                    <Link href={path}>
                      <a
                        className={pathname === path ? styles.active : ''}
                      >
                        {title}
                      </a>
                    </Link>
                  </motion.li>
                ))
              }
            </ul>
            <motion.div
              variants={textAnimation}
              custom={6}
              className={styles.contact}
            >
              <Button
                type="contact"
                disabled={false}
                name="Contact"
                theme="light"
                href={ROUTES.CONTACTS}
                // path={ROUTES.CONTACTS}
              />
            </motion.div>
            <ul className={styles.social_links_list}>
              {
                socialList.map(({ id, title, path }) => (
                  <Link key={id} href={path}>
                    <a>
                      {title}
                    </a>
                  </Link>
                ))
              }
            </ul>
            <div className={styles.btn_theme_wrapper}>
              <Button type="theme" name="Light" disabled={false} theme="dark" />
            </div>
          </nav>
        </div>
        {/* {
          pathname === '/'
          || <BreadCrumbs path={['3D portfolio', 'Collection']} />
        } */}
      </div>
    </motion.div>
  );
};

export default Header;
