/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { logOut } from '../services/request';
import { LOGOUT_USER } from '../actions/types';

const initialState = {
  user: {},
};

export const logout = createAsyncThunk(
  LOGOUT_USER,
  async () => {
    await logOut();
    return {};
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    registerSuccess: (state, { payload }) => {
      state.user = payload;
    },
    loginSuccess: (state, { payload }) => {
      state.user = payload;
    },
  },
});

export const { registerSuccess, loginSuccess } = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;
