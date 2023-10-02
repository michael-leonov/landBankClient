import AddAdForm from '../../components/add-ad-form';
import UsersList from '../../components/admin-page-components/users-list';
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
  { content: <ProfileSettings />, id: 4, link: '', title: 'Настройки профиля' },
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
  { content: <ProfileSettings />, id: 5, link: '', title: 'Настройки профиля' },
];

export const UserLinks = [
  { content: <FavoritiesAdsList />, id: 1, link: '', title: 'Избранные объявления' },
  { content: <ProfileSettings />, id: 2, link: '', title: 'Настройки профиля' },
];
