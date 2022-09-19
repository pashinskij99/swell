import { IMWConfig, IMWModelConfig } from '../webgl/components/modelViewer';

export interface IModelCategory {
  id: number,
  name: string,
  count: number,
}
export interface IModelCategoryWithActive extends IModelCategory {
  active?: boolean
}

export interface IModelDataConfig {
  viewerConfig: IMWConfig,
  modelConfig: IMWModelConfig,
}

export interface IModelData {
  id: number,
  description: string,
  config: IModelDataConfig,
  name: string,
  preview: string,
  slug: string,
  title: string,
  categories: number[],
  strapiObj: unknown,
}

export interface IFilter {
  id: number,
  name: string,
  amount: number,
  isActive: boolean
}

export interface IModelsSliderItem {
  title: string;
  description: string;
}
