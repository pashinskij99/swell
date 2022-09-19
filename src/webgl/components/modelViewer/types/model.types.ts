import { Vector3Tuple } from 'three';
import { IDecorateConfig } from '../../../../utils/modelDecorator';

export interface IMWModelConfig {
  url: string,
  scale?: Vector3Tuple,
  position?: Vector3Tuple,
  rotation?: Vector3Tuple,
  ext?: string,
}
