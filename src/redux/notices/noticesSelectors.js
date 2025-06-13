import { createSelector } from "@reduxjs/toolkit";

export const selectNotices = (state) => state.notices?.notices || [];
export const selectNoticesIsLoading = (state) => state.notices.isLoading;
export const selectNoticesError = (state) => state.notices.error;
export const selectNoticesPage = (state) => state.notices.page;
export const selectNoticesTotalPages = (state) => state.notices.totalPages;

export const selectNoticesSpacies = createSelector([selectNotices], (notices) =>
  notices.map((n) => n.species)
);
