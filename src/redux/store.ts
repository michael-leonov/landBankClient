import { configureStore } from '@reduxjs/toolkit';

import { adsApi } from './services/ads/adsApi';
import { authApi } from './services/auth/authApi';
import { usersApi } from './services/users/usersApi';
import filterAdsReducer from './slices/filtersAdsSlice/index';
import userReducer from './slices/userSlice/index';

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(adsApi.middleware, authApi.middleware, usersApi.middleware),

  reducer: {
    [adsApi.reducerPath]: adsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    filtersAds: filterAdsReducer,
    user: userReducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
