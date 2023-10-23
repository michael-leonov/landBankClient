import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';

import Header from './components/header';
import GlobalStyle from './global-styles';
import { useAppDispatch } from './redux/hooks';
import { useCheckQuery } from './redux/services/auth/authApi';
import { logout, setUser } from './redux/slices/userSlice';
import AppRoutes from './routes';

function App() {
  const dispatch = useAppDispatch();

  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const [cookies] = useCookies(['token']);

  const { data, isError, isSuccess } = useCheckQuery(cookies.token);

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        setUser({
          isAuth: true,
          token: data.token,
          userInfo: user,
        }),
      );
    }

    if (isError) {
      dispatch(logout());
    }
  }, [isSuccess, isError]);

  return (
    <>
      <GlobalStyle />
      <Header />
      <AppRoutes />
    </>
  );
}
export default App;
