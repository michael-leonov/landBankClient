import { configureStore } from '@reduxjs/toolkit';

import { adsApi } from './services/ads/adsApi';

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(adsApi.middleware),

  reducer: {
    [adsApi.reducerPath]: adsApi.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
