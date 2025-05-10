import { createSlice } from "@reduxjs/toolkit";
import { registerUser } from "./authOperations.js";

const initialState = {
  user: null,
  token: null,
  isLoggedIn: false,
  isLoading: false,
  //   isRefreshing: false,
  error: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.user;
        state.isLoggedIn = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
