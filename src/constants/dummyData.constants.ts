import { IFilter, IModelData, IModelsSliderItem } from '../types/models.types';
import {
  INavigatePopup,
  IContacts,
  IHome,
  IAbout,
  IAnimation,
} from '../types/common.types';
import { IMWConfig, IMWModelConfig } from '../webgl/components/modelViewer';

export const TEST_CONTACTS: IContacts[] = [
  {
    title: 'Send a request',
    descr: 'We will get touch with you as soon as possible',
    form_names: ['Name', 'Email', 'Massage'],
    form_examples: ['Example: Max', 'Example: swell@gmail.com', 'Your massage'],
    button_name: 'Send message',
    types_input: ['text', 'email', 'text'],
  },
];

export const TEST_ABOUT: IAbout = {
  title: 'About us',
  description: {
    descr_1: {
      texts: [
        'Hello there! I founded Swell Interactive in 2016 after 10 years of experience in marketing, communications, web design, and 3D.',
        'I will work with each client to develop an individual solution to your digital needs, so that you can say'
          + ' “Swell made it!”',
        "Outside of Swell, I spend my time cheering on my alma mater, the University of Virginia 'Hoos, and going to"
          + ' the beach with my wife, daughter, and two goofy golden retrievers.',
      ],
      images: ['/images/test_about1.jpg', '/images/test_about2.jpg'],
    },
    descr_2: {
      texts: [
        'Hello there! I founded Swell Interactive in 2016 after 10 years of experience in marketing, communications, web design, and 3D.',
        'I will work with each client to develop an individual solution to your digital needs, so that you can say “Swell made it!”',
      ],
      images: '/images/test_about_2.jpg',
    },
    descr_3: {
      texts:
        'Hello there! I founded Swell Interactive in 2016 after 10 years of experience in marketing, communications, web design, and 3D. Hello there! I founded Swell Interactive in 2016 after 10 years of experience in marketing, communications, web design, and 3D.',
      images: '/images/test_about3.jpg',
    },
    descr_4: {
      texts:
        'The website is one of the most important assets in creating your brand today. It labels what you represent and what you can do for your audience. We build all of our web based products with usability and design in mind.',
      title: 'TYPES OF SERVICES:',
      list: [
        'Websites',
        'Web applications',
        'WebGL/three.js',
        'AR/VR apps',
        'Unity',
        'iOS and Android Apps',
        'Dashboards',
        'Full Stack',
        'E-commerce shops',
        '3D websites',
        'More',
      ],
      images: ['/images/test_about4_1.jpg', '/images/test_about4_2.jpg'],
    },
    descr_5: {
      texts:
        "Design is not only about making fancy boxes and cool color compositions, it’s about creating a visual guideline for the user to easily navigate through your website, app, flyer, social media and your brand. Your designs should tell a story and create a feeling and that's what we do!",
      title: 'TYPES OF SERVICES:',
      list: [
        'Graphics',
        'Brand Strategy',
        'Brand Identity, Logo & Guidelines',
        'Brand Personality',
        'Copywriting',
        'Naming',
        'Illustration',
        'Front End Design',
      ],
      images: ['/images/test_about1.jpg', '/images/test_about2.jpg'],
    },
  },
};

// export const TEST_HOME: IHome[] = [
//   {
//     title: 'SWELL INTERACTIVE',
//     description: 'marketing, communications, web design, and 3D.',
//     btn_name: 'Start',
//     social_link: ['Facebook', 'Instagram', 'Linkedin'],
//   },
// ]

export const TEST_FILTER_CATEGORY: IFilter[] = [
  {
    id: 0,
    name: 'Characters',
    amount: 10,
    isActive: false,
  },
  {
    id: 1,
    name: 'Arc',
    amount: 129,
    isActive: false,
  },
  {
    id: 2,
    name: 'Alec',
    amount: 129,
    isActive: false,
  },
  {
    id: 3,
    name: 'Char',
    amount: 10,
    isActive: false,
  },
  {
    id: 4,
    name: 'Charac',
    amount: 10,
    isActive: false,
  },
  {
    id: 5,
    name: 'Charact',
    amount: 10,
    isActive: false,
  },
  {
    id: 6,
    name: 'Cha',
    amount: 10,
    isActive: false,
  },
  {
    id: 7,
    name: 'Character1',
    amount: 10,
    isActive: false,
  },
  {
    id: 8,
    name: 'Character2',
    amount: 10,
    isActive: false,
  },
  {
    id: 9,
    name: 'Character3',
    amount: 10,
    isActive: false,
  },
];

export const TEST_MODELS_SLIDES: IModelsSliderItem[] = [
  {
    title: 'Some picture',
    description: '0',
  },
  {
    title: 'Some picture',
    description: '0',
  },
  {
    title: 'Some picture',
    description: '0',
  },
  {
    title: 'Some picture',
    description: '0',
  },
  {
    title: 'Some picture',
    description: '0',
  },
  {
    title: 'Some picture',
    description: '0',
  },
  {
    title: 'Some picture',
    description: '0',
  },
];

export const TEST_WMMODELS: {
  model: IMWModelConfig;
  scene: IMWConfig;
  slug: string;
}[] = [
  {
    model: {
      url: '/models/potfolio/TrippLite.glb',
      rotation: [0, Math.PI / 1.3, 0],
    },
    slug: 'trip',
    scene: {
      environment: 'city',
      background: 'radial-gradient(circle, #555a5c 5%, #0f2438 75%)',
    },
  },
  {
    slug: 'arduino',
    model: {
      url: '/models/potfolio/Arduino_Nano_Click_Shield.glb',
      scale: [10, 10, 10],
      rotation: [Math.PI / 2, 0, 0],
    },
    scene: {
      environment: 'lobby',
      background: 'radial-gradient(circle, #6c3333 5%, #341212 75%)',
    },
  },
  {
    slug: 'atlants',
    model: {
      url: '/models/potfolio/atlants_01.glb',
    },
    scene: {
      background: 'radial-gradient(circle, #434343 5%, #000000 75%)',
    },
  },
  {
    slug: 'vboy',
    model: {
      url: '/models/potfolio/VBoy-machine-transformed.glb',
    },
    scene: {
      environment: 'city',
      background: 'radial-gradient(circle, #832840 5%, #291d31 75%)',
    },
  },
];
