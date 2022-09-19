/* eslint-disable @typescript-eslint/no-explicit-any */
import qs from 'qs'
import axios from 'axios'
import {
 STRAPI_HOST, STRAPI_MODELS, STRAPI_MODELS_CATEGORIES, STRAPI_PROJECTS, STRAPI_PROJECTS_SLIDER,
} from './strapi.consants'
import { IProjectData, IProjectScreen, IProjectSlide } from '../types/project.types';
import { IModelData, IModelCategory } from '../types/models.types';

const request = async (url: string) => {
  const result = await axios.get(url);

  return result.data;
}

interface StrapiEntry {
  attributes: Record<string, any>,
  id: number
}

interface StrapiPaginationInput {
  page: number,
  pageSize: number,
}

export interface StrapiPagination {
  page: number,
  pageSize: number,
  pageCount: number
  total: number
}

type StrapiResponse = {
  data: StrapiEntry,
  meta: {
    pagination: StrapiPagination
  }
}

type StrapiResponseArray = {
  data: StrapiEntry[],
  meta: {
    pagination: StrapiPagination,
  }
}

const fetchEntry = async (
  type: string,
  id?: number,
  q: Record<string, any> = {},
): Promise<StrapiResponse> => {
  const query = qs.stringify({
    populate: '*',
    ...q,
  })

  const result = await request(`${STRAPI_HOST}/${type}/${id || ''}?${query}`)

  return result
}

const fetchEntryBySlug = async (
  type: string,
  slug: string,
  q: Record<string, any> = {},
): Promise<StrapiResponseArray> => {
  const query = qs.stringify({
    filters: {
      slug,
    },
    populate: '*',
    ...q,
  })

  const result = await request(`${STRAPI_HOST}/${type}?${query}`)

  return result
}

const fetchEntriesByType = async (
  type: string,
  q: Record<string, any> = {},
): Promise<StrapiResponseArray> => {
  const query = qs.stringify(q)

  const result = await request(`${STRAPI_HOST}/${type}?${query}`)

  return result
}

const fetchProjects = async () => {
  const populate = {
    images: {
      populate: '*',
    },
  }

  const result = await fetchEntriesByType(STRAPI_PROJECTS, populate);

  if (result.data.length === 0) {
    throw new Error('No projects found')
  }

  return result;
}

const transformProjectScreen = (data: Record<string, any>): IProjectScreen => {
  return {
    title: data?.title || '',
    image: data.image?.data?.attributes?.url || '',
  }
}

const transformProjectArticle = (data: Record<string, string>) => {
  return {
    text: data?.text || '',
  }
}
const transformProjectRow = (data: Record<string, string>) => {
  return {
    type: data?.type || '',
    title: data?.title || '',
  }
}

const transformProject = (data: StrapiEntry): IProjectData => {
  const res: IProjectData = {
    name: data.attributes.name,
    title: data.attributes.title,
    slug: data.attributes.slug,
    id: data.id,
    previewImage: data.attributes.preview?.data.attributes.url || '',
    sliderImage: data.attributes.sliderImage?.data?.attributes?.url || '',
    screens: data.attributes.screens?.map(transformProjectScreen) || [],
    images: data.attributes.images?.data?.map((image: any) => image.attributes.large.url) || [],
    description: data.attributes.description,
    article: transformProjectArticle(data.attributes.article),
    rows: data.attributes.rows?.map(transformProjectRow) || '',
    strapiObject: data,
  }

  return res
}

const fetchProjectsSlides = async () => {
  const query = {
    populate: {
      items: {
        populate: {
          sliderImage: {
            populate: '*',
          },
        },
      },
    },
  }

  const slidesList = await fetchEntry(STRAPI_PROJECTS_SLIDER, undefined, query);

  const results = slidesList.data.attributes.items.data.map(transformProject) as IProjectSlide

  return { meta: slidesList.meta, data: results }
}

const fetchProject = async (slug: string) => {
  const query = {
    populate: {
      preview: {
        populate: '*',
      },
      sliderImage: {
        populate: '*',
      },
      screens: {
        populate: '*',
      },
      images: {
        populate: '*',
      },
      rows: {
        populate: '*',
      },
      article: {
        populate: '*',
      },
    },
  }

  const res = await fetchEntryBySlug(STRAPI_PROJECTS, slug, query);

  const el = res.data[0]

  if (!el) {
    throw new Error(`Project not found, slug: ${slug}`)
  }

  const result = transformProject(el) as IProjectData

  return { meta: res.meta, data: result }
}

const fetchRandomProject = async (excludeSlug: string) => {
  const query = {
    populate: {
      preview: {
        populate: '*',
      },
    },
    filters: {
      slug: {
        $ne: excludeSlug,
      },
    },
    pagination: {
      start: 0,
      limit: 10,
    },
  }

  const res = await fetchEntriesByType(STRAPI_PROJECTS, query);

  const el = res.data[0]

  if (!el) {
    throw new Error('Random project not found')
  }

  const result = transformProject(el) as IProjectSlide;

  return { meta: res.meta, data: result }
}

const transformThreeModel = (data: StrapiEntry) => {
  try {
    const object: IModelData = {
      description: data.attributes.description,
      name: data.attributes.name,
      id: data.id,
      slug: data.attributes.slug,
      title: data.attributes.title,
      preview: data.attributes.preview.data.attributes.url,
      categories: data.attributes.categories?.data?.map((el: Record<'id', number>) => el.id) || [],
      config: {
        viewerConfig: {
          background: data.attributes.model.backgroundStyle || undefined,
          environment: data.attributes.model.environment || null,
        },
        modelConfig: {
          ...(data?.attributes?.model?.config || {}),
          url: data.attributes.model.object.data.attributes.url,
        },
      },
      strapiObj: data,
    }

    return object;
  } catch (e) {
    console.error('Error transforming model', e, data)
    return null
  }
}

const fetchThreeModels = async (
  pagination: StrapiPaginationInput = { page: 0, pageSize: 10 },
  categories: number[] = [],
) => {
  const query: Record<string, any> = {
    pagination,
    filters: {
    },
    populate: {
      preview: '*',
      categories: {
        populate: '*',
      },
      model: {
        populate: '*',
      },
    },
  }

  if (categories.length) {
    query.filters.categories = {
      id: {
        $in: categories,
      },
    }
  }

  const entries = await fetchEntriesByType(STRAPI_MODELS, query)
  const results = entries.data.map(transformThreeModel).filter((i) => i) as IModelData[];

  return { meta: entries.meta, data: results };
}

const transformThreeModelCategory = (data: StrapiEntry) => {
  const object: IModelCategory = {
    id: data.id,
    name: data.attributes.name,
    count: data.attributes.three_models.data.length,
  }

  return object;
}

const fetchThreeModelsCategories = async () => {
  const query = {
    populate: {
      three_models: {
        field: 'slug',
      },
    },
  }

  const entries = await fetchEntriesByType(STRAPI_MODELS_CATEGORIES, query);

  const results = entries.data.map(transformThreeModelCategory);

  return { meta: entries.meta, data: results };
}

export {
  fetchProjects,
  fetchProjectsSlides,
  fetchProject,
  fetchRandomProject,
  fetchThreeModels,
  fetchThreeModelsCategories,
}
