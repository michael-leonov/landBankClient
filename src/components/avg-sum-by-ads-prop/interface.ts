import { Ad } from '../../redux/services/ads/interface';

interface AvgSumByAdsPropProps {
  ads?: Ad[];
  isSuccess: boolean;
  prop: string;
  propText: string;
  currentTotal?: number;
  toFixed: number;
  unit: string;
}

export default AvgSumByAdsPropProps;
