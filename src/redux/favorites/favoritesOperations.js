import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import instance from "../../services/apiOperations.js";

export const fetchFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async (_, thunkAPI) => {
    try {
      const { data } = await instance.get("/users/current");
      return data.noticesFavorites || [];
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
      const { data } = await instance.post(
        `/notices/favorites/add/${noticeId}`
      );
      // if (Array.isArray(data)) {
      //   return data[data.length - 1];
      // }
      const addedId = data?._id || data?.notice?._id || noticeId;
      console.log("addToFavorites response data:", data);
      return addedId;
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
