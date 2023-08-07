import { UserInfo } from '../../slices/userSlice/interface';

export interface User extends UserInfo {
  password: string;
}

export interface UsersResponse {
  listUsers: User[];
  totalCount: number;
}
