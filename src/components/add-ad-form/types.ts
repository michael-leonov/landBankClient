type FormValues = {
  (name: string, value: string | Blob): void;
  area: number;
  price: number;
  land_category: string;
  land_use: string;
  is_rent: string;
  description?: string;
  title: string;
  address: string;
  // cadastral_number: string;
  rent_period: string;
  type_of_use: string;
  cultivated_crop: string;
  irrigation: string;
  survey: string;
};

export default FormValues;
