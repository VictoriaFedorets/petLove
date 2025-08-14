import toast from "react-hot-toast";
import { createAsyncThunk } from "@reduxjs/toolkit";
import instance, { setAuthToken } from "../../services/apiOperations.js";

export const registerUser = createAsyncThunk(
  "/users/register",
  async (credentials, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await instance.post("/users/signup", credentials);
      setAuthToken(data.token);
      toast.success("Registration is successful");
      await dispatch(getUserFull());
      return data;
    } catch (error) {
      console.error("Error response:", error.response?.data);
      const message = error.response?.data?.message || "Registration failed";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "/users/login",
  async (credentials, { rejectWithValue}) => {
    try {
      const { data } = await instance.post("/users/signin", credentials);
      localStorage.setItem("token", data.token);
      setAuthToken(data.token);
      toast.success("Login is successful");
      return data;
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";
      toast.error(message);
      console.error("Error during registration:", error);
      return rejectWithValue(message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "/users/logout",
  async (_, { getState, rejectWithValue }) => {
    const token = getState().user.token;

    if (!token) {
      throw new Error("No token found");
    }

    try {
      setAuthToken(token);
      await instance.post("/users/signout");
      localStorage.removeItem("token");
      setAuthToken(null);
      toast.success("Logout is successful");
      return null;
    } catch (error) {
      const message = error.response?.data?.message || "Logout failed";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const refreshUser = createAsyncThunk(
  "/users/refresh",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const token = state.user.token;

    if (!token) {
      return rejectWithValue("No token found");
    }

    try {
      setAuthToken(token);
      const { data } = await instance.get("/users/current/full");
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
  async (updatedData, { rejectWithValue }) => {
    try {
      const { data } = await instance.patch("/users/current/edit", updatedData);
      toast.success("User updated successfully");
      return data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to update user";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const addPet = createAsyncThunk(
  "/users/current/pets/add",
  async (petData, { rejectWithValue }) => {
    try {
      const { data } = await instance.post("/users/current/pets/add", petData);
      toast.success("Your pet has been added");
      return data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Error when adding a pet";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const removePet = createAsyncThunk(
  "pets/removePet",
  async (petId, thunkAPI) => {
    try {
      await instance.delete(`/users/current/pets/remove/${petId}`);
      toast.success("Your pet has been delete");
      return petId;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to remove pet";
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
