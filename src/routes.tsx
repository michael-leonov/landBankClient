import React from 'react';
import { Route, Routes } from 'react-router-dom';

import AuthForm from './components/auth-form';
import ForgotPassForm from './components/forgot-pass-form';
import UsefulLinks from './components/other-page-components/useful-links';
import ProtectedRoute from './components/protected-route';
import ResetPassForm from './components/reset-pass-form';
import VerifyEmail from './components/verify_email';
import NotFound from './pages/404/NotFound';
import Ad from './pages/ad';
import Ads from './pages/ads';
import Analytics from './pages/analytics';
import Article from './pages/article';
import Auth from './pages/auth';
import Home from './pages/home';
import News from './pages/news';
import Other from './pages/other';
import Profile from './pages/profile';
import RequestAds from './pages/request_ads';
import {
  ADS_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  PROFILE_ROUTE,
  SIGN_UP_ROUTE,
  FORGOT_PASS_ROUTE,
  RESET_PASS_ROUTE,
  AUTH_ROUTE,
  NEWS_ROUTE,
  ANALYTICS_ROUTE,
  VERIFY_EMAIL_ROUTE,
  OTHER_ROUTE,
  OTHER_LINKS_ROUTE,
  REQUEST_ADS_ROUTE,
} from './utils/consts';

function AppRoutes() {
  return (
    <Routes>
      <Route path={HOME_ROUTE} element={<Home />} />

      <Route path={ADS_ROUTE} element={<Ads />} />
      <Route path={`${ADS_ROUTE}/:id`} element={<Ad />} />

      <Route path={AUTH_ROUTE} element={<Auth />}>
        <Route path={FORGOT_PASS_ROUTE} element={<ForgotPassForm />} />
        <Route path={RESET_PASS_ROUTE} element={<ResetPassForm />} />
        <Route path={LOGIN_ROUTE} element={<AuthForm isLogin={true} />} />
        <Route path={SIGN_UP_ROUTE} element={<AuthForm isLogin={false} />} />
        <Route path={VERIFY_EMAIL_ROUTE} element={<VerifyEmail />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path={`${PROFILE_ROUTE}/:id`} element={<Profile />} />

        <Route path={REQUEST_ADS_ROUTE} element={<RequestAds />} />
      </Route>

      <Route path={NEWS_ROUTE} element={<News />} />
      <Route path={ANALYTICS_ROUTE} element={<Analytics />} />
      <Route path={`${ANALYTICS_ROUTE}/article/:id`} element={<Article />} />
      <Route path={`${NEWS_ROUTE}/article/:id`} element={<Article />} />

      <Route path={OTHER_ROUTE} element={<Other />}>
        <Route path={OTHER_LINKS_ROUTE} element={<UsefulLinks />} />
      </Route>

      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
