// import { createSelector } from "@reduxjs/toolkit";
export const selectUser = (state) => state.user.user;
export const selectToken = (state) => state.user.token;
export const selectIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectIsLoading = (state) => state.user.isLoading;
export const selectError = (state) => state.user.error;

export const selectUserName = (state) => state.user.user?.name || "";
export const selectUserEmail = (state) => state.user.user?.email || "";
export const selectUserPhone = (state) => state.user.user?.phone || "";
export const selectUserAvatar = (state) => state.user.user?.avatar || "";

// export const selectPets = createSelector(
//   (state) => state.user.user?.pets,
//   (pets) => pets || []
// );
export const selectPets = (state) => state.user.user?.pets || [];

export const selectUserFavorites = (state) =>
  state.user.user.noticesFavorites || [];
