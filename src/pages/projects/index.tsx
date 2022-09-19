import Head from 'next/head';
import { useWindowSize } from 'react-use';
import type { GetServerSideProps, NextPage } from 'next';
import { GetStaticProps } from 'next';
import { useEffect } from 'react';
import { useProjectSlider } from '../../store/reducers/projectSlider';
import ProjectSliderUI from '../../components/projectSlider';
import styles from './styles.module.scss';
import { fetchProject, fetchProjectsSlides } from '../../strapi/strapi.requests';
import { IProjectSlide } from '../../types/project.types';

export const getServerSideProps: GetServerSideProps = async () => {
  const projects = await fetchProjectsSlides();
  return { props: { projectsSlides: projects.data } };
};

interface IProjectsPage {
  projectsSlides: IProjectSlide[],
}

const ProjectsPage: NextPage<IProjectsPage> = ({ projectsSlides }) => {
  const { width } = useWindowSize()

  const { setItems } = useProjectSlider();

  useEffect(() => {
    setItems(projectsSlides);
  }, [projectsSlides, setItems, width]);

  return (
    <div className={styles.project_wrapper}>
      <Head>
        <title> Projects </title>
      </Head>

      <ProjectSliderUI />
    </div>
  );
};
export default ProjectsPage;
