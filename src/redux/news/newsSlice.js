import { createSlice } from "@reduxjs/toolkit";
import { getNews } from "./newsOperations.js";

const initialState = {
  news: [],
  isLoading: false,
  error: null,
  page: 1,
  perPage: 6,
  totalPages: 1,
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setNewsPage(state, action) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNews.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getNews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.news = action.payload.results;
        state.totalPages = action.payload.totalPages;
        // console.log(action.payload.results);
      })
      .addCase(getNews.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { setNewsPage } = newsSlice.actions;
export default newsSlice.reducer;
