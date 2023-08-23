import { Ad } from '../../redux/services/ads/interface';

interface AdsMapProps {
  ads?: Ad[];
  defaultLat?: number;
  defaultLon?: number;
}

export default AdsMapProps;
