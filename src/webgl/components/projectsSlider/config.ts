import { Vector3 } from '@react-three/fiber'
import { MathUtils } from 'three'

export enum SLIDE_POSITION {
  LEFT,
  CENTER,
  RIGHT,
  HIDDEN,
}

export const PROJECTS_SLIDER_CONFIG = {
  position: [-5.326, 14.485, -35.346] as Vector3,

  position_params: {
    [SLIDE_POSITION.LEFT]: {
      pos: [-19.150, 0, -10.479],
      rot: [0, MathUtils.degToRad(45), 0],
    },
    [SLIDE_POSITION.CENTER]: {
      pos: [0, 0, 0],
      rot: [0, 0, 0],
    },
    [SLIDE_POSITION.RIGHT]: {
      pos: [19.967, 0, -8.221],
      rot: [0, MathUtils.degToRad(-54.86), 0],
    },
    [SLIDE_POSITION.HIDDEN]: {
      pos: [0, 0, -14],
      rot: [0, 0, 0],
    },
  },

  clips: [
    [7.889, 9.663, -0.032] as Vector3,
    [-7.882, 9.663, -0.032] as Vector3,
    [7.889, 15.035, -0.032] as Vector3,
    [-7.882, 15.035, -0.032] as Vector3,
  ],

  ropes: [
    [7.889, 12.424, -0.032] as Vector3,
    [-7.889, 12.424, -0.032] as Vector3,
  ],
}
