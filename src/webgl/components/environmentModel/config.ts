import { IDecorateConfig } from '../../../utils/modelDecorator';

const ENV_CONFIG: { decoration: IDecorateConfig } = {
  decoration: [
    {
      mesh: ['any'],
      material_properties: {
        envMapIntensity: 0,
        lightMapIntensity: 1,
      },
    },
    {
      mesh: ['SM_Background_01'],

      textures: [
        {
          type: 'aoMap',
          url: '/models/scene/textures/background/1_ao.jpg',
        },
        {
          type: 'lightMap',
          url: '/models/scene/textures/background/1_diffusecopy.jpg',
        },
      ],
    },
    {
      mesh: ['SM_Wall_02', 'SM_Wall_03', 'SM_Wall_04'],

      textures: [
        {
          type: 'aoMap',
          url: '/models/scene/textures/01/ao_01.jpg',
        },
        {
          type: 'lightMap',
          url: '/models/scene/textures/01/lightMap_01.jpg',
        },
      ],
    },
    {
      mesh: ['SM_WaterBorder_01', 'SM_Ball_01', 'SM_Ball_02', 'SM_Ball_03', 'SM_Sand_02', 'SM_Sand_01', 'SM_Sand_03', 'SM_SoftBorder_01', 'SM_Chair_01', 'SM_Chair_02', 'SM_Chair_03'],

      textures: [
        {
          type: 'aoMap',
          url: '/models/scene/textures/02/Object059Corona_AOcopy.jpg',
        },
        {
          type: 'lightMap',
          url: '/models/scene/textures/02/Object059Corona_Beautycopy.jpg',
        },
      ],
    },
    {
      mesh: ['SM_Floor_01', 'SM_Floor_02', 'SM_Floor_03'],

      textures: [
        {
          type: 'aoMap',
          url: '/models/scene/textures/03/Line065Corona_AOcopy.jpg',
        },
        {
          type: 'lightMap',
          url: '/models/scene/textures/03/Line065Corona_Beautycopy.jpg',
        },
      ],
    },
    {
      mesh: ['SM_Floor_05', 'SM_Roof_01'],

      textures: [
        {
          type: 'aoMap',
          url: '/models/scene/textures/04/Object089Corona_Beautycopy.jpg',
        },
        {
          type: 'lightMap',
          url: '/models/scene/textures/04/Object089Corona_AOcopy.jpg',
        },
      ],
    },
    {
      mesh: ['SM_Pillars_01', 'SM_Swell_01', 'SM_Swell_02', 'SM_Swell_03', 'SM_Swell_04', 'SM_Swell_05', 'SM_SwellBorder_01'],

      textures: [
        {
          type: 'aoMap',
          url: '/models/scene/textures/05/Object091Corona_Beautycopy.jpg',
        },
        {
          type: 'lightMap',
          url: '/models/scene/textures/05/Object091Corona_AOcopy.jpg',
        },
      ],
    },
    {
      mesh: ['SM_Wall_01_01'],

      material_properties: {
        envMapIntensity: 0.9,
        lightMapIntensity: 0.1,
      },
      textures: [
        // {
        //   type: 'aoMap',
        //   url: '/models/scene/textures/ao_01.jpeg',
        // },
        // {
        //   type: 'lightMap',
        //   url: '/models/scene/textures/lightMap_01.jpeg',
        // },
      ],
    },
    {
      mesh: [
        'SM_Clips_01',
        'Line058',
        'SM_Water_01',
        'SM_Water_02',
        'Line052',
        'Line059',
        'SM_Water_01',
        'SM_Sand_03',
        'SM_Sand_02',
        'SM_Sand_01',
        // 'SM_Swell_01',
      ],
      mesh_properties: {
        visible: false,
      },
    },
    {
      mesh: [
        'SM_Sand_01',
      ],
      mesh_transform: {
        position: [0, 5, 0],
      },
    },
  ],
};

export default ENV_CONFIG;
