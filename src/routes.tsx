import React from 'react';
import { Route, Routes } from 'react-router-dom';

import NotFound from './pages/404/NotFound';
import Ad from './pages/ad';
import Ads from './pages/ads';
import Home from './pages/home';
import { ADS_ROUTE, HOME_ROUTE } from './utils/consts';

function AppRoutes() {
  return (
    <Routes>
      <Route path={HOME_ROUTE} element={<Home />} />
      <Route path={ADS_ROUTE} element={<Ads />} />
      <Route path={`${ADS_ROUTE}/:id`} element={<Ad />} />

      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
