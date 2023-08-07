/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useLocation } from 'react-router-dom';

import Header from './components/header';
import GlobalStyle from './global-styles';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { useCheckQuery } from './redux/services/auth/authApi';
import { resetFiltersAds } from './redux/slices/filtersAdsSlice';
import { logout, selectUser, setUser } from './redux/slices/userSlice';
import AppRoutes from './routes';
import { ADS_ROUTE } from './utils/consts';

function App() {
  const { pathname } = useLocation();

  const dispatch = useAppDispatch();

  const user = JSON.parse(localStorage.getItem('user') || '{}');

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

    // if (isError) {
    //   dispatch(logout());
    // }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (pathname !== ADS_ROUTE) {
      dispatch(resetFiltersAds());
    }
  }, [pathname]);

  return (
    <>
      <GlobalStyle />
      <Header />
      <AppRoutes />
    </>
  );
}
export default App;
