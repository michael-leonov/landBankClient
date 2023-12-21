import AdMutationForm from '../../components/ad-mutation-form';
import AddNewsForm from '../../components/add-news-form';
import LandUserVerificationList from '../../components/admin-page-components/land-user-verfication-list';
import UsersList from '../../components/admin-page-components/users-list';
import AdsVerificationList from '../../components/ads-verification-list';
import ArticleList from '../../components/articles-list';
import FavoritiesAdsList from '../../components/favorities-ads-list';
import LandUserMutationRequestAdForm from '../../components/land-user-purchase-request-form';
import ProfileSettings from '../../components/profile-settings';
import UserAdsList from '../../components/user-ads-list';
import UserRequestAdsList from '../../components/user-request-ads-list';

// Profile Tabs
export const adsEditorLinks = [
  { content: <FavoritiesAdsList />, id: 1, link: '', title: 'Избранные объявления' },
  {
    content: <AdMutationForm ad={undefined} isEditStatusForm={false} />,
    id: 2,
    link: '',
    title: 'Разместить объявление',
  },
  { content: <UserAdsList />, id: 3, link: '', title: 'Мои объявления' },
  { content: <AddNewsForm />, id: 4, link: '', title: 'Разместить новость' },
  { content: <ArticleList section={undefined} />, id: 5, link: '', title: 'Все новости' },
  { content: <ProfileSettings />, id: 6, link: '', title: 'Настройки профиля' },
  { content: <AdsVerificationList />, id: 7, link: '', title: 'Верификация объявлений' },
];

export const adminLinks = [
  { content: <FavoritiesAdsList />, id: 1, link: '', title: 'Избранные объявления' },
  {
    content: <AdMutationForm ad={undefined} isEditStatusForm={false} />,
    id: 2,
    link: '',
    title: 'Разместить объявление',
  },
  { content: <UserAdsList />, id: 3, link: '', title: 'Мои объявления' },
  {
    content: <UsersList />,
    id: 4,
    link: '',
    title: 'Список пользователей',
  },
  { content: <AddNewsForm />, id: 5, link: '', title: 'Разместить новость' },
  { content: <ArticleList section={undefined} />, id: 6, link: '', title: 'Все новости' },
  { content: <ProfileSettings />, id: 7, link: '', title: 'Настройки профиля' },
  { content: <AdsVerificationList />, id: 8, link: '', title: 'Верификация объявлений' },
  {
    content: <LandUserVerificationList />,
    id: 9,
    link: '',
    title: 'Верификация крупных землепользователей',
  },
];

export const userLinks = [
  { content: <FavoritiesAdsList />, id: 1, link: '', title: 'Избранные объявления' },
  {
    content: <AdMutationForm ad={undefined} isEditStatusForm={false} />,
    id: 2,
    link: '',
    title: 'Разместить объявление',
  },
  { content: <UserAdsList />, id: 3, link: '', title: 'Мои объявления' },
  { content: <ProfileSettings />, id: 4, link: '', title: 'Настройки профиля' },
];

export const landUserLinks = [
  ...userLinks,
  {
    content: <LandUserMutationRequestAdForm isEditStatusForm={false} ad={undefined} />,
    id: 5,
    link: '',
    title: 'Запрос на покупку земельного участка',
  },
  {
    content: <UserRequestAdsList />,
    id: 6,
    link: '',
    title: 'Мои запросы на покупку земельного участка',
  },
];
