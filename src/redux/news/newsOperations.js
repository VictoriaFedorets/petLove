import toast from "react-hot-toast";
import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../services/apiOperations.js";

export const getNews = createAsyncThunk(
  "news/getNews",
  async (params = {}, { rejectWithValue }) => {
    try {
      const { data } = await instance.get("/news", { params });
      return data;
    } catch (error) {
      console.error("Error response:", error.response?.data);
      const message = error.response?.data?.message || "No news found";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);
