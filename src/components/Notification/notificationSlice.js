import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  type: 'success',
  message: '',
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notificationOpen: (state, action) => {
      state.isOpen = true;
      state.type = action.payload.type;
      state.message = action.payload.message;
    },
    notificationClose: (state) => {
      state.isOpen = false;
    },
  },
});

export const { notificationOpen, notificationClose } =
  notificationSlice.actions;

export default notificationSlice.reducer;
