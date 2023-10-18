// Routes
export const HOME_ROUTE = '/';
export const ADS_ROUTE = '/ads';
export const NEWS_ROUTE = '/news';
export const ANALYTICS_ROUTE = '/analytics';
export const CONTACTS_ROUTE = '/contacts';
export const PROFILE_ROUTE = '/profile';
export const AUTH_ROUTE = '/auth';
export const LOGIN_ROUTE = '/auth/login';
export const SIGN_UP_ROUTE = '/auth/signup';
export const FORGOT_PASS_ROUTE = '/auth/forgotPass';
export const RESET_PASS_ROUTE = '/auth/resetPass';

// Breakpoints
const size = {
  desktop: '1920px',
  laptop: '1024px',
  laptopL: '1366px',
  tablet: '768px',
};

export const device = {
  desktop: `(min-width: ${size.desktop})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  tablet: `(min-width: ${size.tablet})`,
};

// User roles
export const userRoles = {
  admin: 'ADMIN',
  adsEditor: 'ADS_EDITOR',
  user: 'USER',
};

import ads from '../assets/ads.jpg';

export const pages = [
  { img: ads, route: ADS_ROUTE, title: 'Объявления' },
  // { route: NEWS_ROUTE, title: 'Новости' img: 'https://csotroitsk.ru/blog/wp-content/uploads/2022/10/77e59d2429bf4ba9cf47a8ddbbeb4f52.jpg'},
  // { route: CONTACTS_ROUTE, title: 'Контакты' 'https://csotroitsk.ru/blog/wp-content/uploads/2022/10/77e59d2429bf4ba9cf47a8ddbbeb4f52.jpg'},
];

export const myDomain = 'bank-zemel.ru';
