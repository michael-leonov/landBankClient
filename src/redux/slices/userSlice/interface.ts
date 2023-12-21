export interface UserInfo {
  id: number;
  email: string;
  roles: Role[];
  isActive: boolean;
  isLandUserObtainStatus: boolean;
}

export interface Role {
  id: number;
  value: string;
  description: string;
}

export interface UserState {
  token: string | null;
  isAuth: boolean;
  userInfo: UserInfo | null;
}
