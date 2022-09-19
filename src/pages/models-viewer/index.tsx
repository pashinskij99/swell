import Head from 'next/head';
import type { GetServerSideProps, NextPage } from 'next';
import HomeDataViewer from '../../components/homeDataViewer';
import ModelsViewerComp from '../../components/modelsViewerComp';
import { TEST_WMMODELS } from '../../constants/dummyData.constants';

export const getServerSideProps: GetServerSideProps = async (a) => {
  return { props: { item: TEST_WMMODELS.find((el) => el.slug === a.query.slug) } };
};

interface IModelsViewerPageProps {
  item: any
}

const ModelsViewerPage: NextPage<IModelsViewerPageProps> = ({ item }) => {
  return (
    <ModelsViewerComp item={item} />
  );
};
export default ModelsViewerPage;
