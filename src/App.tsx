import React from 'react';
import { useLocation } from 'react-router-dom';

import Filters from './components/filters';
import Header from './components/header';
import GlobalStyle from './global-styles';
import AppRoutes from './routes';
import { ADS_ROUTE, HOME_ROUTE } from './utils/consts';

function App() {
  const { pathname } = useLocation();

  return (
    <>
      <GlobalStyle />
      <Header />
      {(pathname === HOME_ROUTE || pathname === ADS_ROUTE) && <Filters />}
      <AppRoutes />
    </>
  );
}

export default App;
