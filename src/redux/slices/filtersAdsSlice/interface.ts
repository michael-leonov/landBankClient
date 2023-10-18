interface FiltersAdsState {
  domain?: string[];
  areaFrom?: number;
  areaTo?: number;
  priceFrom?: number;
  priceTo?: number;
  address?: string[];
  areaUnit?: string;
  dateRange?: string;
  landCategory?: string[];
  landUse?: string[];
  isRent?: string;
  keyword?: string;
  sorting: { [key: string]: string | undefined };
}

export default FiltersAdsState;
