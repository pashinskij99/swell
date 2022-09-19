const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  PORTFOLIO: '/portfolio',
  PORTFOLIO_COLLECTION: '/portfolio/collection',
  CONTACTS: '/contact',
  PROJECTS: '/projects',
  PROJECT: '/projects/:slug',
};

// const ROUTES = {
//   HOME: {
//     path: '/',
//     name: 'Home',
//   },
//   ABOUT: {
//     path: '/about',
//     name: 'About us',
//   },
//   PORTFOLIO: {
//     path: '/portfolio',
//     name: ''
//   },
//   CONTACTS: '/contact',
//   PROJECTS: '/projects',
// };

const navigation = [
  { id: 1, title: 'Home', path: ROUTES.HOME },
  { id: 2, title: 'About us', path: ROUTES.ABOUT },
  { id: 3, title: 'Project', path: ROUTES.PROJECTS },
  { id: 4, title: '3D portfolio', path: ROUTES.PORTFOLIO_COLLECTION },
  { id: 5, title: 'Contacts', path: ROUTES.CONTACTS },
];

export { ROUTES, navigation };
