import { UserInfo } from '../../slices/userSlice/interface';

export interface AuthState {
  token: string | null;
}

export interface AuthResponse {
  user: UserInfo;
  token: string;
}

export interface AuthParams {
  email: string;
  password: string;
}

export interface SignUpParams extends AuthParams {
  landUserStatus?: string;
}
