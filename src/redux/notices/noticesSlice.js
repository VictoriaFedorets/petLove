import { createSlice } from "@reduxjs/toolkit";
import {
  getCitiesByKeyword,
  getNotices,
  getNoticesCategories,
  getNoticesGenders,
  getNoticesLocations,
  getNoticesSpecies,
} from "./noticesOperations.js";

const initialState = {
  notices: [],
  categories: [],
  genders: [],
  species: [],
  cities: [],
  locations: [],
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
      })
      .addCase(getNotices.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })

      .addCase(getNoticesCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getNoticesCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(getNoticesCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })

      .addCase(getNoticesGenders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getNoticesGenders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.genders = action.payload;
      })
      .addCase(getNoticesGenders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })

      .addCase(getNoticesSpecies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getNoticesSpecies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.species = action.payload;
      })
      .addCase(getNoticesSpecies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })

      .addCase(getCitiesByKeyword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCitiesByKeyword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cities = action.payload;
      })
      .addCase(getCitiesByKeyword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(getNoticesLocations.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getNoticesLocations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.locations = action.payload;
      })
      .addCase(getNoticesLocations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { setNoticesPage } = noticesSlice.actions;
export default noticesSlice.reducer;
