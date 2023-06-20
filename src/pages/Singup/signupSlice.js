import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
};

const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    signupRequest: (state) => {
      state.isLoading = true;
    },
    signupSuccess: (state) => {
      state.isLoading = false;
    },
    signupFailure: (state) => {
      state.isLoading = false;
    },
  },
});

export const { signupRequest, signupSuccess, signupFailure } =
  signupSlice.actions;

export default signupSlice.reducer;
