import { createSelector } from "@reduxjs/toolkit";

export const selectNotices = (state) => state.notices?.notices || [];
export const selectNoticesIsLoading = (state) => state.notices.isLoading;
export const selectNoticesError = (state) => state.notices.error;
export const selectNoticesPage = (state) => state.notices.page;
export const selectNoticesTotalPages = (state) => state.notices.totalPages;

export const selectNoticesSpacies = createSelector([selectNotices], (notices) =>
  notices.map((n) => n.species)
);

export const selectNoticesCategories = (state) => state.notices.categories;
export const selectNoticesGenders = (state) => state.notices.genders;
export const selectNoticesSpecies = (state) => state.notices.species;
export const selectCities = (state) => state.notices.cities;
export const selectLocations = (state) => state.notices.locations;
