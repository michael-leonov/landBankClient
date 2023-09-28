import { UserInfo } from '../../slices/userSlice/interface';
import { Ad } from '../ads/interface';

export type AdId = Pick<Ad, 'id'>;
export type UserId = Pick<UserInfo, 'id'>;
