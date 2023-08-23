type FormValues = {
  domain?: string[];
  areaFrom?: number;
  areaTo?: number;
  priceFrom?: number;
  priceTo?: number;
  address: string[];
  areaUnit: string;
  landCategory?: string[];
  landUse?: string[];
  isRent?: boolean;
  dateRange?: string;
  keyword?: string;
};

export default FormValues;
