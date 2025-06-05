import toast from "react-hot-toast";
import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../services/apiOperations.js";

export const getFriends = createAsyncThunk(
  "friends/getFriends",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await instance.get("/friends");
      return data;
    } catch (error) {
      console.error("Error response:", error.response?.data);
      const message = error.response?.data?.message || "No friends found";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);
