import { createSlice } from "@reduxjs/toolkit";
import {
  fetchFavorites,
  addToFavorites,
  removeFromFavorites,
} from "./favoritesOperations";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    items: [], // ID избранных notice
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // --- FETCH ---
      .addCase(fetchFavorites.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })

      // --- ADD ---
      .addCase(addToFavorites.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addToFavorites.fulfilled, (state, action) => {
        const newId = action.payload;
        if (!state.items.includes(newId)) {
          state.items.push(newId);
        }
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addToFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })

      // --- REMOVE ---
      .addCase(removeFromFavorites.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeFromFavorites.fulfilled, (state, action) => {
        const removedId = action.payload;
        state.items = state.items.filter((id) => id !== removedId);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(removeFromFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default favoritesSlice.reducer;
