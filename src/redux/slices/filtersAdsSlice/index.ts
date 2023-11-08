import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../store';
import FiltersAdsState from './interface';

const initialState: FiltersAdsState = {
  address: undefined,
  areaFrom: undefined,
  areaTo: undefined,
  areaUnit: undefined,
  dateRange: undefined,
  domain: undefined,
  isRent: undefined,
  keyword: undefined,
  landCategory: undefined,
  landUse: undefined,
  priceFrom: undefined,
  priceTo: undefined,
  sorting: { id: 'DESC' },
  unitPrice: 'false',
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
      state.address = action.payload.address;
      state.areaUnit = action.payload.areaUnit;
      state.dateRange = action.payload.dateRange;
      state.isRent = action.payload.isRent;
      state.keyword = action.payload.keyword;
      state.landCategory = action.payload.landCategory;
      state.landUse = action.payload.landUse;
      state.sorting = action.payload.sorting;
      state.unitPrice = action.payload.unitPrice;
    },
  },
});

export const selectFilterAds = (state: RootState) => state.filtersAds;

export const { resetFiltersAds, setFiltersAds } = filtersAdsSlice.actions;

export default filtersAdsSlice.reducer;
