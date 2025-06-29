import { createSlice } from "@reduxjs/toolkit";
import { getFriends } from "./friendsOperations.js";

const initialState = {
  friends: [],
  isLoading: false,
  error: null,
};

const friendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {
    setFriendsPage(state, action) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFriends.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFriends.fulfilled, (state, action) => {
        state.isLoading = false;
        state.friends = action.payload;
        // console.log(action.payload);
      })
      .addCase(getFriends.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { setFriendsPage } = friendsSlice.actions;
export default friendsSlice.reducer;
