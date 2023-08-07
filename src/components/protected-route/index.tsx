import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from '../../redux/hooks';
import { selectUser } from '../../redux/slices/userSlice';
import { LOGIN_ROUTE } from '../../utils/consts';
import RedirectProps from './interface';

const ProtectedRoute = ({ redirectPath = LOGIN_ROUTE }: RedirectProps) => {
  const { isAuth } = useAppSelector(selectUser);

  if (!isAuth) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
