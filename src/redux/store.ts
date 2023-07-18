import { configureStore } from '@reduxjs/toolkit';
import { adsApi } from './services/ads';

export const store = configureStore({
  reducer: {
    [adsApi.reducerPath]: adsApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(adsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
