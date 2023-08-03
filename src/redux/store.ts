import { configureStore } from '@reduxjs/toolkit';

import { adsApi } from './services/ads/adsApi';
import { authApi } from './services/auth/authApi';
import filterAdsReducer from './slices/filtersAdsSlice/index';
import userReducer from './slices/userSlice/index';

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(adsApi.middleware, authApi.middleware),

  reducer: {
    [adsApi.reducerPath]: adsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    filtersAds: filterAdsReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
