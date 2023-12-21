import { UserInfo } from '../../slices/userSlice/interface';

export interface UsersResponse {
  listUsers: UserInfo[];
  totalCount: number;
}

export interface UserParams {
  isLandUserObtainStatus?: boolean;
}

export interface AddLandUserRoleResponse {
  value: string;
  userId: number;
}
