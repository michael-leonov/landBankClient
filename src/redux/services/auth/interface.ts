import { UserInfo } from '../../slices/userSlice/interface';

export interface AuthState {
  token: string | null;
}

interface User extends UserInfo {
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface AuthParams {
  email: string;
  password: string;
}
