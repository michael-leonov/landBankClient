import { Cookies } from 'react-cookie';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../store';
import { UserState } from './interface';

const cookie = new Cookies();

const initialState: UserState = {
  isAuth: false,
  token: null,
  userInfo: null,
};

export const userSlice = createSlice({
  initialState,
  name: 'userSlice',
  reducers: {
    logout: () => {
      cookie.remove('token');
      localStorage.removeItem('user');
      return initialState;
    },

    setUser: (state, action: PayloadAction<UserState>) => {
      cookie.set('token', action.payload.token);

      localStorage.setItem('user', JSON.stringify(action.payload.userInfo));

      state.token = action.payload.token;
      state.isAuth = action.payload.isAuth;
      state.userInfo = action.payload.userInfo;
    },
  },
});

export const selectUser = (state: RootState) => state.user;

export const { logout, setUser } = userSlice.actions;

export default userSlice.reducer;
