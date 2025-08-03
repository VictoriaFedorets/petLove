import { createSlice } from "@reduxjs/toolkit";
import { addPet, removePet } from "./petsOperations";

const initialState = {
  pets: [],
  isLoading: false,
  error: null,
};

const userPetsSlice = createSlice({
  name: "userPets",
  initialState,
  reducers: {
    resetPetsState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // --- ADD ---
      .addCase(addPet.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addPet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pets = action.payload;
      })
      .addCase(addPet.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })

      // --- REMOVE ---
      .addCase(removePet.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removePet.fulfilled, (state, action) => {
        state.pets = action.payload;
        state.isLoading = false;
      })
      .addCase(removePet.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { resetPetsState } = userPetsSlice.actions;
export default userPetsSlice.reducer;
