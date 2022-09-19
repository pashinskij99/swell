import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { Footer } from '../footer';
import SceneViewer from '../../webgl/components/viewer';
import Header from '../header';
import styles from './styles.module.scss';
import { addCursor } from '../../utils/animateCursor';
import { Button } from '../button';
import { addActiveSelectorsForCursor } from '../../utils/addActiveSelectorsForCursor';
import Cursor from '../cursor';
import { ROUTES } from '../../constants/pages.constants';
import ModelsSliderUI from '../modelsSlider';

interface ILayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<ILayoutProps> = ({ children }) => {
  const { pathname } = useRouter()

  const renderFooter = () : React.ReactNode => {
    const routes = [ROUTES.CONTACTS]
    if (routes.includes(pathname)) return <Footer />
    return null
  }

  return (
    <div className={styles.root} id="smooth-wrapper">
      <div
        // id="scroll_container"
        className={styles.wrapper}
      >
        <div className={clsx(styles.scroll_container, 'scroll_container')}>
          <Header />
          <div
            className={styles.content}
            data-page={pathname}
          >
            { children }
          </div>
          {
            renderFooter()
          }
        </div>
      </div>
      <SceneViewer />
      <ModelsSliderUI />
    </div>
  );
};

export default Layout;
