import { Ad } from '../../redux/services/ads/interface';

interface DownloadAdsXlsxProps {
  isLoading: boolean;
  isSuccess: boolean;
  listAnnouncement: Ad[] | undefined;
}

export default DownloadAdsXlsxProps;
