export interface IProjectScreen {
  title: string
  image: string
}

export interface IProjectRow {
  type: string
  title: string
}

export interface IProjectArticle {
  text: string
}

export interface IProjectData {
  title: string
  name: string
  description: string
  previewImage: string
  sliderImage: string
  images: string[]
  rows: IProjectRow[]
  screens: IProjectScreen[]
  article: IProjectArticle
  slug: string
  id: number
  strapiObject: unknown
}

export type IProjectSlide = Omit<IProjectData, 'rows' | 'screens' | 'article' | 'previewImage' | 'images'>
export type IProjectPreview = Omit<IProjectData, 'rows' | 'screens' | 'article' | 'images' | 'sliderImage'>
