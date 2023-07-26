import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../store';
import FiltersAdsState from './interface';

const initialState: FiltersAdsState = {
  areaFrom: undefined,
  areaTo: undefined,
  domain: undefined,
  priceFrom: undefined,
  priceTo: undefined,
};

export const filtersAdsSlice = createSlice({
  initialState,
  name: 'filtersAds',
  reducers: {
    resetFiltersAds: () => initialState,

    setFiltersAds: (state, action: PayloadAction<FiltersAdsState>) => {
      state.domain = action.payload.domain;
      state.areaFrom = action.payload.areaFrom;
      state.areaTo = action.payload.areaTo;
      state.priceFrom = action.payload.priceFrom;
      state.priceTo = action.payload.priceTo;
    },
  },
});

export const selectFilterAds = (state: RootState) => state.filtersAds;

export const { resetFiltersAds, setFiltersAds } = filtersAdsSlice.actions;

export default filtersAdsSlice.reducer;
