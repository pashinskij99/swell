import { useEffect } from 'react';
import Head from 'next/head';
import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import ContactDataViewer from '../../components/contactDataViewer';
import { TEST_CONTACTS } from '../../constants/dummyData.constants';
import { IContacts } from '../../types/common.types';
import { addScroll } from '../../utils/scrollGsap';
import { useViewerState } from '../../store/reducers/viewer.reducer';
import { ROUTES } from '../../constants/pages.constants';
import { usePageIsHidden } from '../../hooks/isPageHidden';

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      data: TEST_CONTACTS,
    },
  };
};

interface IContactUsPage {
  data: IContacts[]
}

const ContactUsPage: NextPage<IContactUsPage> = (props : IContactUsPage) => {
  const { data } = props

  // TODO check this
  const isHidden = usePageIsHidden(ROUTES.CONTACTS)

  useEffect(() => {
    // addScroll()
  }, [])

  return (
    <div>
      <Head>
        <title> Contact </title>
      </Head>
      <ContactDataViewer isHidden={isHidden} data={data} />
    </div>
  );
};
export default ContactUsPage;
