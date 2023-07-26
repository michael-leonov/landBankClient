import React from 'react';
import { useLocation } from 'react-router-dom';

import Header from './components/header';
import GlobalStyle from './global-styles';
import { useAppDispatch } from './redux/hooks';
import { resetFiltersAds } from './redux/slices/filtersAdsSlice';
import AppRoutes from './routes';
import { ADS_ROUTE } from './utils/consts';

function App() {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  if (pathname !== ADS_ROUTE) {
    dispatch(resetFiltersAds());
  }
  return (
    <>
      <GlobalStyle />
      <Header />
      <AppRoutes />
    </>
  );
}

export default App;
