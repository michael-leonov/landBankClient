import AddAdForm from '../../components/add-ad-form';
import AddNewsForm from '../../components/add-news-form';
import UsersList from '../../components/admin-page-components/users-list';
import ArticleList from '../../components/articles-list';
import FavoritiesAdsList from '../../components/favorities-ads-list';
import ProfileSettings from '../../components/profile-settings';
import UserAdsList from '../../components/user-ads-list';

// Profile Tabs
export const AdsEditorLinks = [
  { content: <FavoritiesAdsList />, id: 1, link: '', title: 'Избранные объявления' },
  {
    content: <AddAdForm />,
    id: 2,
    link: '',
    title: 'Разместить объявление',
  },
  { content: <UserAdsList />, id: 3, link: '', title: 'Мои объявления' },
  { content: <AddNewsForm />, id: 4, link: '', title: 'Разместить новость' },
  { content: <ArticleList section={undefined} />, id: 5, link: '', title: 'Все новости' },
  { content: <ProfileSettings />, id: 6, link: '', title: 'Настройки профиля' },
];

export const AdminLinks = [
  { content: <FavoritiesAdsList />, id: 1, link: '', title: 'Избранные объявления' },
  {
    content: <AddAdForm />,
    id: 2,
    link: '',
    title: 'Разместить объявление',
  },
  { content: <UserAdsList />, id: 3, link: '', title: 'Мои объявления' },
  { content: <UsersList />, id: 4, link: '', title: 'Список пользователей' },
  { content: <AddNewsForm />, id: 5, link: '', title: 'Разместить новость' },
  { content: <ArticleList section={undefined} />, id: 7, link: '', title: 'Все новости' },
  { content: <ProfileSettings />, id: 6, link: '', title: 'Настройки профиля' },
];

export const UserLinks = [
  { content: <FavoritiesAdsList />, id: 1, link: '', title: 'Избранные объявления' },
  { content: <ProfileSettings />, id: 2, link: '', title: 'Настройки профиля' },
];
