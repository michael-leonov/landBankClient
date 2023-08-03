import { UserInfo } from '../../slices/userSlice/interface';

export interface AuthState {
  token: string | null;
}

interface User extends UserInfo {
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface LoginParams {
  email: string;
  password: string;
}
