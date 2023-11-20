import { Ad } from '../../redux/services/ads/interface';

export interface ICadastralObjectTitle {
  value: string;
  title: string;
}

export interface AdMutationFormProps {
  ad?: Ad;
  isEditStatusForm: boolean;
}
