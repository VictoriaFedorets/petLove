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
        state.items = action.payload.map((notice) =>
          typeof notice === "string" ? notice : notice._id
        );
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
        const id =
          typeof action.payload === "string"
            ? action.payload
            : action.payload._id;
        if (!state.items.includes(id)) {
          state.items.push(id);
        }
        console.log("addToFavorites payload", action.payload);

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
        state.items = state.items.filter((id) => id !== action.payload);
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
