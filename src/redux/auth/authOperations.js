import toast from "react-hot-toast";
import { createAsyncThunk } from "@reduxjs/toolkit";
import instance, { setAuthToken } from "../../services/apiOperations.js";

export const registerUser = createAsyncThunk(
  "/users/register",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await instance.post("/users/signup", credentials);
      setAuthToken(data.token);
      toast.success("Registration is successful");
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
  async (credentials, { rejectWithValue }) => {
    try {
      // console.log(
      //   "Sending registration request with credentials:",
      //   credentials
      // );
      const { data } = await instance.post("/users/signin", credentials);
      localStorage.setItem("token", data.token);
      setAuthToken(data.token);
      toast.success("Login is successful");
      // console.log("Registration successful:", data);
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
    const token = getState().auth.token;
    // console.log("TOKEN FROM STATE IN logoutUser THUNK:", token);

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
    const token = state.auth.token;

    if (!token) {
      return rejectWithValue("No token found");
    }

    try {
      setAuthToken(token);
      const { data } = await instance.get("/users/current");
      // toast.success("Refresh is successful");
      return data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to fetch user";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);
