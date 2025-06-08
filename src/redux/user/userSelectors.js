export const selectUser = (state) => state.user.user;

export const selectUserLoading = (state) => state.user.isLoading;

export const selectUserError = (state) => state.user.error;

export const selectUserName = (state) => state.user.user?.name || "";

export const selectUserEmail = (state) => state.user.user?.email || "";

export const selectUserPhone = (state) => state.user.user?.phone || "";

export const selectUserAvatar = (state) => state.user.user?.avatar || "";
