import toast from "react-hot-toast";
import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../services/apiOperations.js";

export const getUser = createAsyncThunk(
  "user/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await instance.get("/users/current");
      return data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to fetch user";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const getUserFull = createAsyncThunk(
  "user/getUserFull",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await instance.get("/users/current/full");
      return data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to fetch full user info";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await instance.put("/users/current/edit");
      toast.success("User update successfully");
      return data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to update user";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);
