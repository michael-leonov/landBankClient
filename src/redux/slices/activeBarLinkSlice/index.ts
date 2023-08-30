import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../store';
import ActiveBarLinkState from './interface';

const initialState: ActiveBarLinkState = {
  activeId: undefined,
};

export const activeBarLinkSlice = createSlice({
  initialState,
  name: 'activeBarLink',
  reducers: {
    reset: () => initialState,

    setActiveLink: (state, action: PayloadAction<ActiveBarLinkState>) => {
      state.activeId = action.payload.activeId;
    },
  },
});

export const selectActiveBarLink = (state: RootState) => state.activeBarLink;

export const { reset, setActiveLink } = activeBarLinkSlice.actions;

export default activeBarLinkSlice.reducer;
