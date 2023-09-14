import { PickTypeAd } from './types';

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
  is_rent: boolean | string;
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
  isChecked: boolean | null;
}

export interface AdParams {
  page?: number | string;
  limit?: number;
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
  isRent?: boolean;
  keyword?: string;
  sorting?: { [key: string]: string | undefined };
}

export interface AdsResponse {
  listAnnouncement: Ad[];
  totalCount: number;
}

export interface ToggleAdCheckedBodyType extends PickTypeAd {
  token: string;
}

export interface AdsCountResponse {
  count: number;
}

export interface AddToFavoritiesAdsBodyType {
  token: string;
  userId: number;
  announcementId: number;
}
