import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  reservations: [],
};

const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {
    createReservationRequest: (state) => {
      state.isLoading = true;
    },
    createReservationSuccess: (state) => {
      state.isLoading = false;
    },
    createReservationFailure: (state) => {
      state.isLoading = false;
    },
    getReservationRequest: (state) => {
      state.isLoading = true;
    },
    getReservationSuccess: (state, action) => {
      state.isLoading = false;
      state.reservations = action.payload;
    },
    getReservationFailure: (state) => {
      state.isLoading = false;
    },
    deleteReservationRequest: (state) => {
      state.isLoading = true;
    },
    deleteReservationSuccess: (state) => {
      state.isLoading = false;
    },
    deleteReservationFailure: (state) => {
      state.isLoading = false;
    },
  },
});

export const {
  createReservationRequest,
  createReservationSuccess,
  createReservationFailure,
  getReservationRequest,
  getReservationSuccess,
  getReservationFailure,
  deleteReservationRequest,
  deleteReservationSuccess,
  deleteReservationFailure,
} = reservationSlice.actions;

export default reservationSlice.reducer;
