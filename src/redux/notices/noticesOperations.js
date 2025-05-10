import toast from "react-hot-toast";
import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../services/apiOperations.js";

export const getNotices = createAsyncThunk(
  "notices/getNotices",
  async (params = {}, { rejectWithValue }) => {
    try {
      const { data } = await instance.get("/notices", { params });
      return data;
    } catch (error) {
      console.error("Error response:", error.response?.data);
      const message = error.response?.data?.message || "No notices found";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);
