import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  user: JSON.parse(localStorage.getItem('user')),
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    loginFailure: (state) => {
      state.isLoading = false;
    },
    logoutRequest: () => {},
    logoutSuccess: (state) => {
      state.user = undefined;
    },
    logoutFailure: () => {},
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
} = loginSlice.actions;

export default loginSlice.reducer;
