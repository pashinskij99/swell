import type { NextPage } from 'next';
import { useEffect } from 'react';
import { addScroll } from '../../utils/scrollGsap';

interface IPortfolioPage {
}

const PortfolioPage: NextPage<IPortfolioPage> = () => {
  useEffect(() => {
    // addScroll()
  }, [])

  return null
  // return (
  //   <div className={styles.wrapper}>
  //   </div>
  // );
};
export default PortfolioPage;
