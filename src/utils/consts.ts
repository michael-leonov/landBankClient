// Routes
export const HOME_ROUTE = '/';
export const ADS_ROUTE = '/ads';
export const CALCULATOR_ROUTE = '/calculator';
export const REQUEST_ADS_ROUTE = '/purchase_ads';
export const NEWS_ROUTE = '/news';
export const ANALYTICS_ROUTE = '/analytics';
export const CONTACTS_ROUTE = '/contacts';
export const PROFILE_ROUTE = '/profile';
export const AUTH_ROUTE = '/auth';
export const LOGIN_ROUTE = `${AUTH_ROUTE}/login`;
export const SIGN_UP_ROUTE = `${AUTH_ROUTE}/signup`;
export const FORGOT_PASS_ROUTE = `${AUTH_ROUTE}/forgotPass`;
export const RESET_PASS_ROUTE = `${AUTH_ROUTE}/resetPass`;
export const VERIFY_EMAIL_ROUTE = `${AUTH_ROUTE}/verify_email`;
export const OTHER_ROUTE = '/other';
export const OTHER_LINKS_ROUTE = `${OTHER_ROUTE}/links`;
// export const STATISTICS_ROUTE = '/statistics';
// export const DEALS_ROUTE = '/deals';

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

// Роли пользователя
export const userRoles = {
  admin: 'ADMIN',
  adsEditor: 'ADS_EDITOR',
  landUser: 'LAND_USER',
  user: 'USER',
};

// Блоки на главной
export const pages = [
  {
    img: 'https://s0.rbk.ru/v6_top_pics/media/img/8/55/756535866233558.jpg',
    route: ADS_ROUTE,
    title: 'Объявления',
  },

  // {
  //   img: 'https://s0.rbk.ru/v6_top_pics/media/img/8/55/756535866233558.jpg',
  //   route: '/',
  //   title: 'Статистика',
  // },
  // { route: NEWS_ROUTE, title: 'Новости' img: 'https://csotroitsk.ru/blog/wp-content/uploads/2022/10/77e59d2429bf4ba9cf47a8ddbbeb4f52.jpg'},
  // { route: CONTACTS_ROUTE, title: 'Контакты' 'https://csotroitsk.ru/blog/wp-content/uploads/2022/10/77e59d2429bf4ba9cf47a8ddbbeb4f52.jpg'},
];

export const sidebarMenuPages = [
  { route: '/ads', title: 'Объявления' },
  { route: '/', title: 'Статистика' },
  { route: '/analytics', title: 'Аналитика' },
  { route: '/', title: 'Сделки слияния и поглощения' },
  { route: '/news', title: 'Новости' },
  { route: '/other', title: 'Прочее' },
];

// Константы
export const myDomain = 'bank-zemel.ru';
export const rosreestrBaseUrl = 'https://pkk.rosreestr.ru/api';

// Опции объявления
export const rents = [
  { title: 'Собственность', value: 'false' },
  { title: 'Аренда', value: 'true' },
];

export const landUse = [
  { title: 'ИЖС', value: 'izhs' },
  { title: 'ЛПХ', value: 'lph' },
  { title: 'ДНП', value: 'suburban_construction' },
  { title: 'СНТ', value: 'gardening' },
  { title: 'Фермерское хозяйство', value: 'farming' },
];

export const landCategories = [
  { title: 'Земли населенных пунктов', value: 'urban' },
  { title: 'Земли с/х назначения', value: 'agricultural' },
  { title: 'Земли промназначения', value: 'industrial' },
];

export const dates = [
  { title: 'За 3 дня', value: '3' },
  { title: 'За 7 дней', value: '7' },
  { title: 'За 30 дней', value: '30' },
];

export const typeOfUse = [
  { title: 'Пашня', value: 'arable' },
  { title: 'Пастбище', value: 'grassland' },
  { title: 'Сенокос', value: 'hayfield' },
];

export const irrigations = [
  { title: 'Есть', value: 'true' },
  { title: 'Отсутствует', value: 'false' },
];

export const survey = [
  { title: 'Проводилось', value: 'true' },
  { title: 'Не проводилось', value: 'false' },
];

export const noMatterCategory = { title: 'Не имеет значения', value: 'none' };

// Статусы объявления
export const announcementStatuses = [
  { title: 'Активные', value: 'active' },
  { title: 'Ожидают подтверждения', value: 'await' },
  { title: 'Отклоненные', value: 'rejected' },
  { title: 'Снятые с публикации', value: 'inactive' },
];
