import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import instance from "../../services/apiOperations.js";

// export const fetchFavorites = createAsyncThunk(
//   "favorites/fetchFavorites",
//   async (_, thunkAPI) => {
//     try {
//       const { data } = await instance.get("/users/current");
//       return data.noticesFavorites || [];
//     } catch (error) {
//       const message = error.response?.data?.message || "No favorites found";
//       toast.error(message);
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

export const addPet = createAsyncThunk(
  "pets/addPet",
  async (petData, thunkAPI) => {
    try {
      const { data } = await instance.post("/users/current/pets/add/", petData);
      return data.pets;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to add pet";
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const removePet = createAsyncThunk(
  "pets/removePet",
  async (petId, thunkAPI) => {
    try {
      const { data } = await instance.delete(
        `/users/current/pets/remove/${petId}`
      );
      return data.pets;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to remove pet";
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
