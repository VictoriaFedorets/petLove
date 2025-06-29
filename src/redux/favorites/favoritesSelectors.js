export const selectFavorites = (state) => state.favorites.items;
export const selectIsFavoritesId = (id) => (state) =>
  state.favorites.items.some((item) => item._id === id);
export const selectFavoritesLoading = (state) => state.favorites.isLoading;
export const selectFavoritesError = (state) => state.favorites.error;
