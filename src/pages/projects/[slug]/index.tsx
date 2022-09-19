import Head from 'next/head';
import type { GetServerSideProps, NextPage } from 'next';
import { useEffect, useRef } from 'react';
import clsx from 'clsx';
import styles from '../styles.module.scss';
import ProjectDataViewer from '../../../components/projectDataViewer';
import { addScroll } from '../../../utils/scrollGsap';
import ProjectPreview from '../../../components/projectPreview';
import { IProjectData, IProjectPreview } from '../../../types/project.types';
import { fetchProject, fetchRandomProject } from '../../../strapi/strapi.requests';

export const getServerSideProps: GetServerSideProps = async (a) => {
  const { slug } = a.query;

  try {
    const projectData = await fetchProject(slug as string);
    const nextProject = await fetchRandomProject(slug as string);

    return {
      props: {
        projectData: projectData.data,
        nextProject: nextProject.data,
      },
    };
  } catch (e) {
    return {
      notFound: true,
    }
  }
};

interface IProjectsPage {
  projectData: IProjectData,
  nextProject: IProjectPreview,
}

const ProjectsPage: NextPage<IProjectsPage> = ({ projectData, nextProject }) => {
  const _root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (_root.current) {
      addScroll(_root.current)
      _root.current.scrollTop = 0;
    }
  }, [_root, projectData])

  return (
    <div
      ref={_root}
      className={clsx(styles.project_wrapper, styles.project_viewer_wrapper)}
    >
      <Head>
        <title>
          {
            projectData.name
          }
        </title>
      </Head>

      <ProjectDataViewer data={projectData} />

      {
        nextProject
          ? (
            <ProjectPreview
              title={nextProject.name}
              imagePreview={nextProject.previewImage}
              slug={nextProject.slug}
            />
          )
          : null
      }
    </div>
  );
};
export default ProjectsPage;
