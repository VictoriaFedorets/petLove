import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import instance from "../../services/apiOperations.js";

export const fetchFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async (_, thunkAPI) => {
    try {
      const { data } = await instance.get("/users/current");
      const favoriteIds =
        data.noticesFavorites?.map((notice) => notice._id) || [];
      return favoriteIds;
      //   return data.noticesFavorites || [];
    } catch (error) {
      const message = error.response?.data?.message || "No favorites found";
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addToFavorites = createAsyncThunk(
  "favorites/addToFavorites",
  async (noticeId, thunkAPI) => {
    try {
      const response = await instance.post(
        `/notices/favorites/add/${noticeId}`
      );
      return noticeId;
    } catch (error) {
      const message = error.response?.data?.message || "Not added to favorites";
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const removeFromFavorites = createAsyncThunk(
  "favorites/removeFromFavorites",
  async (noticeId, thunkAPI) => {
    try {
      await instance.delete(`/notices/favorites/remove/${noticeId}`);
      return noticeId;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to remove from favorites";
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
