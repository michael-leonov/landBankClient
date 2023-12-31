// Routes
export const HOME_ROUTE = '/';
export const ADS_ROUTE = '/ads';
export const NEWS_ROUTE = '/news';
export const CONTACTS_ROUTE = '/contacts';
export const LOGIN_ROUTE = '/login';
export const SIGN_UP_ROUTE = '/signup';
export const PROFILE_ROUTE = '/profile';

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
