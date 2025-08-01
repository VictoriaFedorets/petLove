export const selectFavorites = (state) => state.favorites.items;
// export const selectIsFavoritesId = (id) => (state) =>
//   state.favorites.items.includes(id);
// export const selectFavoriteIds = (state) =>
//   state.favorites.items.map((item) => item._id);
export const selectFavoritesLoading = (state) => state.favorites.isLoading;
export const selectFavoritesError = (state) => state.favorites.error;
