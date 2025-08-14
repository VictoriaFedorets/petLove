import { createSlice } from "@reduxjs/toolkit";
import {
  loginUser,
  logoutUser,
  refreshUser,
  registerUser,
  getUserFull,
  updateUser,
  addPet,
  removePet,
} from "./userOperations.js";

const LOCAL_KEY = "noticesViewed";

const getLocalViewed = () => {
  try {
    const data = localStorage.getItem(LOCAL_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  isLoggedIn: !!localStorage.getItem("token"),
  isLoading: false,
  error: false,
  noticesViewed: getLocalViewed(),
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
    addViewedNotice: (state, action) => {
      const notice = action.payload;
      if (!notice || !notice._id) return;
      if (!Array.isArray(state.noticesViewed)) state.noticesViewed = [];

      const existsTop = state.noticesViewed.some((n) => n._id === notice._id);
      if (!existsTop) {
        state.noticesViewed.push(notice);
        localStorage.setItem(LOCAL_KEY, JSON.stringify(state.noticesViewed));
      }

      if (state.user) {
        if (!Array.isArray(state.user.noticesViewed))
          state.user.noticesViewed = [];

        const existsInUser = state.user.noticesViewed.some(
          (n) => n._id === notice._id
        );
        if (!existsInUser) state.user.noticesViewed.push(notice);
      }
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
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })

      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
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

      .addCase(getUserFull.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserFull.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;

        if (Array.isArray(action.payload?.noticesViewed)) {
          const merged = [
            ...state.noticesViewed,
            ...action.payload.noticesViewed.filter(
              (n) => !state.noticesViewed.some((v) => v._id === n._id)
            ),
          ];
          state.noticesViewed = merged;
          localStorage.setItem(LOCAL_KEY, JSON.stringify(merged));
        }
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

        if (Array.isArray(action.payload?.noticesViewed)) {
          const merged = [
            ...state.noticesViewed,
            ...action.payload.noticesViewed.filter(
              (n) => !state.noticesViewed.some((v) => v._id === n._id)
            ),
          ];
          state.noticesViewed = merged;
          localStorage.setItem(LOCAL_KEY, JSON.stringify(merged));
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })

      .addCase(addPet.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addPet.fulfilled, (state, action) => {
        state.isLoading = false;
        if (!state.user?.pets) {
          state.user.pets = [];
        }

        state.user.pets.push(action.payload);
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
        state.user.pets = state.user.pets.filter(
          (pet) => pet._id !== action.payload
        );
        state.isLoading = false;
      })
      .addCase(removePet.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearUser, addViewedNotice } = userSlice.actions;
export default userSlice.reducer;
