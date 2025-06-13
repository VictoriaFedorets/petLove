import { createSlice } from "@reduxjs/toolkit";
import {
  loginUser,
  logoutUser,
  refreshUser,
  registerUser,
  getUserFull,
  updateUser,
  addPets,
} from "./userOperations.js";

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  isLoggedIn: !!localStorage.getItem("token"),
  isLoading: false,
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        // state.isLoggedIn = false;
        state.error = action.payload || action.error.message;
      })

      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        // console.log(state.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        // state.isLoggedIn = false;
        state.error = action.payload || action.error.message;
      })

      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })

      .addCase(refreshUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.isLoading = false;
        state.token = null;
        state.user = null;
        state.isLoggedIn = false;
        state.error = action.payload || action.error.message;
      })

      // .addCase(getUser.pending, (state) => {
      //   state.isLoading = true;
      //   state.error = null;
      // })
      // .addCase(getUser.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.user = action.payload;
      // })
      // .addCase(getUser.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.error = action.payload || action.error.message;
      // })

      .addCase(getUserFull.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserFull.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getUserFull.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })

      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })

      .addCase(addPets.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addPets.fulfilled, (state, action) => {
        state.isLoading = false;
        if (!state.user?.pets) {
          state.user.pets = [];
        }

        state.user.pets.push(action.payload);
      })
      .addCase(addPets.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
