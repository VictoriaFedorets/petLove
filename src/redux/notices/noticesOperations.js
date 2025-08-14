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
      const message = error.response?.data?.message || "No notices found";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const getNoticesById = createAsyncThunk(
  "notices/getNoticesById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(`/notices/${id}`);
      return data;
    } catch (error) {
      const message = error.response?.data?.message || "No notices found";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const getNoticesCategories = createAsyncThunk(
  "notices/getNoticesCategories",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await instance.get("/notices/categories");
      return data;
    } catch (error) {
      console.error("Error response:", error.response?.data);
      const message = error.response?.data?.message || "No notices categories";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const getNoticesGenders = createAsyncThunk(
  "notices/getNoticesGender",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await instance.get("/notices/sex");
      return data;
    } catch (error) {
      console.error("Error response:", error.response?.data);
      const message =
        error.response?.data?.message || "Failed to fetch genders";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const getNoticesSpecies = createAsyncThunk(
  "notices/getNoticesSpecies",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await instance.get("/notices/species");
      return data;
    } catch (error) {
      console.error("Error response:", error.response?.data);
      const message =
        error.response?.data?.message || "Failed to fetch species";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const getCitiesByKeyword = createAsyncThunk(
  "notices/getCitiesByKeyword",
  async (keyword, { rejectWithValue }) => {
    try {
      const { data } = await instance.get("/cities", {
        params: { keyword },
      });
      return data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to fetch cities";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const getNoticesLocations = createAsyncThunk(
  "notices/getNoticesLocations",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await instance.get("/cities/locations");
      return data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to fetch locations";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);
