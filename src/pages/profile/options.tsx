import AddAdForm from '../../components/add-ad-form';
import UsersList from '../../components/admin-page-components/users-list';
import FavoritiesAdsList from '../../components/favorities-ads-list';

// Profile Tabs
export const AdsEditorLinks = [
  { content: <FavoritiesAdsList />, id: 1, link: '', title: 'Избранные объявления' },
  {
    content: <AddAdForm />,
    id: 2,
    link: '',
    title: 'Разместить объявление',
  },
  { content: <>Мои объявления</>, id: 3, link: '', title: 'Мои объявления' },
];

export const AdminLinks = [
  { content: <FavoritiesAdsList />, id: 1, link: '', title: 'Избранные объявления' },
  {
    content: <AddAdForm />,
    id: 2,
    link: '',
    title: 'Разместить объявление',
  },
  { content: <>Мои объявления</>, id: 3, link: '', title: 'Мои объявления' },
  { content: <UsersList />, id: 4, link: '', title: 'Список пользователей' },
];

export const UserLinks = [
  { content: <FavoritiesAdsList />, id: 1, link: '', title: 'Избранные объявления' },
];
