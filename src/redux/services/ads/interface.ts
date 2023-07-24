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
  price_to?: number;
  price_from?: number;
  area_to?: number;
  area_from?: number;
  domain?: string;
}

export interface AdsResponse {
  listAnnouncement: Ad[];
  totalCount: number;
}
