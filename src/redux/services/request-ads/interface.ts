import { UserWithoutRoles } from '../users/types';

export interface IRequestAd {
  id: number;
  areaFrom?: number;
  areaTo?: number;
  priceFrom?: number;
  priceTo?: number;
  landCategory: string;
  landUse: string[];
  typeOfUse: string[];
  irrigation: boolean;
  survey: boolean;
  user: UserWithoutRoles;
}

export interface IAddRequestAdBody {
  areaFrom: number;
  areaTo: number;
  priceFrom: number;
  priceTo: number;
  landCategory: string;
  landUse: string[];
  typeOfUse: string[];
  irrigation: string;
  survey: string;
}

export interface IGetRequestAdsResponse {
  listRequestAnnouncement: IRequestAd[];
  totalCount: number;
}

export interface IGetRequestAdsParams {
  userId?: number;
  limit: number;
  page: number;
}
