type FormValues = {
  (name: string, value: string | Blob): void;
  area: number;
  price: number;
  land_category: string;
  land_use: string;
  is_rent: boolean;
  description?: string;
  title: string;
  address: string;
};

export default FormValues;
