import { Ad } from '../../redux/services/ads/interface';

interface DownloadAdsXlsxProps {
  isLoading: boolean;
  isSuccess: boolean;
  listAnnouncement: Ad[] | undefined;
  page: number | string;
}

export default DownloadAdsXlsxProps;
