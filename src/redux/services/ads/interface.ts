export interface Ad {
  id: number;
  title: string;
  address: string;
  area: number;
  asphalt_pavement: boolean;
  cadastral_number: string;
  date_published: string;
  date_updated: string;
  description: string;
  domain: string;
  electricity: boolean;
  flat_land_level: boolean;
  gas: boolean;
  highway_proximity: boolean;
  is_rent: boolean;
  land_category: string;
  land_class: string;
  land_plot_title: string;
  land_use: string;
  lat: number;
  lon: number;
  owner_name: string;
  phone: string;
  photos: string[];
  price: number;
  railway_line: boolean;
  sewage: boolean;
  url: string;
  water_supply: boolean;
}

export interface AdParams {
  page?: number | string;
  limit?: number;
  priceTo?: number;
  priceFrom?: number;
  areaTo?: number;
  areaFrom?: number;
  domain?: string[];
  address?: string;
  areaUnit?: string;
}

export interface AdsResponse {
  listAnnouncement: Ad[];
  totalCount: number;
}
