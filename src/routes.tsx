import React from 'react';
import { Route, Routes } from 'react-router-dom';

import ProtectedRoute from './components/protected-route';
import NotFound from './pages/404/NotFound';
import Ad from './pages/ad';
import Ads from './pages/ads';
import Auth from './pages/auth';
import Home from './pages/home';
import Profile from './pages/profile';
import { ADS_ROUTE, HOME_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE, SIGN_UP_ROUTE } from './utils/consts';

function AppRoutes() {
  return (
    <Routes>
      <Route path={HOME_ROUTE} element={<Home />} />

      <Route path={ADS_ROUTE} element={<Ads />} />
      <Route path={`${ADS_ROUTE}/:id`} element={<Ad />} />

      <Route path={LOGIN_ROUTE} element={<Auth />} />
      <Route path={SIGN_UP_ROUTE} element={<Auth />} />

      <Route element={<ProtectedRoute />}>
        <Route path={`${PROFILE_ROUTE}/:id`} element={<Profile />} />
      </Route>

      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
