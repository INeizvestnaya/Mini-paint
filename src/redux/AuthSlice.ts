/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

import { auth } from '../firebase-config';

export interface AuthState {
  user: string | null | undefined;
}

const initialState: AuthState = {
  user: auth.currentUser?.email
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
    }
  }
});

export const { setUser } = AuthSlice.actions;

export default AuthSlice.reducer;
