import FiltersAdsState from '../../redux/slices/filtersAdsSlice/interface';

type FormValues = Omit<FiltersAdsState, 'sorting'>;

export default FormValues;
