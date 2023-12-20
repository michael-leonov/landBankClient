import { UserInfo } from '../../slices/userSlice/interface';

export type UserWithoutRoles = Omit<UserInfo, 'roles'>;
