type FormValues = {
  (name: string, value: string | Blob): void;
  areaFrom: number;
  areaTo: number;
  priceFrom: number;
  priceTo: number;
  landCategory: string;
  landUse: string[];
  typeOfUse: string[];
  irrigation: string;
  survey: string;
};

export default FormValues;
