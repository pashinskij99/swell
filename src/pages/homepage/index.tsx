import { useEffect } from 'react';
import Head from 'next/head';
import type { NextPage } from 'next';
import { addCursor } from '../../utils/animateCursor';
import HomeDataViewer from '../../components/homeDataViewer';
import { addScroll } from '../../utils/scrollGsap';
import { usePageIsHidden } from '../../hooks/isPageHidden';
import { ROUTES } from '../../constants/pages.constants';

interface IHomePage {}

const Homepage: NextPage<IHomePage> = (props : IHomePage) => {
  const isHidden = usePageIsHidden(ROUTES.HOME)

  useEffect(() => {
    // addScroll()
  }, [])
  return (
    <div>
      <Head>
        <title> Home </title>
      </Head>
      <HomeDataViewer isHidden={isHidden} />
    </div>
  );
};
export default Homepage;
