import { useEffect, useRef } from 'react';
import Head from 'next/head';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import AboutDataViewer from '../../components/aboutDataViewer';
import { TEST_ABOUT } from '../../constants/dummyData.constants';
import { IAbout } from '../../types/common.types';
import styles from './styles.module.scss';
import { usePageIsHidden } from '../../hooks/isPageHidden';
import { ROUTES } from '../../constants/pages.constants';
import { addScroll } from '../../utils/scrollGsap';

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      data: TEST_ABOUT,
    },
  };
};

interface IAboutUsPage {
  data: IAbout
}

const AboutUsPage: NextPage<IAboutUsPage> = ({ data }) => {
  const RootRef = useRef(null)
  const isHidden = usePageIsHidden(ROUTES.ABOUT)

  gsap.registerPlugin(ScrollToPlugin, ScrollTrigger)

  useEffect(() => {
    addScroll(ScrollTrigger, ScrollToPlugin)
  //   gsapScroll()
  }, [])

  return (
    <div ref={RootRef} className={styles.root} id="scroll_container">
      <Head>
        <title> About us </title>
      </Head>
      <div
        className={styles.scroll_container}
      >
        <AboutDataViewer data={data} isHidden={isHidden} />
      </div>
    </div>
  );
};
export default AboutUsPage;
