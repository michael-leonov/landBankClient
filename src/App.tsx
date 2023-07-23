import React from 'react';
import AppRoutes from './routes';
import Header from './components/header';
import GlobalStyle from './global-styles';
import Filters from './components/filters';
import { useLocation } from 'react-router-dom';
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
