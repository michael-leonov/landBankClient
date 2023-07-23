// Routes
export const HOME_ROUTE = '/';
export const ADS_ROUTE = '/ads';
export const NEWS_ROUTE = '/news';
export const CONTACTS_ROUTE = '/contacts';
export const LOGIN_ROUTE = '/login';

// Breakpoints
const size = {
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1366px',
  desktop: '1920px',
};

export const device = {
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
};
