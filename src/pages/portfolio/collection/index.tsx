/* eslint-disable no-param-reassign */
import type { GetServerSideProps, NextPage } from 'next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import Head from 'next/head';
import { IModelData, IModelCategoryWithActive } from '../../../types/models.types';
import { addScroll } from '../../../utils/scrollGsap';
import styles from './styles.module.scss';
import { Filter as CategoriesFilter } from '../../../components/filter';
import PortfolioDataViewer from '../../../components/portfolioDataViewer';
import PortfolioNavigate from '../../../components/portfolioNavigate';
import { fetchThreeModels, fetchThreeModelsCategories, StrapiPagination } from '../../../strapi/strapi.requests';

const queryToCategories = (query: ParsedUrlQuery) => (query.categories as string || '').split(',').filter((i) => i).map(Number)

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { page = 1 } = query

  const selectedCategories = queryToCategories(query)
  const modelsData = await fetchThreeModels(
    { page: Number(page), pageSize: 2 },
    selectedCategories,
  )
  const categories = (await fetchThreeModelsCategories()).data as IModelCategoryWithActive[]

  categories.forEach((el) => {
    el.active = selectedCategories.includes(el.id)
  })

  return {
    props: {
      modelsData: modelsData.data,
      categories,
      page,
      pagination: modelsData.meta.pagination,
    },
  };
};

interface IPortfolioPage {
  modelsData: IModelData[],
  categories: IModelCategoryWithActive[],
  pagination: StrapiPagination,
}

const PortfolioPage: NextPage<IPortfolioPage> = ({
  modelsData,
  categories,
  pagination,
}) => {
  const { query, pathname, push } = useRouter()

  const changeCategories = (catList: number[]) => {
    push({
      pathname,
      query: {
        ...query,
        categories: catList.join(','),
      },
    })
  }

  const setActivePage = (page: number) => {
    push({
      pathname,
      query: {
        ...query,
        page,
      },
    })
  }

  const updateCategories = (catList: number[]) => {
    changeCategories(catList)
  }

  return (
    <div className={styles.wrapper}>
      <Head>
        <title>
          Models page:
          {`  ${pagination.page}`}
        </title>
      </Head>

      <CategoriesFilter
        updateCategories={updateCategories}
        categories={categories}
      />
      <PortfolioDataViewer data={modelsData} />

      <PortfolioNavigate onActiveChange={setActivePage} pagination={pagination} />
    </div>
  );
};
export default PortfolioPage;
