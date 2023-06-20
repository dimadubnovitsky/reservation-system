import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  tables: [],
};

const tablesSlice = createSlice({
  name: 'tables',
  initialState,
  reducers: {
    getTablesRequest: (state) => {
      state.isLoading = true;
    },
    getTablesSuccess: (state, action) => {
      state.isLoading = false;
      state.tables = action.payload;
    },
    getTablesFailure: (state) => {
      state.isLoading = false;
    },
  },
});

export const { getTablesRequest, getTablesSuccess, getTablesFailure } =
  tablesSlice.actions;

export default tablesSlice.reducer;
