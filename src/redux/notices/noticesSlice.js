import { createSlice } from "@reduxjs/toolkit";
import { getNotices } from "./noticesOperations.js";

const initialState = {
  notices: [],
  isLoading: false,
  error: null,
  page: 1,
  perPage: 6,
  totalPages: 1,
};

const noticesSlice = createSlice({
  name: "notices",
  initialState,
  reducers: {
    setNoticesPage(state, action) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotices.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getNotices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notices = action.payload.results;
        state.totalPages = action.payload.totalPages;
        // console.log(action.payload.results);
      })
      .addCase(getNotices.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { setNoticesPage } = noticesSlice.actions;
export default noticesSlice.reducer;
