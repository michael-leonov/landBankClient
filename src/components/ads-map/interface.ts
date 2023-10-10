import { Ad } from '../../redux/services/ads/interface';

interface AdsMapProps {
  ads?: Ad[];
  defaultLat?: number;
  defaultLon?: number;
  setGeoBounds: (v: string) => void;
  isFetchingAds: boolean;
}

export default AdsMapProps;
