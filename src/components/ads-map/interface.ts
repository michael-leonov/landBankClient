import { IObjectManagerFeature } from '../../redux/services/ads/interface';

interface AdsMapProps {
  ads: never[] | IObjectManagerFeature[];
  defaultLat?: number;
  defaultLon?: number;
  setGeoBounds: (v: string) => void;
  isFetchingAds: boolean;
}

export default AdsMapProps;
