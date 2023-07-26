import { AdsResponse } from '../../redux/services/ads/interface';

interface AvgSumByAdsPropProps {
  data?: AdsResponse;
  isSuccess: boolean;
  prop: string;
  propText: string;
  currentTotal?: number;
  toFixed: number;
  unit: string;
}

export default AvgSumByAdsPropProps;
